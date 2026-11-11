import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuArrowUpRight, LuFileText, LuMail } from "react-icons/lu";
import { profile } from "@/content/profile";
import { Card, Section, SectionHeader, focusRing } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { isContactFormEnabled } from "@/lib/email";
import ContactForm from "@/components/home/ContactForm";

/**
 * Contact channels, plus a form when an email provider is configured
 * (decision D4). Without RESEND_API_KEY the form is not rendered at all, so
 * a visitor can never submit a message that goes nowhere.
 */
export default function Contact() {
  const formEnabled = isContactFormEnabled();
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

      <div className={formEnabled ? "mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start" : "mt-12"}>
      <Stagger className={formEnabled ? "grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
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
        {formEnabled && (
          <Reveal>
            <Card className="p-6 md:p-8">
              <ContactForm email={profile.email} />
            </Card>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
