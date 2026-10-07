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

/* ============================ PAGE ============================ */

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-stone-50 text-zinc-900">
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative overflow-hidden border-b border-zinc-200">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute right-0 top-0 h-[560px] w-[560px] -translate-y-1/4 translate-x-1/4 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #dbeafe 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/4 translate-y-1/4 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #ede9fe 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            {/* Status badge */}
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 shadow-sm">
              <span
                className="h-2 w-2 rounded-full bg-green-500"
                style={{ boxShadow: "0 0 0 3px #22c55e2a" }}
              />
              <span className="text-xs font-medium text-zinc-600">
                Available to connect
              </span>
            </div>

            <p className="animate-fade-up-1 mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Software Engineer · Cloud · AI
            </p>

            <h1 className="animate-fade-up-1 text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Narendra Avula.
              </span>
            </h1>

            <h2 className="animate-fade-up-2 mt-6 text-2xl font-semibold leading-tight text-zinc-700 md:text-3xl">
              Senior Software Engineer · AI &amp; Cloud
            </h2>

            <p className="animate-fade-up-2 mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Building reliable software systems and exploring the intersection
              of software engineering, cloud, and Generative AI.
            </p>

            <div className="animate-fade-up-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="rounded-full bg-zinc-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                View My Work
              </a>

              <a
                href="/resume.pdf"
                download="Narendra_Avula_Resume.pdf"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="animate-fade-up-3 mt-8 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/narendraavula/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline"
              >
                <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <span className="text-zinc-300" aria-hidden="true">·</span>
              <a
                href="https://github.com/narendra-avula/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <div>
              {/* Monogram */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-lg">
                NA
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                About Me
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl">
                Engineering with curiosity.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-zinc-600">
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
            </div>
          </div>

          {/* Current Focus */}
          <div className="mt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Current Focus
            </p>

            <h3 className="mt-3 text-3xl font-bold text-zinc-950">
              What I&apos;m interested in
            </h3>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {skillsOverview.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.title}
                    className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
                  >
                    <div
                      className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: skill.iconBg }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: skill.iconColor }}
                        aria-hidden="true"
                      />
                    </div>

                    <h4 className="text-xl font-semibold text-zinc-950">
                      {skill.title}
                    </h4>

                    <p className="mt-4 leading-7 text-zinc-600">
                      {skill.description}
                    </p>

                    <p className="mt-6 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-500">
                      {skill.technologies}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section id="experience" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Experience
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            11+ years of software engineering.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            A journey across e-commerce, telecom, cloud platforms, resiliency
            engineering, and AI-assisted developer tooling.
          </p>

          <div className="mt-16 max-w-5xl space-y-12">
            {experiences.map((exp) => (
              <article
                key={exp.company}
                className={`relative border-l-2 pl-8 ${
                  exp.current ? "border-blue-500" : "border-zinc-200"
                }`}
              >
                <div
                  className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 ${
                    exp.current
                      ? "border-blue-600 bg-blue-600 shadow-[0_0_0_4px_#dbeafe]"
                      : "border-stone-50 bg-blue-500"
                  }`}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-blue-600">
                    {exp.period}
                  </p>
                  {exp.current && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                  {exp.role}
                </h3>

                <h4 className="mt-1 text-lg font-medium text-zinc-700">
                  {exp.company}
                </h4>

                <p className="mt-5 font-semibold text-zinc-900">
                  {exp.domain}
                </p>

                <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
                  {exp.description}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500">
                  {exp.technologies}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            Things I&apos;ve worked on.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            A collection of professional projects and personal explorations
            across software engineering, cloud, reliability, and AI.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-sm font-bold text-transparent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-zinc-950">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-zinc-100 pt-5">
                  <p className="text-sm leading-7 text-zinc-500">
                    {project.technologies}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EDUCATION ==================== */}
      <section id="education" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Education
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            Learning never stops.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            My academic background and ongoing learning across software
            engineering, cloud, machine learning, and AI.
          </p>

          <div className="mt-16 max-w-5xl space-y-16">
            {/* B.Tech */}
            <article className="border-l-2 border-blue-500 pl-8">
              <p className="text-sm font-semibold text-blue-600">
                Undergraduate
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950">
                Bachelor of Technology — Computer Science & Engineering
              </h3>

              <p className="mt-2 text-lg font-medium text-zinc-700">
                Anil Neerukonda Institute of Technology & Sciences
              </p>

              <p className="mt-2 text-zinc-500">
                Affiliated to Andhra University
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Graduated with a CGPA of 7.5, building a foundation in computer
                science, programming, software development, databases, and
                engineering fundamentals.
              </p>
            </article>

            {/* M.Tech */}
            <article className="border-l-2 border-zinc-200 pl-8">
              <p className="text-sm font-semibold text-blue-600">
                Postgraduate / Professional Education
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950">
                M.Tech — Artificial Intelligence & Machine Learning
              </h3>

              <p className="mt-2 text-lg font-medium text-zinc-700">
                BITS Pilani — Work Integrated Learning Programme
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Pursuing advanced studies in mathematical foundations for
                machine learning, statistical methods, machine learning, deep
                neural networks, and artificial intelligence.
              </p>
            </article>

            {/* AWS */}
            <article className="border-l-2 border-zinc-200 pl-8">
              <p className="text-sm font-semibold text-blue-600">
                Certification
              </p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950">
                AWS Certified Developer — Associate
              </h3>

              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Certification focused on developing, deploying, and maintaining
                applications on AWS.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Skills
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            Tools and technologies.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            Technologies I&apos;ve worked with throughout my career and areas
            I&apos;m currently exploring.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:border-zinc-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-950">
                    {group.title}
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
                    {group.skills.length}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map(({ name, icon: Icon, color }) => (
                    <span
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-1.5 pr-3.5 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-white"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
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
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Contact
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            Let&apos;s connect.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Interested in software engineering, cloud, AI/GenAI, developer
            tooling, or simply want to connect? Feel free to reach out.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Email */}
            <a
              href="mailto:narendraavula2@gmail.com"
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
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

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Email
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950">
                narendraavula2@gmail.com
              </h3>

              <p className="mt-3 text-zinc-600">
                Send me an email{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/narendraavula/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
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

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  LinkedIn
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950">
                Connect on LinkedIn
              </h3>

              <p className="mt-3 text-zinc-600">
                Professional profile{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/narendra-avula/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#1817171A" }}
                >
                  <FaGithub
                    className="h-4 w-4"
                    style={{ color: "#181717" }}
                    aria-hidden="true"
                  />
                </span>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  GitHub
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950">
                View my code
              </h3>

              <p className="mt-3 text-zinc-600">
                Projects and experiments{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Narendra_Avula_Resume.pdf"
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
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

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Resume
                </p>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-950">
                Download Resume
              </h3>

              <p className="mt-3 text-zinc-600">
                View my professional experience{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
