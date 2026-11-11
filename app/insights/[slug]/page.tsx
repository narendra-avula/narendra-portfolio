import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuInfo } from "react-icons/lu";
import { getInsight, getInsights, relatedInsights, toSummary } from "@/lib/insights";
import { articleJsonLd } from "@/lib/structured-data";
import { profile } from "@/content/profile";
import { Container, Eyebrow, TagList, focusRing } from "@/components/ui";
import { Reveal } from "@/components/motion";
import JsonLd from "@/components/JsonLd";
import InsightCard from "@/components/insights/InsightCard";
import { DraftBadge, InsightMetaLine } from "@/components/insights/InsightMeta";

/** Drafts only get a page where they are visible (dev, or SHOW_DRAFTS=true) */
export function generateStaticParams() {
  return getInsights().map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${slug}` },
    keywords: insight.tags,
    ...(insight.isDraft && { robots: { index: false, follow: false } }),
    openGraph: {
      type: "article",
      url: `/insights/${slug}`,
      title: insight.title,
      description: insight.summary,
      authors: [profile.name],
      tags: insight.tags,
      ...(insight.published && { publishedTime: insight.published }),
      ...(insight.updated && { modifiedTime: insight.updated }),
    },
    twitter: { title: insight.title, description: insight.summary },
  };
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const { default: Article } = await import(`@/content/insights/${slug}.mdx`);
  const related = relatedInsights(insight, getInsights());

  return (
    <article className="py-12 md:py-20" aria-labelledby="insight-title">
      {!insight.isDraft && <JsonLd data={articleJsonLd(insight)} />}
      <Container>
        <Link href="/insights" className={`inline-flex items-center gap-1.5 rounded text-sm text-muted hover:text-fg ${focusRing}`}>
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
          All insights
        </Link>

        <Reveal className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{insight.category}</Eyebrow>
            {insight.isDraft && <DraftBadge />}
          </div>
          <h1 id="insight-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{insight.summary}</p>
          <div className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <InsightMetaLine insight={insight} />
            <TagList items={insight.tags} label="Tags" />
          </div>
        </Reveal>

        {insight.isDraft && (
          <p className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-line-strong bg-surface p-4 text-sm leading-6 text-muted">
            <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            This article is an unpublished draft. It is not listed in production or indexed by search engines.
          </p>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_14rem]">
          <div className="min-w-0 max-w-3xl">
            <Article />
          </div>

          {insight.headings.length > 0 && (
            <nav aria-label="On this page" className="order-first lg:order-none">
              <div className="rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-24 lg:border-0 lg:bg-transparent lg:p-0">
                <p className="text-sm font-medium text-fg">On this page</p>
                <ul className="mt-3 space-y-1 border-l border-line text-sm">
                  {insight.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`-ml-px block border-l border-transparent py-1 text-muted hover:border-line-strong hover:text-fg ${
                          h.level === 3 ? "pl-7" : "pl-4"
                        } ${focusRing}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-20 border-t border-line pt-12">
            <h2 id="related-title" className="text-2xl font-semibold text-fg">
              Related insights
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <InsightCard insight={toSummary(r)} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
