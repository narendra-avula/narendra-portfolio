import { LuChevronDown } from "react-icons/lu";
import { experiences } from "@/content/experience";
import { projectsAt } from "@/content/projects";
import { yearsLabel } from "@/content/profile";
import { Section, SectionHeader, TagList, focusRing } from "@/components/ui";
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
          <ol className="space-y-14">
            {experiences.map((exp) => {
              const related = projectsAt(exp.company);
              return (
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

                  <p className="mt-4 max-w-3xl leading-7 text-muted">{exp.businessContext}</p>

                  <ul className="mt-4 max-w-3xl space-y-2" aria-label={`Responsibilities at ${exp.company}`}>
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 leading-7 text-fg">
                        <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <TagList items={exp.technologies} />
                  </div>

                  {related.length > 0 && (
                    <details className="group mt-6 max-w-3xl rounded-xl border border-line bg-surface">
                      <summary
                        className={`flex min-h-12 list-none items-center justify-between gap-3 rounded-xl px-5 text-sm font-medium text-fg [&::-webkit-details-marker]:hidden ${focusRing}`}
                      >
                        <span>
                          Projects at {exp.company.split(" / ")[0]}{" "}
                          <span className="text-subtle">({related.length})</span>
                        </span>
                        <LuChevronDown
                          className="h-4 w-4 text-subtle transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <ul className="divide-y divide-line border-t border-line">
                        {related.map((p) => (
                          <li key={p.slug} className="px-5 py-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <h4 className="font-semibold text-fg">{p.title}</h4>
                              <p className="font-mono text-xs text-subtle">
                                {[p.client && `Client: ${p.client}`, p.period].filter(Boolean).join(" · ")}
                              </p>
                            </div>
                            <p className="mt-1.5 text-[15px] leading-7 text-muted">{p.summary}</p>
                            {p.highlights && p.highlights.length > 0 && (
                              <ul className="mt-3 space-y-1.5">
                                {p.highlights.map((h) => (
                                  <li key={h} className="flex gap-3 text-[15px] leading-7 text-fg">
                                    <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <p className="mt-3 font-mono text-xs text-subtle">{p.technologies.join(" · ")}</p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </TimelineItem>
              );
            })}
          </ol>
        </Timeline>
      </div>
    </Section>
  );
}
