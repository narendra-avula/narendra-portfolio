import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const skillGroups = [
  {
    title: "Programming",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Shell Scripting",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Django",
      "Django REST Framework",
      "Flask",
      "REST APIs",
      "Microservices",
      "RabbitMQ",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "Ionic",
      "Bootstrap",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "Linux",
      "Git",
      "Jenkins",
      "Cloud Platforms",
    ],
  },
  {
    title: "Data",
    skills: [
      "MySQL",
      "MongoDB",
      "SQLite",
      "Database Design",
      "Data Modeling",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "Generative AI",
      "RAG",
      "LangChain",
      "AI-assisted Development",
    ],
  },
  {
    title: "Reliability & Engineering",
    skills: [
      "Chaos Engineering",
      "Resiliency Engineering",
      "Observability",
      "Prometheus",
      "Grafana",
      "Automation",
    ],
  },
  {
    title: "Development Practices",
    skills: [
      "REST API Design",
      "Unit Testing",
      "Object-Oriented Programming",
      "Git",
      "Agile Development",
      "Code Review",
    ],
  },
];

export default function Skills() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Skills
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            Tools and technologies.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            Technologies I&apos;ve worked with throughout my career
            and areas I&apos;m currently exploring.
          </p>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-6 md:grid-cols-2">

            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm"
              >

                <h2 className="text-xl font-bold text-zinc-950">
                  {group.title}
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">

                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}