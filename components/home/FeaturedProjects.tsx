import type { IconType } from "react-icons";
import { LuActivity, LuBriefcase, LuGitPullRequest, LuGraduationCap, LuClock } from "react-icons/lu";
import { featuredProjects, otherProjects, type Project, type ProjectVisual } from "@/content/projects";
import { Card, Section, SectionHeader, TagList, focusRing } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const visuals: Record<ProjectVisual, { Icon: IconType; nodes: [number, number][] }> = {
  career: { Icon: LuBriefcase, nodes: [[18, 30], [30, 72], [82, 26], [78, 70], [50, 50]] },
  review: { Icon: LuGitPullRequest, nodes: [[15, 50], [35, 25], [35, 75], [80, 35], [50, 50]] },
  resilience: { Icon: LuActivity, nodes: [[20, 25], [20, 75], [80, 25], [80, 75], [50, 50]] },
  learning: { Icon: LuGraduationCap, nodes: [[25, 30], [15, 68], [75, 22], [85, 62], [50, 50]] },
};

/** Abstract system diagram drawn in code: no stock imagery */
function ProjectVisualPanel({ variant }: { variant: ProjectVisual }) {
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive className="flex h-full flex-col p-5 md:p-6">
      <article className="flex h-full flex-col" aria-labelledby={`project-${project.slug}`}>
        {project.visual && <ProjectVisualPanel variant={project.visual} />}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-accent">{project.category}</span>
          <span className="text-subtle" aria-hidden="true">·</span>
          <span className="text-subtle">{project.kind}</span>
        </div>
        <h3 id={`project-${project.slug}`} className="mt-2 text-xl font-semibold text-fg">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 leading-7 text-muted">{project.summary}</p>
        <div className="mt-5">
          {project.technologies.length > 0 ? (
            <TagList items={project.technologies} />
          ) : (
            <TagList items={project.focusAreas} label="Focus areas" />
          )}
        </div>
        <div className="mt-5 border-t border-line pt-4">
          {/* Case-study pages ship in Phase 4; until then this is not a link */}
          <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
            <LuClock className="h-4 w-4" aria-hidden="true" />
            Case study coming soon
          </span>
        </div>
      </article>
    </Card>
  );
}

export default function FeaturedProjects() {
  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Featured projects"
        title="Selected work across platforms and AI."
        lead="Professional systems and personal products. Detailed case studies with architecture, decisions and trade-offs are on the way."
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((p) => (
          <StaggerItem key={p.slug}>
            <ProjectCard project={p} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <p className="text-[15px] text-muted">
          {otherProjects.length} more professional projects, including work for Ericsson and Medplus, are listed under
          each role in{" "}
          <a href="#experience" className={`rounded font-medium text-accent hover:underline ${focusRing}`}>
            Experience
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
