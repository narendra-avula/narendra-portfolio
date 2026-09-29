
/* ============================ DATA ============================ */

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import type { IconType } from "react-icons";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiGnubash,
  SiDjango,
  SiFlask,
  SiRabbitmq,
  SiAngular,
  SiReact,
  SiIonic,
  SiBootstrap,
  SiLinux,
  SiGit,
  SiJenkins,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiLangchain,
  SiPrometheus,
  SiGrafana,
} from "react-icons/si";
import {
  LuWebhook,
  LuBoxes,
  LuServer,
  LuDatabase,
  LuNetwork,
  LuBrain,
  LuSparkles,
  LuWorkflow,
  LuBot,
  LuZap,
  LuShield,
  LuEye,
  LuTestTube,
  LuCode,
  LuRefreshCw,
  LuFileCode,
  LuCloud,
  LuMail,
  LuFileText,
} from "react-icons/lu";

const skillsOverview = [
  {
    title: "Software Engineering",
    description:
      "Building backend services, APIs, web applications, and developer platforms.",
    technologies:
      "Python · Django · REST APIs · TypeScript · Angular · React",
  },
  {
    title: "Cloud & Reliability",
    description:
      "Designing reliable systems and working with cloud, automation, resiliency, and observability.",
    technologies:
      "AWS · Microservices · Automation · Chaos Engineering · Observability",
  },
  {
    title: "AI & GenAI",
    description:
      "Exploring practical applications of machine learning, LLMs, and Generative AI.",
    technologies:
      "ML · Deep Learning · LLMs · GenAI · RAG · LangChain",
  },
];

const experiences = [
  {
    period: "Apr 2022 — Present",
    company: "JPMorgan Chase",
    role: "Software Engineer III",
    domain: "Resiliency Engineering / Chaos Engineering",
    description:
      "Working on engineering solutions for testing and improving application resilience across private, public, and hybrid cloud environments.",
    technologies:
      "Python · Django · REST APIs · Microservices · Linux · Shell Scripting · Cloud · Observability",
  },
  {
    period: "Jul 2020 — Mar 2022",
    company: "Qvantel Software Solutions",
    role: "Senior Software Developer",
    domain: "Telecom BSS",
    description:
      "Worked on highly scalable telecom Business Support Systems and integrations with third-party systems.",
    technologies:
      "Python · Django · Django REST Framework · Microservices · RabbitMQ · Linux · Shell Scripting",
  },
  {
    period: "May 2015 — Jun 2020",
    company: "CustomFurnish / Hinshitsu Manufacturing",
    role: "Software Developer",
    domain: "E-commerce & Internal Applications",
    description:
      "Developed e-commerce platforms, internal business applications, dashboards, APIs, authentication systems, and customer-facing web applications.",
    technologies:
      "Python · Django · Angular · TypeScript · MySQL · MongoDB · AWS · Linux",
  },
];

const projects = [
  {
    title: "Chaos Engineering & Resiliency",
    category: "Professional",
    description:
      "Engineering solutions for testing application resilience across private, public, and hybrid cloud environments.",
    technologies:
      "Python · Django · REST APIs · Microservices · Cloud · Linux · Shell Scripting · Observability",
  },
  {
    title: "AI-Assisted Code Review",
    category: "AI / GenAI",
    description:
      "An exploration of AI-powered developer tooling combining LLMs, code analysis, security scanning, RAG, and automated review workflows.",
    technologies:
      "Python · LLMs · RAG · LangChain · Code Analysis · AI",
  },
  {
    title: "Telecom BSS Platform",
    category: "Professional",
    description:
      "Development and integration of scalable telecom Business Support Systems with third-party platforms.",
    technologies: "Python · Django · REST APIs · Microservices · RabbitMQ",
  },
  {
    title: "Operations Management Platform",
    category: "E-commerce / Internal",
    description:
      "Internal web and mobile platform supporting project management, roll calls, reminders, referrals, authentication, and role-based access.",
    technologies:
      "Python · Django · Angular · TypeScript · MySQL · MongoDB · AWS · Ionic",
  },
  {
    title: "Custom Sofa E-commerce",
    category: "E-commerce",
    description:
      "E-commerce platform allowing customers to configure customized sofas based on their requirements.",
    technologies:
      "Python · Django · Angular · TypeScript · MongoDB · AWS · Payment Gateways",
  },
  {
    title: "Product Marketplace",
    category: "E-commerce",
    description:
      "Online platform supporting customizable products, shopping cart, authentication, payments, discounts, orders, invoices, and dashboards.",
    technologies: "Python · Django · jQuery · MongoDB · Linux · AWS",
  },
];

type Skill = {
  name: string;
  icon: IconType;
  color?: string;
};

