/** Single source of truth for facts repeated across the site. */
export const profile = {
  name: "Narendra Avula",
  initials: "NA",
  positioning: "Senior Software Engineer | Cloud & Reliability | AI/GenAI",
  designation: "Software Engineer III",
  employer: "JPMorgan Chase",
  yearsExperience: 11,
  location: "Hyderabad, India",
  email: "narendraavula2@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/narendraavula/",
    github: "https://github.com/narendra-avula",
  },
  githubUsername: "narendra-avula",
  resume: { href: "/resume.pdf", filename: "Narendra_Avula_Resume.pdf" },

  hero: {
    headline: "Engineering reliable systems. Building intelligent products.",
    summary:
      "I'm Narendra Avula, a software engineer with 11+ years of experience building backend systems, cloud-based applications, resilient platforms and AI-powered developer tools.",
  },

  coreExpertise: ["Python", "Django", "REST APIs", "Microservices", "AWS"],
  focus: ["Cloud & reliability engineering", "AI / GenAI and developer tooling"],

  openTo: {
    roles: [
      "Senior Software Engineer",
      "AI / ML Engineer",
      "Platform / SRE / Reliability",
      "Backend / API Engineer",
    ],
    workMode: "Remote, hybrid or on-site",
  },
} as const;

export const yearsLabel = `${profile.yearsExperience}+`;
