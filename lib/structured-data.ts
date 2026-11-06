import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

/** JSON for a <script type="application/ld+json">; escapes "<" so content cannot close the tag */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: `${SITE_URL}/`,
    jobTitle: profile.designation,
    worksFor: { "@type": "Organization", name: profile.employer },
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: [...profile.coreExpertise, ...profile.focus],
    alumniOf: education
      .filter((e) => e.kind !== "Certification")
      .map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_URL}/`,
    name: profile.name,
    description: `Portfolio of ${profile.name}: ${profile.positioning}`,
    inLanguage: "en",
    author: { "@id": personId },
  };
}

export function articleJsonLd(article: {
  slug: string;
  title: string;
  summary: string;
  published?: string;
  updated?: string;
  tags: string[];
}): JsonLd {
  const url = `${SITE_URL}/insights/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.summary,
    url,
    mainEntityOfPage: url,
    ...(article.published && { datePublished: article.published }),
    ...((article.updated ?? article.published) && { dateModified: article.updated ?? article.published }),
    keywords: article.tags.join(", "),
    author: { "@id": personId, "@type": "Person", name: profile.name, url: `${SITE_URL}/` },
    isPartOf: { "@id": websiteId },
  };
}
