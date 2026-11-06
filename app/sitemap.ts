import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
