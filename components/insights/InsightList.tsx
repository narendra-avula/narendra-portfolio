"use client";

import { useId, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { filterInsights, insightFilters, type InsightFilter, type InsightSummary } from "@/lib/insight-filter";
import { focusRing } from "@/components/ui";
import InsightCard from "@/components/insights/InsightCard";

export default function InsightList({ insights }: { insights: InsightSummary[] }) {
  const [filter, setFilter] = useState<InsightFilter>("All");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const results = filterInsights(insights, filter, query);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {insightFilters.map((f) => (
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
            Search articles
          </label>
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic or tag"
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
        {results.length === 1 ? "1 article" : `${results.length} articles`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 md:grid-cols-2" aria-label="Articles">
          {results.map((i) => (
            <li key={i.slug}>
              <InsightCard insight={i} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-medium text-fg">No articles match.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className={`mt-3 rounded text-sm font-medium text-accent hover:text-fg ${focusRing}`}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
