import type { Project } from "@/content/projects";

/** Filter chips, in the order the brief lists them */
export const projectFilters = ["All", "Backend", "Cloud", "AI / GenAI", "Professional", "Personal"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "All") return true;
  if (filter === "Professional" || filter === "Personal") return project.kind === filter;
  return project.areas.includes(filter);
}

/** Case-insensitive match on title, category, summary, technologies, client and company */
export function matchesQuery(project: Project, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [
    project.title,
    project.category,
    project.summary,
    project.client,
    project.company,
    ...project.technologies,
    ...project.focusAreas,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

/** Featured projects first, then the original order */
export function filterProjects(list: Project[], filter: ProjectFilter, query: string): Project[] {
  return list
    .filter((p) => matchesFilter(p, filter) && matchesQuery(p, query))
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}
