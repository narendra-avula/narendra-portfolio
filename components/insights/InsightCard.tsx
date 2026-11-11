import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import type { InsightSummary } from "@/lib/insight-filter";
import { Card, TagList, focusRing } from "@/components/ui";
import { DraftBadge, InsightMetaLine } from "@/components/insights/InsightMeta";

export default function InsightCard({
  insight,
  headingLevel: H = "h3",
}: {
  insight: InsightSummary;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Card interactive className="group relative flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-subtle">
        <span className="font-medium text-accent">{insight.category}</span>
        {insight.isDraft && <DraftBadge />}
      </div>
      <H className="mt-3 text-xl font-semibold text-fg">
        <Link
          href={`/insights/${insight.slug}`}
          className={`rounded after:absolute after:inset-0 after:rounded-xl ${focusRing}`}
        >
          {insight.title}
        </Link>
      </H>
      <p className="mt-3 flex-1 leading-7 text-muted">{insight.summary}</p>
      <div className="mt-5">
        <TagList items={insight.tags} label={`${insight.title} tags`} />
      </div>
      <div className="mt-5 flex items-center justify-between text-sm">
        <InsightMetaLine insight={insight} />
        <span className="inline-flex items-center gap-1.5 font-medium text-accent" aria-hidden="true">
          Read
          <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
}
