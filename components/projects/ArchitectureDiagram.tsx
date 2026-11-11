import { LuArrowDown } from "react-icons/lu";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Layered architecture diagram built from HTML, so it is responsive,
 * theme-aware and readable by screen readers as a nested list.
 */
export default function ArchitectureDiagram({ architecture }: { architecture: NonNullable<CaseStudy["architecture"]> }) {
  const { caption, illustrative, layers } = architecture;
  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-6">
      <ol aria-label={`${caption}, top to bottom`} className="space-y-0">
        {layers.map((layer, i) => (
          <li key={layer.label}>
            <div className="grid gap-3 rounded-lg border border-line bg-surface-2 p-3 sm:grid-cols-[8rem_1fr] sm:items-center sm:p-4">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">{layer.label}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`${layer.label} components`}>
                {layer.nodes.map((n) => (
                  <li key={n} className="rounded-md border border-line-strong bg-surface px-2.5 py-1.5 text-sm text-fg">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-1.5 text-subtle" aria-hidden="true">
                <LuArrowDown className="h-4 w-4" />
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-subtle">
        {caption}.{" "}
        {illustrative
          ? "Illustrative only: a general model, not a specific production system."
          : "Simplified from the project's own design docs."}
      </figcaption>
    </figure>
  );
}
