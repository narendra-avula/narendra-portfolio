import { describe, expect, it } from "vitest";
import { projects, hasCaseStudy, getProject } from "@/content/projects";
import { caseStudies, statusLabel } from "@/content/case-studies";
import { filterProjects, matchesFilter, matchesQuery, projectFilters } from "@/lib/project-filter";

const slugsOf = (list: { slug: string }[]) => list.map((p) => p.slug);

describe("project filter", () => {
  it("All returns every project with featured first", () => {
    const all = filterProjects(projects, "All", "");
    expect(all).toHaveLength(projects.length);
    const firstNonFeatured = all.findIndex((p) => !p.featured);
    expect(all.slice(firstNonFeatured).every((p) => !p.featured)).toBe(true);
  });

  it("Professional and Personal filter by kind", () => {
    const pro = filterProjects(projects, "Professional", "");
    expect(pro.length).toBeGreaterThan(0);
    expect(pro.every((p) => p.kind === "Professional")).toBe(true);
    expect(slugsOf(filterProjects(projects, "Personal", ""))).toEqual(["prepforge", "checkmate", "prepforge-academic-hub"]);
  });

  it("area filters use the project's areas", () => {
    expect(slugsOf(filterProjects(projects, "Cloud", ""))).toEqual(["enterprise-resiliency-engineering"]);
    expect(filterProjects(projects, "AI / GenAI", "").every((p) => p.areas.includes("AI / GenAI"))).toBe(true);
  });

  it("every filter except All is reachable", () => {
    for (const f of projectFilters) expect(projects.some((p) => matchesFilter(p, f))).toBe(true);
  });

  it("search matches title, technology and client, case-insensitively, all terms", () => {
    expect(slugsOf(filterProjects(projects, "All", "ericsson"))).toEqual(["telecom-bss-platform"]);
    expect(slugsOf(filterProjects(projects, "All", "PGVECTOR"))).toEqual(["prepforge-academic-hub"]);
    expect(matchesQuery(getProject("prepforge")!, "fastapi postgresql")).toBe(true);
    expect(matchesQuery(getProject("prepforge")!, "fastapi rabbitmq")).toBe(false);
    expect(filterProjects(projects, "All", "   ")).toHaveLength(projects.length);
  });

  it("combines filter and search", () => {
    expect(filterProjects(projects, "Personal", "django")).toEqual([]);
    expect(slugsOf(filterProjects(projects, "Professional", "medplus"))).toEqual(["operations-management-platform"]);
  });
});

describe("case studies", () => {
  const entries = Object.entries(caseStudies);

  it("every case study belongs to a project", () => {
    for (const [slug] of entries) expect(getProject(slug), slug).toBeDefined();
  });

  it("covers the brief's case studies that have verified sources", () => {
    expect(hasCaseStudy("prepforge")).toBe(true);
    expect(hasCaseStudy("prepforge-academic-hub")).toBe(true);
    expect(hasCaseStudy("enterprise-resiliency-engineering")).toBe(true);
    // CheckMate waits for a verified source
    expect(hasCaseStudy("checkmate")).toBe(false);
  });

  it("every case study states implemented vs planned work", () => {
    for (const [slug, s] of entries) {
      expect(s.capabilities.length, slug).toBeGreaterThan(0);
      for (const c of s.capabilities) expect(Object.keys(statusLabel)).toContain(c.status);
      expect(s.contribution.length, slug).toBeGreaterThan(0);
      expect(s.availability, slug).not.toBe("");
    }
  });

  it("marks employer work as sanitized with an illustrative diagram", () => {
    for (const [slug, s] of entries) {
      if (getProject(slug)!.kind !== "Professional") continue;
      expect(s.notice, slug).toMatch(/not .*production architecture/i);
      expect(s.architecture?.illustrative, slug).toBe(true);
      expect(s.links, slug).toEqual([]);
    }
  });

  it("only links to https URLs", () => {
    for (const [, s] of entries) for (const l of s.links) expect(l.href).toMatch(/^https:\/\//);
  });

  it("contains no invented performance metrics", () => {
    const text = JSON.stringify(caseStudies);
    expect(text).not.toMatch(/\d+\s?%|\d+x faster|\$\d|\d+[kKmM]\+? users|reduced .* by \d/);
  });
});
