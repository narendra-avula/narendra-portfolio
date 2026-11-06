import { FaGithub } from "react-icons/fa";
import { LuArrowUpRight, LuBookMarked } from "react-icons/lu";
import { experiences } from "@/content/experience";
import { featuredRepos, impact } from "@/content/extras";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillCount } from "@/content/skills";
import { getContributions, type Contributions } from "@/lib/github";
import { Card, Eyebrow, Section, SectionHeader, focusRing } from "@/components/ui";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";

const levelColors = [
  "bg-surface-2",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabels(weeks: Contributions["weeks"]): string[] {
  const month = (w: Contributions["weeks"][number]) => {
    const first = w.find((d) => d !== null);
    return first ? Number(first.date.slice(5, 7)) - 1 : -1;
  };
  return weeks.map((w, i) => {
    const m = month(w);
    // Skip the last two columns so the label isn't clipped at the edge
    const isNew = i === 0 || month(weeks[i - 1]) !== m;
    return m >= 0 && isNew && i < weeks.length - 2 ? monthNames[m] : "";
  });
}

function ContributionGraph({ data }: { data: Contributions }) {
  const months = monthLabels(data.weeks);
  const cols = { gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))` };
  return (
    // Focusable so keyboard users can scroll it on narrow screens
    <div
      role="region"
      aria-label="GitHub contributions (scrollable)"
      tabIndex={0}
      className={`overflow-x-auto rounded-md pb-1 ${focusRing}`}
    >
      <div className="min-w-[680px]">
        <div className="grid gap-[3px] text-[10px] text-subtle" style={cols} aria-hidden="true">
          {months.map((m, i) => (
            <span key={i} className="whitespace-nowrap">
              {m}
            </span>
          ))}
        </div>
        <div
          className="mt-2 grid gap-[3px]"
          style={cols}
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
        >
          {data.weeks.map((week, wi) => (
            <div key={wi} className="grid grid-rows-7 gap-[3px]">
              {week.map((day, di) =>
                day ? (
                  <span
                    key={di}
                    title={day.label}
                    className={`aspect-square w-full rounded-[2px] ${levelColors[day.level] ?? levelColors[0]}`}
                  />
                ) : (
                  <span key={di} className="aspect-square w-full" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function EngineeringImpact() {
  const contributions = await getContributions(profile.githubUsername);

  const stats = [
    { value: profile.yearsExperience, suffix: "+", label: "Years building software" },
    { value: experiences.length, suffix: "", label: "Companies" },
    { value: Math.floor(skillCount / 5) * 5, suffix: "+", label: "Tools & technologies" },
    { value: projects.length, suffix: "", label: "Projects documented" },
  ];

  return (
    <Section id="impact">
      <SectionHeader
        eyebrow="Engineering impact"
        title="What the work has covered."
        lead="Highlights from enterprise platforms, telecom systems, product engineering and AI tooling."
      />

      <Stagger className="mt-12 grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-line gap-px md:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="bg-surface p-5 md:p-6">
            <p className="text-3xl font-semibold text-fg md:text-4xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1.5 text-sm text-muted">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {impact.map((item) => (
          <StaggerItem key={item.title}>
            <Card className="h-full p-6">
              <p className="font-mono text-xs text-subtle">{item.context}</p>
              <h3 className="mt-2 font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{item.text}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      {/* GitHub activity (decision D5) */}
      <Reveal className="mt-5">
        <Card className="p-6 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Building in public</Eyebrow>
              {contributions ? (
                <p className="mt-2 text-fg">
                  <span className="text-2xl font-semibold">
                    <CountUp to={contributions.total} />
                  </span>{" "}
                  <span className="text-muted">GitHub contributions in the last year</span>
                </p>
              ) : (
                <p className="mt-2 text-muted">Side projects and experiments on GitHub.</p>
              )}
            </div>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg border border-line px-3.5 text-sm text-fg transition-colors hover:bg-surface-2 ${focusRing}`}
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />@{profile.githubUsername}
              <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {contributions && (
            <div className="mt-6">
              <ContributionGraph data={contributions} />
            </div>
          )}

          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredRepos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={`${profile.links.github}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block h-full rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-line-strong ${focusRing}`}
                >
                  <span className="flex items-center justify-between gap-2 font-mono text-sm font-medium text-fg">
                    <span className="flex items-center gap-2">
                      <LuBookMarked className="h-4 w-4 text-subtle" aria-hidden="true" />
                      {repo.name}
                    </span>
                    <LuArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted">{repo.description}</span>
                  <span className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.languageColor }} aria-hidden="true" />
                    {repo.language}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  );
}
