/**
 * Insights (technical articles). Metadata lives here; each article body is
 * content/insights/<slug>.mdx. Reading time and the table of contents are
 * derived from the MDX file by lib/insights.ts, so they never drift.
 *
 * Drafts (decision D7) are hidden in production: no page, no listing, no
 * sitemap entry. They show in `next dev`, or anywhere with SHOW_DRAFTS=true.
 * To publish, set status to "published" and fill in `published`.
 */

export const insightCategories = [
  "Backend Engineering",
  "Cloud Engineering",
  "System Design",
  "AI / GenAI",
  "Software Architecture",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type InsightMeta = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategory;
  tags: string[];
  status: "draft" | "published";
  /** ISO date (YYYY-MM-DD); required once published */
  published?: string;
  updated?: string;
};

export const insights: InsightMeta[] = [
  {
    slug: "idempotent-message-consumers",
    title: "Idempotent message consumers: designing for at-least-once delivery",
    summary:
      "Why brokers such as RabbitMQ deliver some messages more than once, and the patterns that keep duplicate deliveries from becoming duplicate side effects.",
    category: "Backend Engineering",
    tags: ["RabbitMQ", "Microservices", "Django", "Reliability"],
    status: "draft",
  },
  {
    slug: "chaos-experiments-teams-trust",
    title: "Chaos experiments teams can trust",
    summary:
      "A practical structure for chaos experiments: a steady-state hypothesis, a bounded blast radius, explicit abort conditions and a review that turns results into fixes.",
    category: "Cloud Engineering",
    tags: ["Chaos Engineering", "Resilience", "Observability", "SRE"],
    status: "draft",
  },
];
