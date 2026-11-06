import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import ProjectCatalogue from "@/components/projects/ProjectCatalogue";

const description =
  "Professional and personal software projects: AI career and learning platforms, resiliency engineering, telecom BSS and e-commerce systems.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Projects", description },
};

export default function ProjectsPage() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="projects-title">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Projects</Eyebrow>
          <h1 id="projects-title" className="mt-3 text-4xl font-semibold text-fg md:text-5xl">
            Systems I have built.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Personal products I design and build end to end, and professional work across resiliency engineering, telecom
            and e-commerce. Each case study separates what is implemented from what is experimental or planned.
          </p>
        </Reveal>
        <div className="mt-12">
          <ProjectCatalogue projects={projects} />
        </div>
      </Container>
    </section>
  );
}
