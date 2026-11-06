import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { profile, yearsLabel } from "@/content/profile";
import { experiences } from "@/content/experience";
import { education } from "@/content/education";
import { skillGroups } from "@/content/skills";
import { featuredProjects } from "@/content/projects";
import { impact } from "@/content/extras";
import { SITE_URL } from "@/lib/site";
import { ButtonLink, Container, focusRing } from "@/components/ui";
import PrintButton from "@/components/recruiter/PrintButton";

const description = `One-page profile of ${profile.name}: ${profile.designation} at ${profile.employer}, ${yearsLabel} years of experience. Printable.`;

export const metadata: Metadata = {
  title: "Recruiter profile",
  description,
  alternates: { canonical: "/recruiter" },
  openGraph: { url: "/recruiter", title: `${profile.name}: recruiter profile`, description },
};

/** Shows the URL without the protocol, so printed copies stay useful */
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Block({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <section aria-labelledby={id} className="border-t border-line py-7 print:py-3">
      <h2 id={id} className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {title}
      </h2>
      <div className="mt-4 print:mt-2">{children}</div>
    </section>
  );
}

export default function RecruiterPage() {
  const contacts = [
    { label: "Email", href: `mailto:${profile.email}`, text: profile.email },
    { label: "LinkedIn", href: profile.links.linkedin, text: bare(profile.links.linkedin) },
    { label: "GitHub", href: profile.links.github, text: bare(profile.links.github) },
    { label: "Portfolio", href: SITE_URL, text: bare(SITE_URL) },
  ];

  return (
    <article className="py-12 md:py-16 print:py-0" aria-labelledby="recruiter-title">
      <Container className="max-w-4xl">
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <PrintButton />
          <ButtonLink href={profile.resume.href} download={profile.resume.filename} variant="secondary">
            <LuDownload className="h-4 w-4" aria-hidden="true" />
            Download resume
          </ButtonLink>
          <Link href="/" className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted hover:text-fg ${focusRing}`}>
            Full portfolio
          </Link>
        </div>

        <header className="pb-7 print:pb-3">
          <h1 id="recruiter-title" className="text-4xl font-semibold text-fg print:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted print:mt-1 print:text-base">{profile.positioning}</p>
          <p className="mt-1 text-fg">
            {profile.designation}, {profile.employer} · {yearsLabel} years · {profile.location}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm print:mt-2" aria-label="Contact">
            {contacts.map((c) => (
              <li key={c.label}>
                <span className="text-subtle">{c.label}: </span>
                <a
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`rounded text-accent hover:underline print:text-fg ${focusRing}`}
                >
                  {c.text}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Block title="Summary">
          <p className="leading-7 text-fg">{profile.hero.summary}</p>
          <p className="mt-3 text-[15px] leading-7 text-muted">
            <span className="text-subtle">Open to: </span>
            {profile.openTo.roles.join(" · ")}. {profile.openTo.workMode}.
          </p>
        </Block>

        <Block title="Experience">
          <ol className="space-y-6 print:space-y-3">
            {experiences.map((e) => (
              <li key={e.company} className="print:break-inside-avoid">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline print:flex-row print:items-baseline">
                  <h3 className="font-semibold text-fg">
                    {e.role}, {e.company}
                  </h3>
                  <p className="shrink-0 text-sm text-subtle">
                    {e.start} – {e.end}
                  </p>
                </div>
                <p className="text-sm text-muted">{e.domain}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-6 text-fg marker:text-subtle">
                  {e.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Selected highlights">
          <ul className="list-disc space-y-1 pl-5 text-[15px] leading-6 text-fg marker:text-subtle">
            {impact.map((i) => (
              <li key={i.title}>
                <span className="font-medium">{i.title}</span> ({i.context}): {i.text}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Skills">
          <dl className="grid gap-x-8 gap-y-2 text-[15px] leading-6 sm:grid-cols-[11rem_1fr] print:grid-cols-[10rem_1fr]">
            {skillGroups.map((g) => (
              <div key={g.title} className="contents">
                <dt className="text-subtle">{g.title}</dt>
                <dd className="text-fg">{g.skills.map((s) => s.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Projects">
          <ul className="space-y-3 text-[15px] leading-6">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <span className="font-medium text-fg">{p.title}</span>
                <span className="text-subtle"> · {p.category} · {p.kind}</span>
                <p className="text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Education and certification">
          <ul className="space-y-2 text-[15px] leading-6">
            {education.map((e) => (
              <li key={e.title}>
                <span className="font-medium text-fg">{e.title}</span>
                <span className="text-muted">
                  , {e.institution}
                  {e.status && ` (${e.status})`}
                </span>
                {e.verifyUrl && (
                  <>
                    {" · "}
                    <a href={e.verifyUrl} target="_blank" rel="noopener noreferrer" className={`rounded text-accent hover:underline print:text-fg ${focusRing}`}>
                      Verify on Credly
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Block>
      </Container>
    </article>
  );
}
