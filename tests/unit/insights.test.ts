import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { insightCategories, insights } from "@/content/insights";
import {
  extractHeadings,
  getInsights,
  getPublishedInsights,
  readingMinutes,
  readSource,
  relatedInsights,
  showDrafts,
} from "@/lib/insights";
import { filterInsights } from "@/lib/insight-filter";
import { slugify } from "@/lib/slug";
import { formatDate } from "@/lib/insight-date";
import sitemap from "@/app/sitemap";

describe("insights content", () => {
  it("every entry has an MDX body, a known category and unique slug", () => {
    const slugs = insights.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const i of insights) {
      expect(existsSync(join(process.cwd(), "content", "insights", `${i.slug}.mdx`))).toBe(true);
      expect(insightCategories).toContain(i.category);
    }
  });

  it("published articles carry a valid ISO date", () => {
    for (const i of insights.filter((x) => x.status === "published")) {
      expect(i.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("article heading ids are unique within each article", () => {
    for (const i of insights) {
      const ids = extractHeadings(readSource(i.slug)).map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("draft visibility (D7)", () => {
  it("shows drafts only in development or with SHOW_DRAFTS=true", () => {
    expect(showDrafts({ NODE_ENV: "production" })).toBe(false);
    expect(showDrafts({ NODE_ENV: "development" })).toBe(true);
    expect(showDrafts({ NODE_ENV: "production", SHOW_DRAFTS: "true" })).toBe(true);
  });

  it("excludes drafts from the published list and the sitemap", () => {
    const drafts = insights.filter((i) => i.status === "draft").map((i) => i.slug);
    expect(drafts.length).toBeGreaterThan(0);
    expect(getPublishedInsights().some((i) => drafts.includes(i.slug))).toBe(false);
    expect(getInsights(false).every((i) => !i.isDraft)).toBe(true);

    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/insights"))).toBe(true);
    for (const slug of drafts) expect(urls.some((u) => u.endsWith(`/insights/${slug}`))).toBe(false);
  });

  it("lists drafts after published articles when drafts are visible", () => {
    const all = getInsights(true);
    const firstDraft = all.findIndex((i) => i.isDraft);
    expect(all.slice(firstDraft).every((i) => i.isDraft)).toBe(true);
  });
});

describe("derived article data", () => {
  it("reading time ignores code blocks and is at least one minute", () => {
    const prose = Array(440).fill("word").join(" ");
    const code = "```\n" + Array(2000).fill("x").join(" ") + "\n```";
    expect(readingMinutes(prose)).toBe(2);
    expect(readingMinutes(`${prose}\n${code}`)).toBe(2);
    expect(readingMinutes("short")).toBe(1);
  });

  it("extracts h2/h3 headings outside code fences, with slug ids", () => {
    const src = "## First `thing`\ntext\n```\n## not a heading\n```\n### Pattern 1: a key\n# h1 ignored";
    expect(extractHeadings(src)).toEqual([
      { id: "first-thing", text: "First thing", level: 2 },
      { id: "pattern-1-a-key", text: "Pattern 1: a key", level: 3 },
    ]);
  });

  it("slugify matches the ids rendered for headings", () => {
    expect(slugify("Retries, dead-letter queues and poison messages")).toBe("retries-dead-letter-queues-and-poison-messages");
  });

  it("formats dates in UTC", () => {
    expect(formatDate("2026-03-01")).toBe("1 March 2026");
  });
});

describe("related and filtering", () => {
  const all = getInsights(true);

  it("related never includes the article itself and respects the limit", () => {
    for (const i of all) {
      const related = relatedInsights(i, all, 1);
      expect(related.length).toBeLessThanOrEqual(1);
      expect(related.some((r) => r.slug === i.slug)).toBe(false);
    }
  });

  it("prefers the same category", () => {
    const base = all[0];
    const pool = [
      { ...all[0], slug: "other-cat", category: "AI / GenAI" as const, tags: [] },
      { ...all[0], slug: "same-cat", tags: [] },
      base,
    ];
    expect(relatedInsights(base, pool, 1)[0].slug).toBe("same-cat");
  });

  it("filters by category and multi-word search across tags", () => {
    expect(filterInsights(all, "Backend Engineering", "").every((i) => i.category === "Backend Engineering")).toBe(true);
    expect(filterInsights(all, "All", "rabbitmq django").map((i) => i.slug)).toEqual(["idempotent-message-consumers"]);
    expect(filterInsights(all, "All", "no-such-topic")).toEqual([]);
  });
});
