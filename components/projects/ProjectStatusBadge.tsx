import type { ProjectStatus } from "@/content/projects";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  planned: "Planned",
};

const styles: Record<ProjectStatus, string> = {
  live: "border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  "in-development": "border-accent/40 text-accent",
  planned: "border-line-strong text-subtle",
};

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
