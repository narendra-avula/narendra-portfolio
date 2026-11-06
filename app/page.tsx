import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  LuMail,
  LuFileText,
  LuArrowUpRight,
  LuMapPin,
  LuBriefcase,
  LuBadgeCheck,
  LuQuote,
  LuBookMarked,
} from "react-icons/lu";
import {
  skillsOverview,
  experiences,
  projects,
  skillGroups,
  openTo,
  now,
  credentials,
  testimonials,
  github,
} from "@/app/data";
import { getContributions, type Contributions } from "@/app/lib/github";
import {
  ScrollProgress,
  HeroBackground,
  HeroItem,
  WordReveal,
  Magnetic,
  Reveal,
  Stagger,
  StaggerItem,
  SpotlightCard,
  Timeline,
  TimelineItem,
} from "@/app/components/motion";
import { CodeCard, CountUp, SkillTabs } from "@/app/components/sections";

/* ============================ HELPERS ============================ */

const eyebrow =
  "text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400";
const sectionTitle =
  "mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white";
const sectionLead =
  "mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white";

/* "Python · Django · AWS" -> small tags */
function Tags({ list, className = "" }: { list: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {list.split(" · ").map((t) => (
        <li
          key={t}
          className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function SectionHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal>
      <p className={eyebrow}>{label}</p>
      <h2 className={sectionTitle}>{title}</h2>
      {lead && <p className={sectionLead}>{lead}</p>}
    </Reveal>
  );
}

// Every unique skill with a brand colour, for the logo marquee
const marqueeSkills = Array.from(
  new Map(
    skillGroups
      .flatMap((g) => g.skills)
      .filter((s) => s.color)
      .map((s) => [s.name, s])
  ).values()
);

const techCount = new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name))).size;

const stats = [
  { value: 11, suffix: "+", label: "Years building software" },
  { value: experiences.length, suffix: "", label: "Companies across 3 domains" },
  { value: Math.floor(techCount / 5) * 5, suffix: "+", label: "Tools & technologies" },
  { value: projects.length, suffix: "", label: "Featured projects" },
];

