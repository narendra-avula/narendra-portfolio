"use client";

import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* Respect the OS "reduce motion" setting everywhere */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* Thin gradient bar at the top that tracks page scroll */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500"
    />
  );
}

/* Fade + rise into view once when scrolled to */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* Card with a soft spotlight that follows the cursor + lift on hover */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(99, 102, 241, 0.12)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-none dark:hover:border-zinc-700 dark:hover:shadow-indigo-500/10 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* Button/link that leans toward the cursor */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 15, mass: 0.3 });
  const y = useSpring(my, { stiffness: 250, damping: 15, mass: 0.3 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * strength);
    my.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* Hero headline that reveals word by word */
export function WordReveal({
  text,
  className,
  wordClassName = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Hero entrance: staggered fade-up on load */
export function HeroItem({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* Floating gradient blobs + subtle grid that parallax on scroll */
export function HeroBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <motion.div style={{ y: y1 }} className="absolute -right-32 -top-40">
        <motion.div
          className="h-[560px] w-[560px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--blob-1) 0%, transparent 65%)" }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -bottom-40 -left-32">
        <motion.div
          className="h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--blob-2) 0%, transparent 65%)" }}
          animate={{ x: [0, 50, -10, 0], y: [0, -30, 20, 0], scale: [1, 0.94, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--blob-3) 0%, transparent 65%)" }}
        animate={{ x: [0, 80, -60, 0], y: [0, -40, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* Vertical timeline whose line draws itself as you scroll */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-0.5 bg-zinc-200 dark:bg-zinc-800" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-gradient-to-b from-blue-600 via-violet-600 to-fuchsia-500"
      />
      {children}
    </div>
  );
}

export function TimelineItem({
  children,
  highlight = false,
}: {
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <motion.article
      className="relative pl-10"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      <motion.span
        aria-hidden="true"
        className={`absolute -left-[7px] top-1.5 h-4 w-4 rounded-full border-4 border-stone-50 dark:border-zinc-950 ${
          highlight ? "bg-blue-600" : "bg-violet-500"
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
      />
      {highlight && (
        <motion.span
          aria-hidden="true"
          className="absolute -left-[7px] top-1.5 h-4 w-4 rounded-full bg-blue-500"
          animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {children}
    </motion.article>
  );
}

/* Skill pill that pops slightly on hover */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <motion.span
      whileHover={{ y: -3, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex cursor-default items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-1.5 pr-3.5 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {children}
    </motion.span>
  );
}
