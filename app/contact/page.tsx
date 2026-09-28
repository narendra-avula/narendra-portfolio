import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Contact
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            Let&apos;s connect.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Interested in software engineering, cloud, AI/GenAI,
            developer tooling, or simply want to connect?
            Feel free to reach out.
          </p>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Email */}
            <a
              href="mailto:narendraavula2@gmail.com"
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Email
              </p>

              <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                narendraavula2@gmail.com
              </h2>

              <p className="mt-3 text-zinc-600">
                Send me an email →
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/narendraavula/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                LinkedIn
              </p>

              <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                Connect on LinkedIn
              </h2>

              <p className="mt-3 text-zinc-600">
                Professional profile →
              </p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/narendra-avula/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                GitHub
              </p>

              <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                View my code
              </h2>

              <p className="mt-3 text-zinc-600">
                Projects and experiments →
              </p>
            </a>

            {/* Resume */}
            <a
              href="/resume.pdf"
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Resume
              </p>

              <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                Download Resume
              </h2>

              <p className="mt-3 text-zinc-600">
                View my professional experience →
              </p>
            </a>

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}