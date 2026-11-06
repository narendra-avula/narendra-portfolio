import { insightCategories } from "@/content/insights";

export const insightFilters = ["All", ...insightCategories] as const;
export type InsightFilter = (typeof insightFilters)[number];

/** The fields the list needs; keeps this module free of node:fs */
export type InsightSummary = {
  slug: string;
  title: string;
  summary: string;
  category: (typeof insightCategories)[number];
  tags: string[];
  readingMinutes: number;
  isDraft: boolean;
  published?: string;
};

/** Category chip plus case-insensitive search over title, summary, category and tags */
export function filterInsights<T extends InsightSummary>(list: T[], filter: InsightFilter, query: string): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter((i) => {
    if (filter !== "All" && i.category !== filter) return false;
    const haystack = [i.title, i.summary, i.category, ...i.tags].join(" ").toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
