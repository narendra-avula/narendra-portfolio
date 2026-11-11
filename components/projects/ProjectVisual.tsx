import type { IconType } from "react-icons";
import { LuActivity, LuBriefcase, LuGitPullRequest, LuGraduationCap } from "react-icons/lu";
import type { ProjectVisual } from "@/content/projects";

const visuals: Record<ProjectVisual, { Icon: IconType; nodes: [number, number][] }> = {
  career: { Icon: LuBriefcase, nodes: [[18, 30], [30, 72], [82, 26], [78, 70], [50, 50]] },
  review: { Icon: LuGitPullRequest, nodes: [[15, 50], [35, 25], [35, 75], [80, 35], [50, 50]] },
  resilience: { Icon: LuActivity, nodes: [[20, 25], [20, 75], [80, 25], [80, 75], [50, 50]] },
  learning: { Icon: LuGraduationCap, nodes: [[25, 30], [15, 68], [75, 22], [85, 62], [50, 50]] },
};

/** Abstract system diagram drawn in code: no stock imagery */
export default function ProjectVisualPanel({ variant }: { variant: ProjectVisual }) {
  const { Icon, nodes } = visuals[variant];
  const center = nodes[nodes.length - 1];
  return (
    <div aria-hidden="true" className="relative aspect-[16/7] overflow-hidden rounded-lg border border-line bg-surface-2">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id={`dots-${variant}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.4" fill="var(--line-strong)" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#dots-${variant})`} />
        {nodes.slice(0, -1).map(([x, y], i) => (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={center[0]}
            y2={center[1]}
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {nodes.slice(0, -1).map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 bg-surface"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
      <span
        className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-line-strong bg-surface text-accent shadow-sm"
        style={{ left: `${center[0]}%`, top: `${center[1]}%` }}
      >
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}
