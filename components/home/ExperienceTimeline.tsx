import { experiences } from "@/content/experience";
import { yearsLabel } from "@/content/profile";
import { Section, SectionHeader, TagList } from "@/components/ui";
import { Timeline, TimelineItem } from "@/components/motion";

export default function ExperienceTimeline() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Experience"
        title={`${yearsLabel} years of software engineering.`}
        lead="E-commerce, telecom, cloud platforms, resiliency engineering and AI-assisted developer tooling."
      />

      <div className="mt-14 max-w-4xl">
        <Timeline>
          <ol className="space-y-12">
            {experiences.map((exp) => (
              <TimelineItem key={exp.company} highlight={exp.current}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-mono text-xs text-subtle">
                    <time>{exp.start}</time> — <time>{exp.end}</time>
                  </p>
                  {exp.current && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-fg">{exp.role}</h3>
                <p className="mt-0.5 text-muted">
                  {exp.company} · <span className="text-subtle">{exp.domain}</span>
                </p>
                <p className="mt-4 max-w-3xl leading-7 text-muted">{exp.summary}</p>
                <div className="mt-4">
                  <TagList items={exp.technologies} />
                </div>
              </TimelineItem>
            ))}
          </ol>
        </Timeline>
      </div>
    </Section>
  );
}
