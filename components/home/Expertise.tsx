import { practices, skillGroups } from "@/content/skills";
import { Card, Section, SectionHeader } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function Expertise() {
  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Engineering expertise"
        title="Tools I use to build and run systems."
        lead="Grouped by where they show up in my work, from backend services to the reliability and AI layers around them."
      />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ title, icon: GroupIcon, skills }) => (
          <StaggerItem key={title}>
            <Card interactive className="h-full p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                  <GroupIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-fg">{title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${title} skills`}>
                {skills.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-fg"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-muted"
                      style={color ? { color } : undefined}
                      aria-hidden="true"
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-8">
        <p className="text-sm text-muted">
          <span className="font-medium text-fg">Practices: </span>
          {practices.join(" · ")}
        </p>
      </Reveal>
    </Section>
  );
}
