"use client";

import { useId, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import type { Project } from "@/content/projects";
import { filterProjects, projectFilters, type ProjectFilter } from "@/lib/project-filter";
import { focusRing } from "@/components/ui";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectCatalogue({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const results = filterProjects(projects, filter, query);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-9 rounded-full border px-3.5 text-sm transition-colors ${focusRing} ${
                filter === f
                  ? "border-accent bg-accent-soft font-medium text-fg"
                  : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative md:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search projects
          </label>
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, tech or client"
            className={`min-h-11 w-full rounded-lg border border-line bg-surface pl-9 pr-9 text-sm text-fg placeholder:text-subtle ${focusRing} [&::-webkit-search-cancel-button]:hidden`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className={`absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-subtle hover:text-fg ${focusRing}`}
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-subtle" role="status" aria-live="polite">
        {results.length === 1 ? "1 project" : `${results.length} projects`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 md:grid-cols-2" aria-label="Projects">
          {results.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-medium text-fg">No projects match.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className={`mt-3 rounded text-sm font-medium text-accent hover:underline ${focusRing}`}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
