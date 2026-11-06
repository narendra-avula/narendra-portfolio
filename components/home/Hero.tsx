import { LuArrowRight, LuDownload, LuMail } from "react-icons/lu";
import { profile, yearsLabel } from "@/content/profile";
import { mtech } from "@/content/education";
import { ButtonLink, Container } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import CodeCard from "@/components/home/CodeCard";

const highlights = [
  profile.employer,
  profile.designation,
  `${yearsLabel} Years Experience`,
  "AWS Certified Developer",
  `${mtech.institution} M.Tech AI & ML`,
];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Subtle grid + single soft glow (static) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />
      </div>

      <Container className="grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:py-32">
        <div>
          <FadeIn>
            <p className="flex items-start gap-2 text-xs font-medium text-muted sm:inline-flex sm:items-center sm:rounded-full sm:border sm:border-line sm:bg-surface sm:px-3 sm:py-1">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:mt-0" aria-hidden="true" />
              <span>{profile.positioning.split(" | ").join(" · ")}</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl font-semibold leading-[1.08] text-fg sm:text-5xl xl:text-6xl">
              {profile.hero.headline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{profile.hero.summary}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ul aria-label="Highlights" className="mt-7 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-fg"
                >
                  {h}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={profile.resume.href} download={profile.resume.filename}>
              <LuDownload className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </ButtonLink>
            <ButtonLink href="#projects" variant="secondary">
              Explore My Work
              <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              <LuMail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </ButtonLink>
          </FadeIn>
        </div>

        <div className="hidden lg:block">
          <CodeCard />
        </div>
      </Container>
    </section>
  );
}
