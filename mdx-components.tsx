import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";
import { slugify } from "@/lib/slug";
import { focusRing } from "@/components/ui";

/** Plain text of a heading's children, for its id (matches lib/insights.ts extractHeadings) */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/** Article typography. Required by @next/mdx in the App Router. */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 id={slugify(textOf(children))} className="mt-12 scroll-mt-24 text-2xl font-semibold text-fg">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(textOf(children))} className="mt-8 scroll-mt-24 text-xl font-semibold text-fg">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5 leading-8 text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 leading-7 text-muted marker:text-accent">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 leading-7 text-muted marker:text-subtle">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`rounded font-medium text-accent underline underline-offset-4 hover:text-fg ${focusRing}`}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-accent bg-surface-2 px-5 py-1 [&>p]:mt-3 [&>p]:mb-3 [&>p]:text-fg">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre
      tabIndex={0}
      className={`mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-[13px] leading-6 text-fg ${focusRing}`}
    >
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-fg [pre_&]:bg-transparent [pre_&]:p-0">
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
