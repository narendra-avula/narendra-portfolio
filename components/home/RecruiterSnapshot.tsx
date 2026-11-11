import { LuArrowRight, LuBadgeCheck, LuDownload, LuMapPin } from "react-icons/lu";
import { profile, yearsLabel } from "@/content/profile";
import { btech, certification, mtech } from "@/content/education";
import Link from "next/link";
import { ButtonLink, Card, buttonClass, Eyebrow, Section, focusRing } from "@/components/ui";
import { Reveal } from "@/components/motion";

/** 30-second summary for recruiters. Also hosts the "Open to" card (decision D5). */
export default function RecruiterSnapshot() {
  const facts: { term: string; value: React.ReactNode }[] = [
    { term: "Experience", value: `${yearsLabel} years in software engineering` },
    { term: "Current role", value: `${profile.designation}, ${profile.employer}` },
    { term: "Core expertise", value: profile.coreExpertise.join(" · ") },
    { term: "Focus", value: profile.focus.join(" · ") },
    {
      term: "Education",
      value: (
        <>
          {mtech.title.replace(" — ", " in ")}, {mtech.institution} ({mtech.status})
          <br />
          {btech.title.replace(" — ", " in ")}, ANITS
        </>
      ),
    },
    {
      term: "Certification",
      value: (
        <span className="inline-flex flex-wrap items-center gap-x-2">
          {certification.title}
          {certification.verifyUrl && (
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 rounded text-sm font-medium text-accent hover:underline ${focusRing}`}
            >
              <LuBadgeCheck className="h-4 w-4" aria-hidden="true" />
              Verify
            </a>
          )}
        </span>
      ),
    },
  ];

  return (
    <Section id="snapshot" label="Recruiter snapshot">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <Card className="h-full p-6 md:p-8">
            <Eyebrow>Recruiter snapshot</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold text-fg md:text-3xl">
              {profile.name} at a glance
            </h2>
            <dl className="mt-6 divide-y divide-line">
              {facts.map((f) => (
                <div key={f.term} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-subtle">{f.term}</dt>
                  <dd className="text-[15px] leading-7 text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/recruiter" className={buttonClass("secondary")}>
                View Full Profile
                <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <ButtonLink href={profile.resume.href} download={profile.resume.filename}>
                <LuDownload className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </ButtonLink>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full p-6 md:p-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Open to
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-fg">Roles I&apos;m interested in</h2>
            <ul className="mt-5 space-y-2">
              {profile.openTo.roles.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-[15px] text-fg">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-muted">
              <p className="flex items-center gap-2">
                <LuMapPin className="h-4 w-4" aria-hidden="true" />
                {profile.location}
              </p>
              <p>{profile.openTo.workMode}</p>
            </div>
            <ButtonLink href="#contact" variant="secondary" className="mt-6 w-full">
              Get in touch
            </ButtonLink>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