const levelColors = [
  "bg-zinc-200 dark:bg-zinc-800",
  "bg-blue-200 dark:bg-blue-950",
  "bg-blue-400 dark:bg-blue-800",
  "bg-violet-500 dark:bg-violet-600",
  "bg-violet-700 dark:bg-violet-400",
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Month label above the first week of each month
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
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[680px]">
        <div className="grid gap-[3px] text-[10px] text-zinc-500 dark:text-zinc-400" style={cols}>
          {months.map((m, i) => (
            <span key={i} className="overflow-visible whitespace-nowrap">
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
                    className={`aspect-square w-full rounded-[3px] ${levelColors[day.level] ?? levelColors[0]}`}
                  />
                ) : (
                  <span key={di} className="aspect-square w-full" />
                )
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
          Less
          {levelColors.map((c) => (
            <span key={c} className={`h-[11px] w-[11px] rounded-[3px] ${c}`} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}

/* ============================ PAGE ============================ */

export default async function Home() {
  const contributions = await getContributions(github.username);
  const aws = credentials[0];

  return (
    <main id="top" className="min-h-screen bg-stone-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ScrollProgress />
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative isolate overflow-hidden">
        <HeroBackground />

        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-center gap-16 px-6 py-20 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {/* Status badge */}
            <HeroItem>
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Available to connect
                </span>
              </div>
            </HeroItem>

            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl xl:text-7xl dark:text-white">
              <WordReveal text="Hi, I'm" delay={0.15} />{" "}
              <WordReveal
                text="Narendra Avula."
                delay={0.3}
                wordClassName="animate-gradient bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400"
              />
            </h1>

            <HeroItem delay={0.55}>
              <p className="mt-6 text-xl font-semibold text-zinc-800 md:text-2xl dark:text-zinc-200">
                Software Engineer at{" "}
                <span className="text-zinc-950 underline decoration-blue-500/40 decoration-2 underline-offset-4 dark:text-white">
                  JPMorgan Chase
                </span>{" "}
                <span className="whitespace-nowrap">· Cloud &amp; AI</span>
              </p>

              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Building reliable software systems and exploring the intersection
                of software engineering, cloud, and Generative AI.
              </p>
            </HeroItem>

            <HeroItem delay={0.7} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="#projects"
                  className={`group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-colors duration-200 hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-zinc-950 dark:shadow-white/5 dark:hover:bg-zinc-200 ${focusRing}`}
                >
                  View My Work
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="/resume.pdf"
                  download="Narendra_Avula_Resume.pdf"
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-900 backdrop-blur transition-colors duration-200 hover:border-zinc-400 hover:bg-zinc-100 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 ${focusRing}`}
                >
                  Download Resume
                </a>
              </Magnetic>
            </HeroItem>

            {/* Social links */}
            <HeroItem delay={0.85} className="mt-8 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/narendraavula/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline dark:text-zinc-400 dark:hover:text-white"
              >
                <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
              <a
                href="https://github.com/narendra-avula/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline dark:text-zinc-400 dark:hover:text-white"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </HeroItem>
          </div>

          {/* Code card (desktop) */}
          <div className="hidden lg:block">
            <CodeCard />
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section aria-label="Highlights" className="border-y border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={`px-2 md:px-6 ${i > 0 ? "md:border-l md:border-zinc-200 md:dark:border-zinc-800" : ""}`}
            >
              <p className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ==================== OPEN TO + NOW ==================== */}
      <section aria-label="Open to and now" className="border-b border-zinc-200 dark:border-zinc-800">
        <Stagger className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-[1fr_1.15fr] md:py-20">
          {/* Open to */}
          <StaggerItem>
            <SpotlightCard className="h-full p-8" color="rgba(34, 197, 94, 0.10)">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                  Open to
                </p>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-zinc-950 md:text-3xl dark:text-white">
                Roles I&apos;m interested in
              </h2>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {openTo.roles.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
                  >
                    <LuBriefcase className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-100 pt-5 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <LuMapPin className="h-4 w-4" aria-hidden="true" />
                  {openTo.location}
                </span>
                <span>{openTo.workMode}</span>
              </div>

              <a
                href="#contact"
                className={`group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 ${focusRing}`}
              >
                Let&apos;s talk
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </SpotlightCard>
          </StaggerItem>

          {/* Now */}
          <StaggerItem>
            <SpotlightCard className="h-full p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className={eyebrow}>Now</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Updated {now.updated}</p>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-zinc-950 md:text-3xl dark:text-white">
                What I&apos;m focused on
              </h2>
              <dl className="mt-6 space-y-4">
                {now.items.map((item) => (
                  <div key={item.label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-zinc-950 dark:text-white">{item.label}</dt>
                    <dd className="leading-7 text-zinc-600 dark:text-zinc-400">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-lg">
                NA
              </div>
              <p className={eyebrow}>About Me</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl dark:text-white">
                Engineering with curiosity.
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="space-y-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              <p>
                I&apos;m a software engineer with 11+ years of experience
                building backend services, web applications, APIs, cloud-based
                solutions, and engineering platforms.
              </p>
              <p>
                My career has evolved from web and e-commerce development to
                telecom systems, cloud platforms, resiliency engineering, and
                AI-assisted developer tools.
              </p>
              <p>
                At JPMorgan Chase, my work has moved further into resiliency
                engineering, chaos engineering, cloud environments, automation,
                and observability. More recently, I have been exploring machine
                learning, deep learning, large language models, Generative AI,
                RAG, and AI-assisted developer tooling.
              </p>
            </Reveal>
          </div>

          {/* Current Focus */}
          <div className="mt-24">
            <Reveal>
              <p className={eyebrow}>Current Focus</p>
              <h3 className="mt-3 text-3xl font-bold text-zinc-950 dark:text-white">
                What I&apos;m interested in
              </h3>
            </Reveal>

            <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {skillsOverview.map((skill) => {
                const Icon = skill.icon;
                return (
                  <StaggerItem key={skill.title}>
                    <SpotlightCard color={`${skill.iconColor}1F`} className="p-7">
                      <div
                        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                        style={{ backgroundColor: `${skill.iconColor}1A` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: skill.iconColor }} aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-semibold text-zinc-950 dark:text-white">{skill.title}</h4>
                      <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">{skill.description}</p>
                      <Tags list={skill.technologies} className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800" />
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section id="experience" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            label="Experience"
            title="11+ years of software engineering."
            lead="A journey across e-commerce, telecom, cloud platforms, resiliency engineering, and AI-assisted developer tooling."
          />

          <div className="mt-16 max-w-5xl">
            <Timeline>
              <div className="space-y-14">
                {experiences.map((exp) => (
                  <TimelineItem key={exp.company} highlight={exp.current}>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{exp.period}</p>
                      {exp.current && (
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">{exp.role}</h3>
                    <h4 className="mt-1 text-lg font-medium text-zinc-700 dark:text-zinc-300">{exp.company}</h4>
                    <p className="mt-5 font-semibold text-zinc-900 dark:text-zinc-100">{exp.domain}</p>
                    <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                    <Tags list={exp.technologies} className="mt-5 max-w-3xl" />
                  </TimelineItem>
                ))}
              </div>
            </Timeline>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <SectionHeader label="Recommendations" title="What colleagues say." />
            <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <SpotlightCard className="flex h-full flex-col p-8">
                    <LuQuote className="h-7 w-7 text-violet-500 dark:text-violet-400" aria-hidden="true" />
                    <blockquote className="mt-5 flex-1 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                      <p className="font-semibold text-zinc-950 dark:text-white">{t.name}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.role}</p>
                      {t.relationship && (
                        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{t.relationship}</p>
                      )}
                    </figcaption>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            label="Projects"
            title="Things I've worked on."
            lead="A collection of professional projects and personal explorations across software engineering, cloud, reliability, and AI."
          />

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <StaggerItem key={project.title}>
                <SpotlightCard className="flex h-full flex-col p-8">
                  <article className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text font-[family-name:var(--font-display)] text-3xl font-bold text-transparent dark:from-blue-400 dark:to-violet-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-zinc-950 dark:text-white">{project.title}</h3>
                    <p className="mt-4 flex-1 leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>
                    <Tags list={project.technologies} className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800" />
                  </article>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== GITHUB ==================== */}
      <section id="github" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            label="GitHub"
            title="Building in public."
            lead="Experiments, coursework and side projects, outside the day job."
          />

          {contributions && (
            <Reveal className="mt-14">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                      <CountUp to={contributions.total} />
                    </p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">contributions in the last year</p>
                  </div>
                  <a
                    href={`https://github.com/${github.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 ${focusRing}`}
                  >
                    <FaGithub className="h-4 w-4" aria-hidden="true" />
                    @{github.username}
                    <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <ContributionGraph data={contributions} />
              </div>
            </Reveal>
          )}

          <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
            {github.featuredRepos.map((repo) => (
              <StaggerItem key={repo.name}>
                <SpotlightCard className="h-full">
                  <a
                    href={`https://github.com/${github.username}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full rounded-2xl p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 font-mono text-sm font-semibold text-zinc-950 dark:text-white">
                        <LuBookMarked className="h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                        {repo.name}
                      </span>
                      <LuArrowUpRight
                        className="h-4 w-4 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">{repo.description}</p>
                    <p className="mt-5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      {repo.language}
                    </p>
                  </a>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== EDUCATION (split layout) ==================== */}
      <section id="education" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1fr_1.5fr] md:py-28">
          <div>
            <div className="md:sticky md:top-28">
              <SectionHeader
                label="Education"
                title="Learning never stops."
                lead="My academic background and ongoing learning across software engineering, cloud, machine learning, and AI."
              />
            </div>
          </div>

          <Timeline>
            <div className="space-y-14">
              <TimelineItem highlight>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Postgraduate / Professional Education
                </p>
                <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                  M.Tech — Artificial Intelligence &amp; Machine Learning
                </h3>
                <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  BITS Pilani — Work Integrated Learning Programme
                </p>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Pursuing advanced studies in mathematical foundations for
                  machine learning, statistical methods, machine learning, deep
                  neural networks, and artificial intelligence.
                </p>
              </TimelineItem>

              <TimelineItem>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Certification</p>
                <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                  {aws.name}
                </h3>
                <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">{aws.issuer}</p>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Certification focused on developing, deploying, and maintaining
                  applications on AWS.
                </p>
                {aws.verifyUrl && (
                  <a
                    href={aws.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#FF9900]/40 bg-[#FF9900]/10 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-[#FF9900]/20 dark:text-zinc-100 ${focusRing}`}
                  >
                    <LuBadgeCheck className="h-4 w-4 text-[#FF9900]" aria-hidden="true" />
                    Verify credential
                    <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </TimelineItem>

              <TimelineItem>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Undergraduate</p>
                <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                  Bachelor of Technology — Computer Science &amp; Engineering
                </h3>
                <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  Anil Neerukonda Institute of Technology &amp; Sciences
                </p>
                <p className="mt-2 text-zinc-500 dark:text-zinc-400">Affiliated to Andhra University</p>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Graduated with a CGPA of 7.5, building a foundation in computer
                  science, programming, software development, databases, and
                  engineering fundamentals.
                </p>
              </TimelineItem>
            </div>
          </Timeline>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <SectionHeader
            label="Skills"
            title="Tools and technologies."
            lead="Technologies I've worked with throughout my career and areas I'm currently exploring."
          />
        </div>

        {/* Logo marquee */}
        <div
          className="marquee relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          aria-hidden="true"
        >
          <div className="animate-marquee flex w-max gap-3">
            {[...marqueeSkills, ...marqueeSkills].map(({ name, icon: Icon, color }, i) => (
              <span
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <Icon className="h-4 w-4" style={{ color }} />
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28">
          <Reveal>
            <SkillTabs />
          </Reveal>
        </div>
      </section>

      {/* ==================== CONTACT (CTA band) ==================== */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 text-white shadow-2xl md:px-16 md:py-20 dark:border dark:border-zinc-800 dark:bg-zinc-900">
              {/* Glow + grid */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                  }}
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Contact</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                Let&apos;s connect.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                Interested in software engineering, cloud, AI/GenAI, developer
                tooling, or simply want to connect? Feel free to reach out.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic>
                  <a
                    href="mailto:narendraavula2@gmail.com"
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg transition-colors hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                  >
                    <LuMail className="h-4 w-4" aria-hidden="true" />
                    narendraavula2@gmail.com
                    <LuArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </Magnetic>

                <div className="flex flex-wrap gap-3">
                  {[
                    { href: "https://www.linkedin.com/in/narendraavula/", label: "LinkedIn", Icon: FaLinkedin, external: true },
                    { href: "https://github.com/narendra-avula/", label: "GitHub", Icon: FaGithub, external: true },
                    { href: "/resume.pdf", label: "Resume", Icon: LuFileText, external: false },
                  ].map(({ href, label, Icon, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : { download: "Narendra_Avula_Resume.pdf" })}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
