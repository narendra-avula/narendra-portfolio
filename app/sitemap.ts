import type { MetadataRoute } from "next";
import { architectures } from "@/content/architecture";
import { caseStudies } from "@/content/case-studies";
import { getPublishedInsights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/architecture`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...architectures.map(({ slug }) => ({
      url: `${SITE_URL}/architecture/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/insights`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    // Published only: drafts never appear in the sitemap (decision D7)
    ...getPublishedInsights().map(({ slug, published, updated }) => ({
      url: `${SITE_URL}/insights/${slug}`,
      lastModified: new Date(updated ?? published ?? lastModified),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/recruiter`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
