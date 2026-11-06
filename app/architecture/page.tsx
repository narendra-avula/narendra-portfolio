import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { architectures, illustrativeNotice } from "@/content/architecture";
import { Card, Container, Eyebrow, TagList, focusRing } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const description =
  "Illustrative reference architectures: RAG pipelines, AI-assisted code review, event-driven microservices and chaos engineering, with flows, boundaries, failure handling and trade-offs.";

export const metadata: Metadata = {
  title: "Architecture Lab",
  description,
  alternates: { canonical: "/architecture" },
  openGraph: { url: "/architecture", title: "Architecture Lab", description },
};

export default function ArchitectureIndex() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="architecture-title">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Architecture Lab</Eyebrow>
          <h1 id="architecture-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            How I think about systems.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Reference designs for the kinds of systems I work on, each with its main flow, boundaries, failure handling and
            trade-offs.
          </p>
          <p className="mt-4 text-sm leading-6 text-subtle">{illustrativeNotice}</p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {architectures.map((a) => (
            <StaggerItem key={a.slug} className="h-full">
              <Card interactive className="group relative flex h-full flex-col p-6">
                <h2 className="text-xl font-semibold text-fg">
                  <Link
                    href={`/architecture/${a.slug}`}
                    className={`rounded after:absolute after:inset-0 after:rounded-xl ${focusRing}`}
                  >
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-7 text-muted">{a.summary}</p>
                <div className="mt-5">
                  <TagList items={a.tags} label={`${a.title} topics`} />
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent" aria-hidden="true">
                  Read the design
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
