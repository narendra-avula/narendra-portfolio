import Link from "next/link";
import { LuArrowRight, LuClock } from "react-icons/lu";
import { hasCaseStudy, type Project } from "@/content/projects";
import { Card, TagList, focusRing } from "@/components/ui";
import ProjectVisualPanel from "@/components/projects/ProjectVisual";

/**
 * Project summary card. With a case study the whole card is clickable
 * (stretched link on the title); otherwise it says the case study is coming.
 */
export default function ProjectCard({
  project,
  showVisual = true,
  headingLevel = "h3",
}: {
  project: Project;
  showVisual?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const href = hasCaseStudy(project.slug) ? `/projects/${project.slug}` : null;
  const Heading = headingLevel;
  const meta = [project.kind, project.client && `Client: ${project.client}`, project.period].filter(Boolean);

  return (
    <Card interactive className="relative flex h-full flex-col p-5 md:p-6">
      <article className="flex h-full flex-col" aria-labelledby={`project-${project.slug}`}>
        {showVisual && project.visual && <ProjectVisualPanel variant={project.visual} />}
        <div className={`${showVisual && project.visual ? "mt-5" : ""} flex flex-wrap items-center gap-2 text-xs`}>
          <span className="font-medium text-accent">{project.category}</span>
          {meta.map((m) => (
            <span key={m} className="contents">
              <span className="text-subtle" aria-hidden="true">
                ·
              </span>
              <span className="text-subtle">{m}</span>
            </span>
          ))}
        </div>
        <Heading id={`project-${project.slug}`} className="mt-2 text-xl font-semibold text-fg">
          {href ? (
            <Link
              href={href}
              className={`rounded after:absolute after:inset-0 after:rounded-xl after:content-[''] ${focusRing}`}
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Heading>
        <p className="mt-3 flex-1 leading-7 text-muted">{project.summary}</p>
        <div className="mt-5">
          {project.technologies.length > 0 ? (
            <TagList items={project.technologies} />
          ) : (
            <TagList items={project.focusAreas} label="Focus areas" />
          )}
        </div>
        <div className="mt-5 border-t border-line pt-4 text-sm">
          {href ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-accent" aria-hidden="true">
              View case study
              <LuArrowRight className="h-4 w-4" />
            </span>
          ) : project.company ? (
            <Link
              href="/#experience"
              className={`inline-flex items-center gap-1.5 rounded font-medium text-muted hover:text-fg ${focusRing}`}
            >
              Details under Experience
              <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-subtle">
              <LuClock className="h-4 w-4" aria-hidden="true" />
              Case study coming soon
            </span>
          )}
        </div>
      </article>
    </Card>
  );
}
