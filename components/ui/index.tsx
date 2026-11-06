import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}

/** Page section with consistent spacing and a top divider */
export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`border-t border-line py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{children}</p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl font-semibold text-fg md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-8 text-muted">{lead}</p>}
    </Reveal>
  );
}

export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface ${
        interactive ? "transition-colors duration-200 hover:border-line-strong" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export function TagList({ items, label = "Technologies" }: { items: readonly string[]; label?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:opacity-90",
  secondary: "border border-line-strong bg-surface text-fg hover:bg-surface-2",
  ghost: "text-muted hover:text-fg",
};

/** Classes for a button-styled link; use with next/link for internal routes */
export const buttonClass = (variant: ButtonVariant = "primary", className = "") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-[background-color,opacity,color] duration-200 ${buttonStyles[variant]} ${focusRing} ${className}`;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return (
    <a {...props} className={buttonClass(variant, className)}>
      {children}
    </a>
  );
}

export function ExternalLink({ className = "", children, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" className={`${focusRing} ${className}`}>
      {children}
    </a>
  );
}
