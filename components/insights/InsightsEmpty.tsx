import { LuPenLine } from "react-icons/lu";
import { insightCategories } from "@/content/insights";
import { Card } from "@/components/ui";

/** Shown while nothing is published (decision D7): planned topics, no placeholder articles */
export default function InsightsEmpty() {
  return (
    <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
          <LuPenLine className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold text-fg">First articles are in progress</p>
          <p className="mt-1 text-[15px] leading-7 text-muted">Published articles will appear here as they go live.</p>
        </div>
      </div>
      <ul aria-label="Planned categories" className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
        {insightCategories.map((c) => (
          <li key={c} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
            {c}
          </li>
        ))}
      </ul>
    </Card>
  );
}
