const skills = [
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

const projects = [
  {
    number: "01",
    title: "Chaos Engineering & Resiliency",
    description:
      "Engineering solutions for testing application resilience across private, public, and hybrid cloud environments.",
    technologies:
      "Python · Django · Microservices · Cloud · Observability",
  },
  {
    number: "02",
    title: "AI-Assisted Code Review",
    description:
      "Exploring AI-powered developer tooling using LLMs, RAG, code analysis, security scanning, and automated review workflows.",
    technologies:
      "Python · LLMs · RAG · LangChain · Code Analysis",
  },
  {
    number: "03",
    title: "Telecom BSS",
    description:
      "Developed scalable telecom business support systems and integrations with third-party platforms.",
    technologies:
      "Python · Django · REST APIs · Microservices · RabbitMQ",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      {/* ==================== NAVBAR ==================== */}

      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo / Name */}
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-zinc-950"
          >
            Narendra Avula
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 text-sm text-zinc-600 md:flex">
            <a
              href="/about"
              className="transition hover:text-zinc-950"
            >
              About
            </a>

            <a
              href="/experience"
              className="transition hover:text-zinc-950"
            >
              Experience
            </a>

            <a
              href="/projects"
              className="transition hover:text-zinc-950"
            >
              Projects
            </a>

            <a
              href="/education"
              className="transition hover:text-zinc-950"
            >
              Education
            </a>

            <a
              href="/skills"
              className="transition hover:text-zinc-950"
            >
              Skills
            </a>

            <a
              href="/contact"
              className="transition hover:text-zinc-950"
            >
              Contact
            </a>
          </div>

          {/* Contact Button */}
          <a
            href="/contact"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">

          <div className="max-w-4xl">

            {/* Small Label */}
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Software Engineer · Cloud · AI
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-zinc-500">
                Narendra Avula.
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="mt-6 text-2xl font-semibold leading-tight text-zinc-800 md:text-3xl">
              Senior Software Developer | AI &amp; Cloud Enthusiast
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Building reliable software systems and exploring the
              intersection of software engineering, cloud, and
              Generative AI.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="/projects"
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

      {/* ==================== ABOUT INTRO ==================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">

            {/* Left */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                About
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl">
                Engineering with curiosity.
              </h2>
            </div>

            {/* Right */}
            <div className="space-y-5 text-lg leading-8 text-zinc-600">

              <p>
                I&apos;m a software engineer with 9+ years of
                experience building backend services, web
                applications, APIs, cloud-based solutions, and
                engineering platforms.
              </p>

              <p>
                My career has evolved from web and e-commerce
                development to telecom systems, cloud platforms,
                resiliency engineering, and AI-assisted developer
                tools.
              </p>

              <a
                href="/about"
                className="inline-block font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-8 transition hover:decoration-zinc-950"
              >
                More About Me →
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERTISE ==================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">

          {/* Section Heading */}
          <div className="mb-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Expertise
            </p>

            <h2 className="mt-3 text-3xl font-bold text-zinc-950 md:text-4xl">
              What I work with
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-600">
              A combination of software engineering, cloud
              technologies, reliability engineering, and emerging
              AI technologies.
            </p>

          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
              >

                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                  {skill.title === "Software Engineering"
                    ? "01"
                    : skill.title === "Cloud & Reliability"
                    ? "02"
                    : "03"}
                </div>

                <h3 className="text-xl font-semibold text-zinc-950">
                  {skill.title}
                </h3>

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
      </section>

      {/* ==================== FEATURED PROJECTS ==================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">

          {/* Heading */}
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Selected Work
              </p>

              <h2 className="mt-3 text-3xl font-bold text-zinc-950 md:text-4xl">
                Featured projects
              </h2>

            </div>

            <a
              href="/projects"
              className="font-semibold text-zinc-700 transition hover:text-zinc-950"
            >
              View all projects →
            </a>

          </div>

          {/* Project Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
              >

                <p className="text-sm font-semibold text-blue-600">
                  {project.number}
                </p>

                <h3 className="mt-8 text-xl font-semibold leading-7 text-zinc-950">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">
                  {project.description}
                </p>

                <p className="mt-6 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-500">
                  {project.technologies}
                </p>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE SNAPSHOT ==================== */}

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Experience
              </p>

              <h2 className="mt-3 text-3xl font-bold text-zinc-950 md:text-4xl">
                9+ years of building software.
              </h2>

            </div>

            <div className="space-y-8">

              {/* JPMorgan */}
              <div className="border-l-2 border-blue-500 pl-6">

                <p className="text-sm font-medium text-zinc-500">
                  Apr 2022 — Present
                </p>

                <h3 className="mt-2 text-xl font-semibold text-zinc-950">
                  Software Engineer II
                </h3>

                <p className="mt-1 font-medium text-zinc-700">
                  JPMorgan Chase
                </p>

                <p className="mt-3 leading-7 text-zinc-600">
                  Working on resiliency engineering, chaos
                  engineering, cloud environments, microservices,
                  and engineering platforms.
                </p>

              </div>

              {/* Qvantel */}
              <div className="border-l-2 border-zinc-200 pl-6">

                <p className="text-sm font-medium text-zinc-500">
                  Jul 2020 — Mar 2022
                </p>

                <h3 className="mt-2 text-xl font-semibold text-zinc-950">
                  Senior Software Developer
                </h3>

                <p className="mt-1 font-medium text-zinc-700">
                  Qvantel Software Solutions
                </p>

                <p className="mt-3 leading-7 text-zinc-600">
                  Developed telecom BSS systems, REST APIs,
                  microservices, integrations, and business
                  features.
                </p>

              </div>

              {/* CustomFurnish */}
              <div className="border-l-2 border-zinc-200 pl-6">

                <p className="text-sm font-medium text-zinc-500">
                  May 2015 — Jun 2020
                </p>

                <h3 className="mt-2 text-xl font-semibold text-zinc-950">
                  Software Developer
                </h3>

                <p className="mt-1 font-medium text-zinc-700">
                  CustomFurnish
                </p>

                <p className="mt-3 leading-7 text-zinc-600">
                  Built e-commerce applications, internal
                  platforms, APIs, dashboards, and web
                  applications using Python and Django.
                </p>

              </div>

              <a
                href="/experience"
                className="inline-block font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-8 hover:decoration-zinc-950"
              >
                View full experience →
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}

      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:p-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Get in touch
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-zinc-950 md:text-5xl">
              Let&apos;s build something interesting.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Interested in software engineering, cloud,
              AI/GenAI, or building something interesting?
            </p>

            <a
              href="/contact"
              className="mt-8 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Get in Touch →
            </a>

          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="border-t border-zinc-200 bg-white">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Narendra Avula
          </p>

          <p>
            Software Engineering · Cloud · AI/GenAI
          </p>

        </div>

      </footer>

    </main>
  );
}