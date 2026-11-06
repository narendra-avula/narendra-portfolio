import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { getPublishedInsights, toSummary } from "@/lib/insights";
import { Section, SectionHeader, focusRing } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import InsightCard from "@/components/insights/InsightCard";
import InsightsEmpty from "@/components/insights/InsightsEmpty";

/** Latest published articles only; drafts never reach the homepage (decision D7) */
export default function Insights() {
  const latest = getPublishedInsights().slice(0, 3).map(toSummary);

  return (
    <Section id="insights">
      <SectionHeader
        eyebrow="Engineering insights"
        title="Notes from building and running systems."
        lead="Technical writing on backend engineering, cloud, system design and applied AI."
      />

      {latest.length > 0 ? (
        <>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((i) => (
              <StaggerItem key={i.slug} className="h-full">
                <InsightCard insight={i} />
              </StaggerItem>
            ))}
          </Stagger>
          <Link
            href="/insights"
            className={`mt-8 inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent hover:text-fg ${focusRing}`}
          >
            All insights
            <LuArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </>
      ) : (
        <Reveal className="mt-12">
          <InsightsEmpty />
        </Reveal>
      )}
    </Section>
  );
}
