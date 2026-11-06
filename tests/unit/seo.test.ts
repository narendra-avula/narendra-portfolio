import { describe, expect, it } from "vitest";
import { analyticsEvents, eventForLink } from "@/lib/analytics";
import { articleJsonLd, personJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import robots from "@/app/robots";

describe("structured data", () => {
  it("describes the person with profile facts only", () => {
    const p = personJsonLd();
    expect(p).toMatchObject({ "@type": "Person", name: profile.name, jobTitle: profile.designation });
    expect(p.sameAs).toEqual([profile.links.linkedin, profile.links.github]);
    expect(JSON.stringify(p)).not.toContain(profile.email);
  });

  it("links the website and articles to the person", () => {
    const person = personJsonLd()["@id"];
    expect(websiteJsonLd().author).toEqual({ "@id": person });
    const a = articleJsonLd({ slug: "x", title: "T", summary: "S", published: "2026-01-02", tags: ["a", "b"] });
    expect(a).toMatchObject({ "@type": "BlogPosting", url: `${SITE_URL}/insights/x`, datePublished: "2026-01-02", dateModified: "2026-01-02" });
    expect((a.author as Record<string, unknown>)["@id"]).toBe(person);
  });

  it("escapes < so content cannot close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("<");
  });

  it("robots allows crawling and points at the sitemap", () => {
    expect(robots()).toMatchObject({ rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` });
  });
});

describe("analytics link events", () => {
  it.each([
    ["/resume.pdf", analyticsEvents.resumeDownload],
    [`${SITE_URL}/resume.pdf`, analyticsEvents.resumeDownload],
    ["https://github.com/narendra-avula", analyticsEvents.githubClick],
    ["https://www.linkedin.com/in/narendraavula/", analyticsEvents.linkedinClick],
    ["/projects", null],
    ["mailto:someone@example.com", null],
    ["https://notgithub.com/x", null],
  ])("%s -> %s", (href, event) => {
    expect(eventForLink(href)).toBe(event);
  });
});
