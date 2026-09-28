import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    technologies:
      "Python · Django · REST APIs · Microservices · RabbitMQ",
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
    technologies:
      "Python · Django · jQuery · MongoDB · Linux · AWS",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">

      <Navbar />

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Projects
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
            Things I&apos;ve worked on.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            A collection of professional projects and personal
            explorations across software engineering, cloud,
            reliability, and AI.
          </p>

        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-6 md:grid-cols-2">

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

                <h2 className="mt-8 text-2xl font-bold text-zinc-950">
                  {project.title}
                </h2>

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

      <Footer />

    </main>
  );
}