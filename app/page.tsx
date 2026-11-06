import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  LuMail,
  LuFileText,
} from "react-icons/lu";
import {
  skillsOverview,
  experiences,
  projects,
  skillGroups,
} from "@/app/data";
import {
  ScrollProgress,
  HeroBackground,
  HeroItem,
  WordReveal,
  Magnetic,
  ScrollCue,
  Reveal,
  Stagger,
  StaggerItem,
  SpotlightCard,
  Timeline,
  TimelineItem,
  Pill,
} from "@/app/components/motion";

/* ============================ PAGE ============================ */

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-stone-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ScrollProgress />
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative isolate overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <HeroBackground />

        <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-center px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            {/* Status badge */}
            <HeroItem>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <span
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Available to connect
              </span>
            </div>
            </HeroItem>

            <HeroItem delay={0.1}>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Software Engineer · Cloud · AI
            </p>
            </HeroItem>

            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl dark:text-white">
              <WordReveal text="Hi, I'm" delay={0.15} />{" "}
              <WordReveal
                text="Narendra Avula."
                delay={0.3}
                wordClassName="animate-gradient bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400"
              />
            </h1>

            <HeroItem delay={0.55}>
            <h2 className="mt-6 text-2xl font-semibold leading-tight text-zinc-700 md:text-3xl dark:text-zinc-300">
              Senior Software Engineer · AI &amp; Cloud
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Building reliable software systems and exploring the intersection
              of software engineering, cloud, and Generative AI.
            </p>
            </HeroItem>

            <HeroItem delay={0.7} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
              <a
                href="#projects"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-colors duration-200 hover:bg-zinc-800 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-white dark:text-zinc-950 dark:shadow-white/5 dark:hover:bg-zinc-200 dark:focus-visible:outline-white"
              >
                View My Work
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              </Magnetic>

              <Magnetic>
              <a
                href="/resume.pdf"
                download="Narendra_Avula_Resume.pdf"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-6 py-3 text-center backdrop-blur text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-white"
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
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline dark:text-zinc-400 dark:hover:text-white dark:focus-visible:text-white"
              >
                <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
              <a
                href="https://github.com/narendra-avula/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline dark:text-zinc-400 dark:hover:text-white dark:focus-visible:text-white"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </HeroItem>

            <ScrollCue />
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <Reveal>
              {/* Monogram */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-lg">
                NA
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                About Me
              </p>

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
          <div className="mt-20">
            <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Current Focus
            </p>

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
                    <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
                    <div
                      className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${skill.iconColor}1A` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: skill.iconColor }}
                        aria-hidden="true"
                      />
                    </div>
                    </div>

                    <h4 className="text-xl font-semibold text-zinc-950 dark:text-white">
                      {skill.title}
                    </h4>

                    <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
                      {skill.description}
                    </p>

                    <p className="mt-6 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      {skill.technologies}
                    </p>
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
          <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Experience
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            11+ years of software engineering.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A journey across e-commerce, telecom, cloud platforms, resiliency
            engineering, and AI-assisted developer tooling.
          </p>
          </Reveal>

          <div className="mt-16 max-w-5xl">
          <Timeline>
          <div className="space-y-14">
            {experiences.map((exp) => (
              <TimelineItem key={exp.company} highlight={exp.current}>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {exp.period}
                  </p>
                  {exp.current && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
                  {exp.role}
                </h3>

                <h4 className="mt-1 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  {exp.company}
                </h4>

                <p className="mt-5 font-semibold text-zinc-900 dark:text-zinc-100">
                  {exp.domain}
                </p>

                <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {exp.description}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  {exp.technologies}
                </p>
              </TimelineItem>
            ))}
          </div>
          </Timeline>
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            Things I&apos;ve worked on.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A collection of professional projects and personal explorations
            across software engineering, cloud, reliability, and AI.
          </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <StaggerItem key={project.title}>
              <SpotlightCard className="p-8">
              <article>
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-sm font-bold text-transparent dark:from-blue-400 dark:to-violet-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-zinc-950 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    {project.technologies}
                  </p>
                </div>
              </article>
              </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== EDUCATION ==================== */}
      <section id="education" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Education
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            Learning never stops.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            My academic background and ongoing learning across software
            engineering, cloud, machine learning, and AI.
          </p>
          </Reveal>

          <div className="mt-16 max-w-5xl">
          <Timeline>
          <div className="space-y-16">
            {/* B.Tech */}
            <TimelineItem highlight>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Undergraduate
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                Bachelor of Technology — Computer Science & Engineering
              </h3>

              <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Anil Neerukonda Institute of Technology & Sciences
              </p>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Affiliated to Andhra University
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Graduated with a CGPA of 7.5, building a foundation in computer
                science, programming, software development, databases, and
                engineering fundamentals.
              </p>
            </TimelineItem>

            {/* M.Tech */}
            <TimelineItem>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Postgraduate / Professional Education
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                M.Tech — Artificial Intelligence & Machine Learning
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

            {/* AWS */}
            <TimelineItem>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Certification
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                AWS Certified Developer — Associate
              </h3>

              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Certification focused on developing, deploying, and maintaining
                applications on AWS.
              </p>
            </TimelineItem>
          </div>
          </Timeline>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Skills
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            Tools and technologies.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Technologies I&apos;ve worked with throughout my career and areas
            I&apos;m currently exploring.
          </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <StaggerItem key={group.title}>
              <SpotlightCard className="p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    {group.title}
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {group.skills.length}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map(({ name, icon: Icon, color }) => (
                    <Pill key={name}>
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full dark:bg-zinc-100!"
                        style={{
                          backgroundColor: color ? `${color}1A` : "#F4F4F5",
                        }}
                      >
                        <Icon
                          className="h-3.5 w-3.5"
                          style={color ? { color } : undefined}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-medium">{name}</span>
                    </Pill>
                  ))}
                </div>
              </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Contact
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            Let&apos;s connect.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Interested in software engineering, cloud, AI/GenAI, developer
            tooling, or simply want to connect? Feel free to reach out.
          </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Email */}
            <StaggerItem>
            <SpotlightCard>
            <a
              href="mailto:narendraavula2@gmail.com"
              className="block rounded-2xl p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#EA43351A" }}
                >
                  <LuMail
                    className="h-4 w-4"
                    style={{ color: "#EA4335" }}
                    aria-hidden="true"
                  />
                </span>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Email
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950 dark:text-white">
                narendraavula2@gmail.com
              </h3>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Send me an email{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>
            </SpotlightCard>
            </StaggerItem>

            {/* LinkedIn */}
            <StaggerItem>
            <SpotlightCard>
            <a
              href="https://www.linkedin.com/in/narendraavula/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#0A66C21A" }}
                >
                  <FaLinkedin
                    className="h-4 w-4"
                    style={{ color: "#0A66C2" }}
                    aria-hidden="true"
                  />
                </span>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  LinkedIn
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950 dark:text-white">
                Connect on LinkedIn
              </h3>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Professional profile{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>
            </SpotlightCard>
            </StaggerItem>

            {/* GitHub */}
            <StaggerItem>
            <SpotlightCard>
            <a
              href="https://github.com/narendra-avula/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900/10 dark:bg-white/10"
                >
                  <FaGithub
                    className="h-4 w-4 text-zinc-900 dark:text-white"
                    aria-hidden="true"
                  />
                </span>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  GitHub
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950 dark:text-white">
                View my code
              </h3>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Projects and experiments{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>
            </SpotlightCard>
            </StaggerItem>

            {/* Resume */}
            <StaggerItem>
            <SpotlightCard>
            <a
              href="/resume.pdf"
              download="Narendra_Avula_Resume.pdf"
              className="block rounded-2xl p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#2563EB1A" }}
                >
                  <LuFileText
                    className="h-4 w-4"
                    style={{ color: "#2563EB" }}
                    aria-hidden="true"
                  />
                </span>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Resume
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950 dark:text-white">
                Download Resume
              </h3>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                View my professional experience{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>
            </SpotlightCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <Footer />
    </main>
  );
}
