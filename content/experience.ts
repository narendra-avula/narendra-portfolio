export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  domain: string;
  summary: string;
  technologies: string[];
  current: boolean;
};

export const experiences: Experience[] = [
  {
    company: "JPMorgan Chase",
    role: "Software Engineer III",
    start: "Apr 2022",
    end: "Present",
    domain: "Resiliency Engineering / Chaos Engineering",
    summary:
      "Working on engineering solutions for testing and improving application resilience across private, public, and hybrid cloud environments.",
    technologies: ["Python", "Django", "REST APIs", "Microservices", "Linux", "Shell Scripting", "Cloud", "Observability"],
    current: true,
  },
  {
    company: "Qvantel Software Solutions",
    role: "Senior Software Developer",
    start: "Jul 2020",
    end: "Mar 2022",
    domain: "Telecom BSS",
    summary:
      "Worked on highly scalable telecom Business Support Systems and integrations with third-party systems.",
    technologies: ["Python", "Django", "Django REST Framework", "Microservices", "RabbitMQ", "Linux", "Shell Scripting"],
    current: false,
  },
  {
    company: "CustomFurnish / Hinshitsu Manufacturing",
    role: "Software Developer",
    start: "May 2015",
    end: "Jun 2020",
    domain: "E-commerce & Internal Applications",
    summary:
      "Developed e-commerce platforms, internal business applications, dashboards, APIs, authentication systems, and customer-facing web applications.",
    technologies: ["Python", "Django", "Angular", "TypeScript", "MySQL", "MongoDB", "AWS", "Linux"],
    current: false,
  },
];

/** Career stages for the Professional Summary, oldest first. */
export const careerStages = [
  {
    stage: "E-commerce & web",
    period: "2015 – 2020",
    text: "Customer-facing e-commerce platforms with product customization and payment gateways, plus CRM and internal tools, built with Django and Angular.",
  },
  {
    stage: "Telecom systems",
    period: "2020 – 2022",
    text: "Telecom BSS microservices with Django and RabbitMQ, integrating third-party systems into the platform.",
  },
  {
    stage: "Cloud platforms",
    period: "2022 →",
    text: "Engineering across private, public and hybrid cloud environments at JPMorgan Chase.",
  },
  {
    stage: "Resiliency engineering",
    period: "2022 →",
    text: "Chaos engineering solutions that test and improve application resilience, with automation and observability.",
  },
  {
    stage: "AI-assisted tooling",
    period: "Now",
    text: "LLMs, RAG and AI-assisted code review, alongside an M.Tech in AI & ML at BITS Pilani.",
  },
];
