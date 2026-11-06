import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuArrowUpRight, LuFileText, LuMail } from "react-icons/lu";
import { profile } from "@/content/profile";
import { Card, Section, SectionHeader, focusRing } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

/**
 * Contact channels. The contact form arrives in Phase 6 with a real email
 * provider (decision D4); no form is shown until submissions are delivered.
 */
export default function Contact() {
  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: LuMail,
      external: false,
    },
    {
      label: "LinkedIn",
      value: "in/narendraavula",
      href: profile.links.linkedin,
      Icon: FaLinkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: `@${profile.githubUsername}`,
      href: profile.links.github,
      Icon: FaGithub,
      external: true,
    },
    {
      label: "Resume",
      value: "Download PDF",
      href: profile.resume.href,
      Icon: LuFileText,
      external: false,
      download: profile.resume.filename,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's talk."
        lead="Open to conversations about senior backend, platform, reliability and AI engineering roles."
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map(({ label, value, href, Icon, external, download }) => (
          <StaggerItem key={label}>
            <Card interactive className="h-full">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(download ? { download } : {})}
                className={`group flex h-full flex-col rounded-xl p-5 ${focusRing}`}
              >
                <span className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <LuArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-6 text-sm text-subtle">{label}</span>
                <span className="mt-0.5 break-all font-medium text-fg">{value}</span>
              </a>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
