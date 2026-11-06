import type { MetadataRoute } from "next";
import { architectures } from "@/content/architecture";
import { caseStudies } from "@/content/case-studies";
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
    { url: `${SITE_URL}/recruiter`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
