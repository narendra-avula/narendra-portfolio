/**
 * Custom analytics events (Vercel Analytics). Names are fixed here so the
 * dashboard stays consistent. Page views are tracked automatically.
 */
export const analyticsEvents = {
  resumeDownload: "Resume Download",
  githubClick: "GitHub Click",
  linkedinClick: "LinkedIn Click",
  projectVisit: "Project Visit",
  recruiterVisit: "Recruiter Visit",
  contactSubmit: "Contact Submit",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];

/**
 * Event for a clicked link, from its href alone, so links anywhere on the
 * site are tracked without per-link wiring. Returns null for other links.
 */
export function eventForLink(href: string): AnalyticsEvent | null {
  let url: URL;
  try {
    url = new URL(href, "https://site.invalid");
  } catch {
    return null;
  }
  if (url.pathname.toLowerCase().endsWith("/resume.pdf")) return analyticsEvents.resumeDownload;
  const host = url.hostname.replace(/^www\./, "");
  if (host === "github.com") return analyticsEvents.githubClick;
  if (host === "linkedin.com") return analyticsEvents.linkedinClick;
  return null;
}
