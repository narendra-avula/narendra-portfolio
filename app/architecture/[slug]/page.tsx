import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuInfo } from "react-icons/lu";
import { architectures, getArchitecture, illustrativeNotice, type ArchitecturePage } from "@/content/architecture";
import { getProject, hasCaseStudy } from "@/content/projects";
import { Container, Eyebrow, TagList, focusRing } from "@/components/ui";
import { Reveal } from "@/components/motion";
import Diagram from "@/components/diagrams/Diagram";

export function generateStaticParams() {
  return architectures.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/architecture/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getArchitecture(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/architecture/${slug}` },
    openGraph: { type: "article", url: `/architecture/${slug}`, title: a.title, description: a.summary },
    twitter: { title: a.title, description: a.summary },
  };
}

type Block = { id: string; title: string; content: ReactNode };

function buildBlocks(a: ArchitecturePage): Block[] {
  const related = a.relatedProjects.map(getProject).filter((p) => p !== undefined);
  return [
    { id: "context", title: "Why it matters", content: <p className="leading-8 text-muted">{a.context}</p> },
    { id: "diagram", title: "Diagram", content: <Diagram spec={a.diagram} /> },
    {
      id: "flow",
      title: "How it flows",
      content: (
        <ol className="space-y-4">
          {a.flow.map((f, i) => (
            <li key={f.step} className="grid grid-cols-[2rem_1fr] gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-accent"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-fg">{f.step}</p>
                <p className="mt-1 leading-7 text-muted">{f.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "boundaries",
      title: "Boundaries",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {a.boundaries.map((b) => (
            <div key={b.name} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold text-fg">{b.name}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{b.detail}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "failures",
      title: "Failure handling",
      content: (
        <dl className="divide-y divide-line rounded-xl border border-line bg-surface">
          {a.failureHandling.map((f) => (
            <div key={f.failure} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-medium text-fg">{f.failure}</dt>
              <dd className="leading-7 text-muted">{f.response}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "tradeoffs",
      title: "Trade-offs",
      content: (
        <div className="space-y-5">
          {a.tradeoffs.map((t) => (
            <div key={t.decision} className="border-l-2 border-accent/50 pl-4">
              <h3 className="font-medium text-fg">{t.decision}</h3>
              <dl className="mt-1.5 grid gap-1 text-[15px] leading-7 sm:grid-cols-[4.5rem_1fr]">
                <dt className="text-subtle">Gain</dt>
                <dd className="text-muted">{t.gain}</dd>
                <dt className="text-subtle">Cost</dt>
                <dd className="text-muted">{t.cost}</dd>
              </dl>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "related",
      title: "Related work",
      content: (
        <ul className="space-y-2">
          {related.map((p) => (
            <li key={p.slug} className="leading-7">
              {hasCaseStudy(p.slug) ? (
                <Link href={`/projects/${p.slug}`} className={`rounded font-medium text-accent hover:underline ${focusRing}`}>
                  {p.title}
                </Link>
              ) : (
                <span className="font-medium text-fg">{p.title}</span>
              )}
              <span className="text-muted">: {p.category}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];
}

export default async function ArchitectureDetail(props: PageProps<"/architecture/[slug]">) {
  const { slug } = await props.params;
  const a = getArchitecture(slug);
  if (!a) notFound();
  const blocks = buildBlocks(a);
  const index = architectures.indexOf(a);
  const next = architectures[(index + 1) % architectures.length];

  return (
    <article className="py-12 md:py-20" aria-labelledby="architecture-title">
      <Container>
        <Link
          href="/architecture"
          className={`inline-flex items-center gap-1.5 rounded text-sm text-muted hover:text-fg ${focusRing}`}
        >
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
          Architecture Lab
        </Link>

        <Reveal className="mt-8 max-w-3xl">
          <Eyebrow>Architecture Lab</Eyebrow>
          <h1 id="architecture-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            {a.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{a.summary}</p>
          <div className="mt-6">
            <TagList items={a.tags} label="Topics" />
          </div>
        </Reveal>

        <p className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-line-strong bg-surface p-4 text-sm leading-6 text-muted">
          <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {illustrativeNotice}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[12rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-24 space-y-1 border-l border-line text-sm">
              {blocks.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className={`-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-line-strong hover:text-fg ${focusRing}`}
                  >
                    {b.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-4xl space-y-14">
            {blocks.map((b) => (
              <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className="scroll-mt-24">
                <h2 id={`${b.id}-title`} className="mb-5 text-2xl font-semibold text-fg">
                  {b.title}
                </h2>
                {b.content}
              </section>
            ))}
          </div>
        </div>

        {next.slug !== slug && (
          <div className="mt-20 border-t border-line pt-8">
            <p className="text-sm text-subtle">Next design</p>
            <Link
              href={`/architecture/${next.slug}`}
              className={`mt-1 inline-flex items-center gap-2 rounded text-xl font-semibold text-fg hover:text-accent ${focusRing}`}
            >
              {next.title}
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </Container>
    </article>
  );
}
