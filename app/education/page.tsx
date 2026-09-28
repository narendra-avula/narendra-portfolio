import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Education() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Education
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            Learning never stops.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            My academic background and ongoing learning across
            software engineering, cloud, machine learning, and AI.
          </p>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">

          {/* B.Tech */}
          <article className="border-l-2 border-blue-500 pl-8">

            <p className="text-sm font-semibold text-blue-600">
              Undergraduate
            </p>

            <h2 className="mt-3 text-2xl font-bold text-zinc-950">
              Bachelor of Technology — Computer Science & Engineering
            </h2>

            <p className="mt-2 text-lg font-medium text-zinc-700">
              Anil Neerukonda Institute of Technology & Sciences
            </p>

            <p className="mt-2 text-zinc-500">
              Affiliated to Andhra University
            </p>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Graduated with a CGPA of 7.5, building a foundation in
              computer science, programming, software development,
              databases, and engineering fundamentals.
            </p>

          </article>

          {/* M.Tech */}
          <article className="mt-16 border-l-2 border-zinc-200 pl-8">

            <p className="text-sm font-semibold text-blue-600">
              Postgraduate / Professional Education
            </p>

            <h2 className="mt-3 text-2xl font-bold text-zinc-950">
              M.Tech — Artificial Intelligence & Machine Learning
            </h2>

            <p className="mt-2 text-lg font-medium text-zinc-700">
              BITS Pilani — Work Integrated Learning Programme
            </p>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Pursuing advanced studies in mathematical foundations
              for machine learning, statistical methods, machine
              learning, deep neural networks, and artificial
              intelligence.
            </p>

          </article>

          {/* AWS */}
          <article className="mt-16 border-l-2 border-zinc-200 pl-8">

            <p className="text-sm font-semibold text-blue-600">
              Certification
            </p>

            <h2 className="mt-3 text-2xl font-bold text-zinc-950">
              AWS Certified Developer — Associate
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Certification focused on developing, deploying, and
              maintaining applications on AWS.
            </p>

          </article>

        </div>
      </section>

      <Footer />

    </main>
  );
}