import type { InsightSummary } from "@/lib/insight-filter";
import { formatDate } from "@/lib/insight-date";

export function DraftBadge() {
  return (
    <span className="inline-flex items-center rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
      Draft — unpublished
    </span>
  );
}

/** "12 March 2026 · 4 min read", or just the reading time for drafts */
export function InsightMetaLine({ insight }: { insight: Pick<InsightSummary, "published" | "readingMinutes" | "isDraft"> }) {
  return (
    <p className="text-subtle">
      {insight.published && !insight.isDraft && (
        <>
          <time dateTime={insight.published}>{formatDate(insight.published)}</time>
          <span aria-hidden="true"> · </span>
        </>
      )}
      {insight.readingMinutes} min read
    </p>
  );
}
