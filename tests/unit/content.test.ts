import { describe, expect, it } from "vitest";
import { profile, yearsLabel } from "@/content/profile";
import { experiences } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { education } from "@/content/education";
import { navItems, SITE_URL } from "@/lib/site";

describe("content integrity", () => {
  it("uses one source for years of experience", () => {
    expect(yearsLabel).toBe(`${profile.yearsExperience}+`);
    expect(profile.hero.summary).toContain(yearsLabel);
  });

  it("current role matches the experience timeline", () => {
    const current = experiences.filter((e) => e.current);
    expect(current).toHaveLength(1);
    expect(current[0].role).toBe(profile.designation);
    expect(current[0].company).toBe(profile.employer);
  });

  it("features exactly the four brief projects, each with a visual", () => {
    expect(featuredProjects.map((p) => p.title)).toEqual([
      "PrepForge",
      "CheckMate",
      "Enterprise Resiliency Engineering",
      "PrepForge Academic Hub",
    ]);
    featuredProjects.forEach((p) => expect(p.visual).toBeDefined());
  });

  it("keeps every v1 project (nothing deleted)", () => {
    const slugs = projects.map((p) => p.slug);
    for (const slug of ["telecom-bss-platform", "operations-management-platform", "custom-sofa-ecommerce", "product-marketplace"]) {
      expect(slugs).toContain(slug);
    }
  });

  it("links every professional project to a real employer", () => {
    const companies = experiences.map((e) => e.company);
    projects
      .filter((p) => p.kind === "Professional")
      .forEach((p) => expect(companies, p.slug).toContain(p.company));
  });

  it("gives every role business context and responsibilities", () => {
    experiences.forEach((e) => {
      expect(e.businessContext.length, e.company).toBeGreaterThan(20);
      expect(e.responsibilities.length, e.company).toBeGreaterThanOrEqual(3);
    });
  });

  it("only uses the one verified number in contributions", () => {
    const text = projects.flatMap((p) => p.highlights ?? []).join(" ");
    // digits allowed only in the resume-verified "five major features" or version-like tokens
    expect(text.match(/\d+%|\d+x|\d{2,}\+? (users|customers|requests)/gi)).toBeNull();
  });

  it("has unique project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate skills across groups", () => {
    const names = skillGroups.flatMap((g) => g.skills.map((s) => s.name.toLowerCase()));
    expect(new Set(names).size).toBe(names.length);
  });

  it("groups skills exactly as the brief specifies", () => {
    expect(skillGroups.map((g) => g.title)).toEqual([
      "Backend Engineering",
      "Frontend Engineering",
      "Cloud & Infrastructure",
      "Reliability",
      "AI & GenAI",
      "Data",
    ]);
  });

  it("links the AWS certification to Credly", () => {
    const aws = education.find((e) => e.kind === "Certification");
    expect(aws?.verifyUrl).toMatch(/^https:\/\/www\.credly\.com\/badges\//);
  });

  it("does not expose nav links to routes that are not built yet", () => {
    const enabled = navItems.filter((n) => n.enabled).map((n) => n.href);
    expect(enabled).not.toContain("/architecture");
    enabled.forEach((href) => expect(href.startsWith("/#") || href.startsWith("/")).toBe(true));
  });

  it("has a valid canonical site URL without a trailing slash", () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
