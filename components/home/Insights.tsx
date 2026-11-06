import { LuPenLine } from "react-icons/lu";
import { insightCategories } from "@/content/extras";
import { Card, Section, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/motion";

/**
 * No articles are published yet (decision D7), so this section shows the
 * planned categories honestly instead of placeholder articles.
 */
export default function Insights() {
  return (
    <Section id="insights">
      <SectionHeader
        eyebrow="Engineering insights"
        title="Notes from building and running systems."
        lead="Technical writing on backend engineering, cloud, system design and applied AI."
      />

      <Reveal className="mt-12">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
              <LuPenLine className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-fg">First articles are in progress</p>
              <p className="mt-1 text-[15px] leading-7 text-muted">
                Published articles will appear here as they go live.
              </p>
            </div>
          </div>
          <ul aria-label="Planned categories" className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
            {insightCategories.map((c) => (
              <li key={c} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                {c}
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  );
}
