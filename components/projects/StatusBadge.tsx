import { statusLabel, type CapabilityStatus } from "@/content/case-studies";

const styles: Record<CapabilityStatus, string> = {
  implemented: "border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  "in-progress": "border-accent/40 text-accent",
  experimental: "border-amber-500/40 text-amber-800 dark:text-amber-300",
  planned: "border-line-strong text-subtle",
};

export default function StatusBadge({ status }: { status: CapabilityStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center self-start rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
