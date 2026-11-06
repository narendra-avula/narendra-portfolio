"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LuAward, LuGraduationCap } from "react-icons/lu";
import { skillGroups } from "@/app/data";
import { Pill } from "@/app/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ======================= Hero code card ======================= */

type Token = [text: string, cls: string];

const kw = "text-violet-400";
const cls = "text-amber-300";
const str = "text-emerald-300";
const fn = "text-sky-300";
const self = "text-orange-300";
const plain = "text-zinc-300";

const code: Token[][] = [
  [["class ", kw], ["Engineer", cls], [":", plain]],
  [["    name ", plain], ["= ", kw], ['"Narendra Avula"', str]],
  [["    role ", plain], ["= ", kw], ['"Software Engineer III"', str]],
  [["    company ", plain], ["= ", kw], ['"JPMorgan Chase"', str]],
  [["    focus ", plain], ["= ", kw], ["[", plain], ['"Resiliency"', str], [", ", plain], ['"Cloud"', str], [", ", plain], ['"GenAI"', str], ["]", plain]],
  [],
  [["    def ", kw], ["build", fn], ["(", plain], ["self", self], [", idea):", plain]],
  [["        return ", kw], ["ship", fn], ["(", plain], ["reliable", fn], ["(idea))", plain]],
];

// Characters per line (+1 for the newline) and where each line starts
const lineLengths = code.map((line) => line.reduce((m, [t]) => m + t.length, 0) + 1);
const lineStarts = lineLengths.map((_, i) =>
  lineLengths.slice(0, i).reduce((a, b) => a + b, 0)
);
const totalChars = lineLengths.reduce((a, b) => a + b, 0);

export function CodeCard() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const count = reduce ? totalChars : typed;

  useEffect(() => {
    if (reduce) return;
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setTyped((c) => {
          if (c >= totalChars) {
            window.clearInterval(id);
            return c;
          }
          return c + 1;
        });
      }, 24);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [reduce]);

  // Gentle 3D tilt toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease }}
      className="relative [perspective:1200px]"
      aria-hidden="true"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-violet-500/10"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-zinc-500">narendra.py</span>
        </div>

        <pre className="overflow-hidden px-5 py-5 font-mono text-[13px] leading-6 xl:text-sm xl:leading-7">
          {code.map((line, li) => {
            const offset = count - lineStarts[li];
            const caretHere = offset >= 0 && offset < lineLengths[li] && count < totalChars;
            let left = Math.max(0, offset);
            return (
              <div key={li} className="flex">
                <span className="mr-5 w-4 select-none text-right text-zinc-700">{li + 1}</span>
                <span className="whitespace-pre">
                  {line.map(([text, color], ti) => {
                    const visible = text.slice(0, Math.max(0, left));
                    const hidden = text.slice(visible.length);
                    left -= text.length;
                    return (
                      <span key={ti} className={color}>
                        {visible}
                        <span className="opacity-0">{hidden}</span>
                      </span>
                    );
                  })}
                  {caretHere && (
                    <span className="animate-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-violet-400" />
                  )}
                </span>
              </div>
            );
          })}
        </pre>

        {/* Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          scale: { delay: 1.2, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.7 },
        }}
        className="absolute -right-4 -top-5 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      >
        <LuAward className="h-4 w-4 text-[#FF9900]" />
        AWS Certified Developer
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.5 },
          scale: { delay: 1.4, duration: 0.5 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.9 },
        }}
        className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      >
        <LuGraduationCap className="h-4 w-4 text-violet-500" />
        M.Tech AI &amp; ML · BITS Pilani
      </motion.div>
    </motion.div>
  );
}

/* ======================= Count-up number ======================= */

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? to : value}
      {suffix}
    </span>
  );
}

/* ======================= Skill tabs ======================= */

export function SkillTabs() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Skill categories"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {skillGroups.map((g, i) => (
          <button
            key={g.title}
            role="tab"
            type="button"
            id={`skill-tab-${i}`}
            aria-selected={active === i}
            aria-controls="skill-panel"
            onClick={() => setActive(i)}
            className={`relative isolate min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white ${
              active === i
                ? "text-white dark:text-zinc-950"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 -z-10 rounded-full bg-zinc-950 dark:bg-white"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {g.title}
            <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">
              {g.skills.length}
            </span>
          </button>
        ))}
      </div>

      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
        className="mt-8 min-h-[140px] rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900/70"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={group.title}
            className="flex flex-wrap gap-3"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              show: { transition: { staggerChildren: 0.04 } },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }}
          >
            {group.skills.map(({ name, icon: Icon, color }) => (
              <motion.div
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
                }}
              >
                <Pill>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full dark:bg-zinc-100!"
                    style={{ backgroundColor: color ? `${color}1A` : "#F4F4F5" }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={color ? { color } : undefined}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-medium">{name}</span>
                </Pill>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
