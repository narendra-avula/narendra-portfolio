import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { featuredProjects, otherProjects } from "@/content/projects";
import { Section, SectionHeader, buttonClass, focusRing } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import ProjectCard from "@/components/projects/ProjectCard";

export default function FeaturedProjects() {
  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Featured projects"
        title="Selected work across platforms and AI."
        lead="Professional systems and personal products. Case studies cover architecture, design decisions and trade-offs, and say what is built versus planned."
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((p) => (
          <StaggerItem key={p.slug}>
            <ProjectCard project={p} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-muted">
          Plus {otherProjects.length} professional projects, including work for Ericsson and Medplus, listed under{" "}
          <a href="#experience" className={`rounded font-medium text-accent hover:underline ${focusRing}`}>
            Experience
          </a>
          .
        </p>
        <Link href="/projects" className={buttonClass("secondary", "shrink-0")}>
          View all projects
          <LuArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