type SkillGroup = {
  title: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#C7A600" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: LuFileCode, color: "#1572B6" },
      { name: "Shell Scripting", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "Django REST Framework", icon: SiDjango, color: "#A30000" },
      { name: "Flask", icon: SiFlask, color: "#000000" },
      { name: "REST APIs", icon: LuWebhook, color: "#2563EB" },
      { name: "Microservices", icon: LuBoxes, color: "#7C3AED" },
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#C7A600" },
      { name: "Ionic", icon: SiIonic, color: "#3880FF" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS", icon: LuCloud, color: "#FF9900" },
      { name: "EC2", icon: LuServer, color: "#FF9900" },
      { name: "S3", icon: LuCloud, color: "#569A31" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
      { name: "Cloud Platforms", icon: LuCloud, color: "#0EA5E9" },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Database Design", icon: LuDatabase, color: "#0891B2" },
      { name: "Data Modeling", icon: LuNetwork, color: "#10B981" },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", icon: LuBrain, color: "#7C3AED" },
      { name: "Deep Learning", icon: LuBrain, color: "#9333EA" },
      { name: "LLMs", icon: LuSparkles, color: "#F59E0B" },
      { name: "Generative AI", icon: LuSparkles, color: "#EC4899" },
      { name: "RAG", icon: LuWorkflow, color: "#10B981" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      { name: "AI-assisted Development", icon: LuBot, color: "#6366F1" },
    ],
  },
  {
    title: "Reliability & Engineering",
    skills: [
      { name: "Chaos Engineering", icon: LuZap, color: "#EF4444" },
      { name: "Resiliency Engineering", icon: LuShield, color: "#0EA5E9" },
      { name: "Observability", icon: LuEye, color: "#8B5CF6" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Automation", icon: LuWorkflow, color: "#10B981" },
    ],
  },
  {
    title: "Development Practices",
    skills: [
      { name: "REST API Design", icon: LuWebhook, color: "#2563EB" },
      { name: "Unit Testing", icon: LuTestTube, color: "#DC2626" },
      { name: "Object-Oriented Programming", icon: LuBoxes, color: "#7C3AED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Agile Development", icon: LuRefreshCw, color: "#059669" },
      { name: "Code Review", icon: LuCode, color: "#374151" },
    ],
  },
];

/* ============================ PAGE ============================ */

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-stone-50 text-zinc-900">
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section id="home" className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Software Engineer · Cloud · AI
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl">
              Hi, I&apos;m <span className="text-zinc-500">Narendra Avula.</span>
            </h1>

            <h2 className="mt-6 text-2xl font-semibold leading-tight text-zinc-800 md:text-3xl">
              Senior Software Developer | AI &amp; Cloud Enthusiast
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Building reliable software systems and exploring the intersection of
              software engineering, cloud, and Generative AI.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="rounded-full bg-zinc-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                View My Work
              </a>

              <a
                href="/resume.pdf"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100"
              >
                Download Resume
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                About Me
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl">
                Engineering with curiosity.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-zinc-600">
              <p>
                I&apos;m a software engineer with 11+ years of experience building
                backend services, web applications, APIs, cloud-based solutions,
                and engineering platforms.
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
              {skillsOverview.map((skill) => (
                <div
                  key={skill.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
                >
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
              ))}
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
            {experiences.map((experience) => (
              <article
                key={experience.company}
                className="relative border-l-2 border-zinc-200 pl-8"
              >
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-stone-50 bg-blue-600" />

                <p className="text-sm font-semibold text-blue-600">
                  {experience.period}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                  {experience.role}
                </h3>

                <h4 className="mt-1 text-lg font-medium text-zinc-700">
                  {experience.company}
                </h4>

                <p className="mt-5 font-semibold text-zinc-900">
                  {experience.domain}
                </p>

                <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
                  {experience.description}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500">
                  {experience.technologies}
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
                  <span className="text-sm font-semibold text-blue-600">
                    0{index + 1}
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
          <div className="mt-16 max-w-5xl">
            {/* B.Tech */}
            <article className="border-l-2 border-blue-500 pl-8">
              <p className="text-sm font-semibold text-blue-600">Undergraduate</p>

              <h3 className="mt-3 text-2xl font-bold text-zinc-950">
                Bachelor of Technology — Computer Science & Engineering
              </h3>

              <p className="mt-2 text-lg font-medium text-zinc-700">
                Anil Neerukonda Institute of Technology & Sciences
              </p>

              <p className="mt-2 text-zinc-500">Affiliated to Andhra University</p>

              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Graduated with a CGPA of 7.5, building a foundation in computer
                science, programming, software development, databases, and
                engineering fundamentals.
              </p>
            </article>

            {/* M.Tech */}
            <article className="mt-16 border-l-2 border-zinc-200 pl-8">
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
            <article className="mt-16 border-l-2 border-zinc-200 pl-8">
              <p className="text-sm font-semibold text-blue-600">Certification</p>

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
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-zinc-950">{group.title}</h3>

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
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#EA43351A" }}
                >
                  <LuMail className="h-4 w-4" style={{ color: "#EA4335" }} aria-hidden="true" />
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
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#0A66C21A" }}
                >
                  <FaLinkedin className="h-4 w-4" style={{ color: "#0A66C2" }} aria-hidden="true" />
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
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#1817171A" }}
                >
                  <FaGithub className="h-4 w-4" style={{ color: "#181717" }} aria-hidden="true" />
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
              className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#2563EB1A" }}
                >
                  <LuFileText className="h-4 w-4" style={{ color: "#2563EB" }} aria-hidden="true" />
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