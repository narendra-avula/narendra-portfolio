import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const experiences = [
  {
    period: "Apr 2022 — Present",
    company: "JPMorgan Chase",
    role: "Software Engineer II",
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

export default function Experience() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Experience
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            9+ years of software engineering.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            A journey across e-commerce, telecom, cloud platforms,
            resiliency engineering, and AI-assisted developer tooling.
          </p>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">

          <div className="space-y-12">

            {experiences.map((experience, index) => (
              <article
                key={experience.company}
                className="relative border-l-2 border-zinc-200 pl-8"
              >

                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-stone-50 bg-blue-600" />

                <p className="text-sm font-semibold text-blue-600">
                  {experience.period}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-950">
                  {experience.role}
                </h2>

                <h3 className="mt-1 text-lg font-medium text-zinc-700">
                  {experience.company}
                </h3>

                <p className="mt-5 font-semibold text-zinc-900">
                  {experience.domain}
                </p>

                <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
                  {experience.description}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500">
                  {experience.technologies}
                </p>

                {index !== experiences.length - 1 && (
                  <div className="mt-10" />
                )}

              </article>
            ))}

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}