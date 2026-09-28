import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      {/* Header */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            About Me
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            Software engineer building reliable systems and exploring AI.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            I&apos;m Narendra Avula, a software engineer with 11+ years
            of experience building backend services, web applications,
            APIs, cloud solutions, and engineering platforms.
          </p>

        </div>
      </section>

      {/* Story */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                My Journey
              </p>

              <h2 className="mt-3 text-3xl font-bold text-zinc-950">
                From web development to cloud and AI.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-600">

              <p>
                I started my career working on web applications and
                e-commerce platforms using Python and Django.
              </p>

              <p>
                Over the years, my work expanded into telecom business
                support systems, REST APIs, microservices, database
                systems, cloud platforms, and distributed applications.
              </p>

              <p>
                At JPMorgan Chase, my work has moved further into
                resiliency engineering, chaos engineering, cloud
                environments, automation, and observability.
              </p>

              <p>
                More recently, I have been exploring machine learning,
                deep learning, large language models, Generative AI,
                RAG, and AI-assisted developer tooling.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Focus */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Current Focus
          </p>

          <h2 className="mt-3 text-3xl font-bold text-zinc-950">
            What I&apos;m interested in
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-zinc-200 p-7">
              <h3 className="text-xl font-semibold text-zinc-950">
                Software Engineering
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Designing maintainable backend systems, APIs,
                microservices, and developer platforms.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-7">
              <h3 className="text-xl font-semibold text-zinc-950">
                Cloud & Reliability
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Building resilient systems and learning more about
                cloud architecture, automation, observability, and
                distributed systems.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-7">
              <h3 className="text-xl font-semibold text-zinc-950">
                AI & GenAI
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Exploring LLM applications, RAG pipelines,
                AI-assisted development, and practical machine learning.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Personal */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Beyond Work
            </p>

            <h2 className="mt-3 text-3xl font-bold text-zinc-950">
              Always learning.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              I enjoy learning new technologies, experimenting with
              developer tools, understanding how systems work, and
              turning ideas into working software.
            </p>

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}