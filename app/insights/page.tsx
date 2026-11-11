import type { Metadata } from "next";
import { getInsights, toSummary } from "@/lib/insights";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import InsightList from "@/components/insights/InsightList";
import InsightsEmpty from "@/components/insights/InsightsEmpty";

const description =
  "Technical writing on backend engineering, cloud and reliability, system design, software architecture and applied AI.";

export const metadata: Metadata = {
  title: "Insights",
  description,
  alternates: { canonical: "/insights" },
  openGraph: { url: "/insights", title: "Insights", description },
};

export default function InsightsPage() {
  const list = getInsights().map(toSummary);

  return (
    <section className="py-16 md:py-24" aria-labelledby="insights-title">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Engineering insights</Eyebrow>
          <h1 id="insights-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            Notes from building and running systems.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
        </Reveal>

        <div className="mt-12">{list.length > 0 ? <InsightList insights={list} /> : <InsightsEmpty />}</div>
      </Container>
    </section>
  );
}
