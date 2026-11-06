import { careerStages } from "@/content/experience";
import { now } from "@/content/extras";
import { profile, yearsLabel } from "@/content/profile";
import { Card, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function ProfessionalSummary() {
  return (
    <Section id="about">
      <SectionHeader
        eyebrow="About"
        title="From e-commerce to resilient platforms and AI tooling."
        lead={`${yearsLabel} years of building software across e-commerce, telecom, cloud platforms and resiliency engineering. My work today sits where reliable backend systems meet practical AI.`}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Career evolution */}
        <Stagger as="ol" className="relative space-y-0">
          {careerStages.map((s, i) => (
            <StaggerItem as="li" key={s.stage} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-8 last:pb-0">
              {i < careerStages.length - 1 && (
                <span aria-hidden="true" className="absolute left-[15px] top-8 bottom-0 w-px bg-line" />
              )}
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs ${
                  i === careerStages.length - 1
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line bg-surface text-subtle"
                }`}
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-lg font-semibold text-fg">{s.stage}</h3>
                  <span className="font-mono text-xs text-subtle">{s.period}</span>
                </div>
                <p className="mt-1.5 leading-7 text-muted">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Now (decision D5) */}
        <Reveal>
          <Card className="p-6 md:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow>Now</Eyebrow>
              <p className="text-xs text-subtle">Updated {now.updated}</p>
            </div>
            <dl className="mt-5 space-y-4">
              {now.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold text-fg">{item.label}</dt>
                  <dd className="mt-1 text-[15px] leading-7 text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-line pt-5 text-sm text-subtle">
              Based in {profile.location}.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
