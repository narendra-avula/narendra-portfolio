import type { InsightSummary } from "@/lib/insight-filter";
import { formatDate } from "@/lib/insight-date";

export function DraftBadge() {
  return (
    <span className="inline-flex items-center rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
      Draft — unpublished
    </span>
  );
}

/** Shows publication freshness and reading time without exposing draft publication dates. */
export function InsightMetaLine({
  insight,
}: {
  insight: Pick<InsightSummary, "published" | "updated" | "readingMinutes" | "isDraft">;
}) {
  return (
    <p className="text-subtle">
      {insight.published && !insight.isDraft && (
        <>
          <time dateTime={insight.published}>{formatDate(insight.published)}</time>
          <span aria-hidden="true"> · </span>
        </>
      )}
      {insight.updated && (
        <>
          <span>Updated {formatDate(insight.updated)}</span>
          <span aria-hidden="true"> · </span>
        </>
      )}
      {insight.readingMinutes} min read
    </p>
  );
}
