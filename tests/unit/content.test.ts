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
    const titles = projects.map((p) => p.title);
    for (const t of ["Telecom BSS Platform", "Operations Management Platform", "Custom Sofa E-commerce", "Product Marketplace"]) {
      expect(titles).toContain(t);
    }
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
