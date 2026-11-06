import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuInfo, LuLock } from "react-icons/lu";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { getProject, type Project } from "@/content/projects";
import { Container, Eyebrow, ExternalLink, TagList, focusRing } from "@/components/ui";
import { Reveal } from "@/components/motion";
import ArchitectureDiagram from "@/components/projects/ArchitectureDiagram";
import StatusBadge from "@/components/projects/StatusBadge";

const slugs = Object.keys(caseStudies);

/** Only projects with a written case study get a page; load() returns null otherwise and the page 404s */
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

function load(slug: string): { project: Project; study: CaseStudy } | null {
  const project = getProject(slug);
  const study = caseStudies[slug];
  return project && study ? { project, study } : null;
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const data = load(slug);
  if (!data) return {};
  const title = `${data.project.title}: ${data.project.category}`;
  const description = data.project.summary;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { type: "article", url: `/projects/${slug}`, title, description },
    twitter: { title, description },
  };
}

type Block = { id: string; title: string; content: ReactNode };

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3 leading-7 text-muted">
          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function buildBlocks(study: CaseStudy): Block[] {
  const blocks: (Block | false | undefined)[] = [
    { id: "overview", title: "Overview", content: <p className="leading-8 text-muted">{study.overview}</p> },
    { id: "problem", title: "Problem", content: <p className="leading-8 text-muted">{study.problem}</p> },
    { id: "solution", title: "Solution", content: <p className="leading-8 text-muted">{study.solution}</p> },
    {
      id: "capabilities",
      title: "What exists today",
      content: (
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {study.capabilities.map((c) => (
            <li key={c.name} className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="text-fg">{c.name}</p>
                {c.note && <p className="mt-0.5 text-sm text-subtle">{c.note}</p>}
              </div>
              <StatusBadge status={c.status} />
            </li>
          ))}
        </ul>
      ),
    },
    study.architecture && {
      id: "architecture",
      title: "Architecture",
      content: <ArchitectureDiagram architecture={study.architecture} />,
    },
    {
      id: "stack",
      title: "Technology stack",
      content: (
        <dl className="grid gap-5 sm:grid-cols-2">
          {study.stack.map((g) => (
            <div key={g.group}>
              <dt className="text-sm font-medium text-fg">{g.group}</dt>
              <dd className="mt-2">
                <TagList items={g.items} label={g.group} />
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    { id: "contribution", title: "My contribution", content: <Bullets items={study.contribution} /> },
    study.challenges && {
      id: "challenges",
      title: "Engineering challenges",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {study.challenges.map((c) => (
            <div key={c.title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold text-fg">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{c.detail}</p>
            </div>
          ))}
        </div>
      ),
    },
    study.decisions && {
      id: "decisions",
      title: "Design decisions",
      content: (
        <dl className="space-y-5">
          {study.decisions.map((d) => (
            <div key={d.decision} className="border-l-2 border-accent/50 pl-4">
              <dt className="font-medium text-fg">{d.decision}</dt>
              <dd className="mt-1 leading-7 text-muted">{d.reason}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    study.security && { id: "security", title: "Security", content: <Bullets items={study.security} /> },
    study.scalability && { id: "scalability", title: "Scalability", content: <Bullets items={study.scalability} /> },
    study.testing && { id: "testing", title: "Testing approach", content: <Bullets items={study.testing} /> },
    study.lessons && { id: "lessons", title: "Results and lessons", content: <Bullets items={study.lessons} /> },
  ];
  return blocks.filter((b): b is Block => Boolean(b));
}

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const data = load(slug);
  if (!data) notFound();
  const { project, study } = data;
  const blocks = buildBlocks(study);

  const index = slugs.indexOf(slug);
  const next = getProject(slugs[(index + 1) % slugs.length]);

  return (
    <article className="py-12 md:py-20" aria-labelledby="case-study-title">
      <Container>
        <Link
          href="/projects"
          className={`inline-flex items-center gap-1.5 rounded text-sm text-muted hover:text-fg ${focusRing}`}
        >
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <Reveal className="mt-8 max-w-3xl">
          <Eyebrow>{project.category}</Eyebrow>
          <h1 id="case-study-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{project.summary}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ["Type", project.kind],
              ["Company", project.company],
              ["Period", project.period],
              ["Availability", study.availability],
            ]
              .filter((row): row is [string, string] => Boolean(row[1]))
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="text-subtle">{k}</dt>
                  <dd className="mt-0.5 text-fg">{v}</dd>
                </div>
              ))}
          </dl>
        </Reveal>

        {study.notice && (
          <p className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-line-strong bg-surface p-4 text-sm leading-6 text-muted">
            <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {study.notice}
          </p>
        )}

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

          <div className="min-w-0 max-w-3xl space-y-14">
            {blocks.map((b) => (
              <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className="scroll-mt-24">
                <h2 id={`${b.id}-title`} className="mb-5 text-2xl font-semibold text-fg">
                  {b.title}
                </h2>
                {b.content}
              </section>
            ))}

            <section id="links" aria-labelledby="links-title" className="scroll-mt-24">
              <h2 id="links-title" className="mb-5 text-2xl font-semibold text-fg">
                Source and demo
              </h2>
              {study.links.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {study.links.map((l) => (
                    <li key={l.href}>
                      <ExternalLink href={l.href} className="rounded font-medium text-accent hover:underline">
                        {l.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex gap-3 leading-7 text-muted">
                  <LuLock className="mt-1.5 h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
                  {study.availability}
                  {project.kind === "Personal" && " Happy to walk through the code in an interview."}
                </p>
              )}
            </section>
          </div>
        </div>

        {next && next.slug !== slug && (
          <div className="mt-20 border-t border-line pt-8">
            <p className="text-sm text-subtle">Next case study</p>
            <Link
              href={`/projects/${next.slug}`}
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
