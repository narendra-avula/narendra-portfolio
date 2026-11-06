import { LuArrowUpRight, LuAward, LuBadgeCheck, LuGraduationCap } from "react-icons/lu";
import { education } from "@/content/education";
import { Card, Section, SectionHeader, focusRing } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader
        eyebrow="Education & certifications"
        title="Learning never stops."
        lead="Computer science foundations, a postgraduate degree in AI & ML in progress, and cloud certification."
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {education.map((e) => {
          const Icon = e.kind === "Certification" ? LuAward : LuGraduationCap;
          return (
            <StaggerItem key={e.title}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  {e.status && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        e.status === "Pursuing" ? "bg-accent-soft text-accent" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {e.status}
                    </span>
                  )}
                </div>
                <p className="mt-5 font-mono text-xs text-subtle">{e.kind}</p>
                <h3 className="mt-1.5 font-semibold leading-snug text-fg">{e.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.institution}
                  {e.detail && <span className="text-subtle"> · {e.detail}</span>}
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-muted">{e.description}</p>
                {e.verifyUrl && (
                  <a
                    href={e.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2 ${focusRing}`}
                  >
                    <LuBadgeCheck className="h-4 w-4 text-[#FF9900]" aria-hidden="true" />
                    Verify on Credly
                    <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
