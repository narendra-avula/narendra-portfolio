import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import Link from "next/link";
import { navItems } from "@/lib/site";
import { profile } from "@/content/profile";
import { focusRing } from "@/components/ui";

export default function Footer() {
  const social = [
    { label: "LinkedIn", href: profile.links.linkedin, Icon: FaLinkedin },
    { label: "GitHub", href: profile.links.github, Icon: FaGithub },
  ];

  return (
    <footer className="print:hidden border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-fg">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{profile.positioning}</p>
          <a href={`mailto:${profile.email}`} className={`mt-4 inline-flex items-center gap-2 rounded text-sm text-muted hover:text-fg ${focusRing}`}>
            <LuMail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems
              .filter((i) => i.enabled)
              .map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className={`rounded text-muted hover:text-fg ${focusRing}`}>
                    {i.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded text-muted hover:text-fg ${focusRing}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/recruiter" className={`rounded text-muted hover:text-fg ${focusRing}`}>
                One-page profile
              </Link>
            </li>
            <li>
              <a href={profile.resume.href} download={profile.resume.filename} className={`rounded text-muted hover:text-fg ${focusRing}`}>
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-subtle sm:px-6">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
