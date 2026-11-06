import { readFileSync } from "node:fs";
import { join } from "node:path";
import { insights, type InsightMeta } from "@/content/insights";
import { slugify } from "@/lib/slug";
import type { InsightSummary } from "@/lib/insight-filter";

type Env = Record<string, string | undefined>;

const WORDS_PER_MINUTE = 220;

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Insight = InsightMeta & {
  readingMinutes: number;
  headings: Heading[];
  isDraft: boolean;
};

/** Drafts are visible in `next dev`, or when SHOW_DRAFTS=true (e2e tests) */
export function showDrafts(env: Env = process.env): boolean {
  return env.NODE_ENV === "development" || env.SHOW_DRAFTS === "true";
}

export function readSource(slug: string): string {
  return readFileSync(join(process.cwd(), "content", "insights", `${slug}.mdx`), "utf8");
}

/** Removes fenced code blocks so they neither count as headings nor inflate reading time */
function stripCode(source: string): string {
  return source.replace(/^```[\s\S]*?^```/gm, "");
}

export function readingMinutes(source: string): number {
  const words = stripCode(source).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** h2/h3 headings, with the same ids components/insights/mdx.tsx renders */
export function extractHeadings(source: string): Heading[] {
  return [...stripCode(source).matchAll(/^(#{2,3})\s+(.+?)\s*$/gm)].map(([, hashes, raw]) => {
    const text = raw.replace(/[`*_]/g, "");
    return { id: slugify(text), text, level: hashes.length as 2 | 3 };
  });
}

function build(meta: InsightMeta): Insight {
  const source = readSource(meta.slug);
  return {
    ...meta,
    readingMinutes: readingMinutes(source),
    headings: extractHeadings(source),
    isDraft: meta.status === "draft",
  };
}

/** Insights visible in this environment, newest first; drafts after published ones */
export function getInsights(includeDrafts = showDrafts()): Insight[] {
  return insights
    .filter((i) => i.status === "published" || includeDrafts)
    .map(build)
    .sort((a, b) => Number(a.isDraft) - Number(b.isDraft) || (b.published ?? "").localeCompare(a.published ?? ""));
}

/** Published only: for the sitemap, homepage and anything search engines see */
export function getPublishedInsights(): Insight[] {
  return getInsights(false);
}

export function getInsight(slug: string, includeDrafts = showDrafts()): Insight | undefined {
  return getInsights(includeDrafts).find((i) => i.slug === slug);
}

/**
 * Same category first, then shared tags, then the remaining articles in
 * their listed order (stable sort); never the article itself.
 */
export function relatedInsights(current: Insight, pool: Insight[], limit = 2): Insight[] {
  const score = (i: Insight) =>
    (i.category === current.category ? 10 : 0) + i.tags.filter((t) => current.tags.includes(t)).length;
  return pool
    .filter((i) => i.slug !== current.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/** The serialisable fields a client component needs (no headings) */
export function toSummary(i: Insight): InsightSummary {
  return {
    slug: i.slug,
    title: i.title,
    summary: i.summary,
    category: i.category,
    tags: i.tags,
    readingMinutes: i.readingMinutes,
    isDraft: i.isDraft,
    published: i.published,
  };
}
