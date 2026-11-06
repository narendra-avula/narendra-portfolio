import { caseStudies } from "@/content/case-studies";

export type ProjectArea = "Backend" | "Cloud" | "AI / GenAI";

export type ProjectVisual = "career" | "review" | "resilience" | "learning";

export type Project = {
  slug: string;
  title: string;
  category: string;
  kind: "Professional" | "Personal";
  summary: string;
  /** Known technologies only. Empty means "not yet documented". */
  technologies: string[];
  /** Topics the project covers, from the owner's brief */
  focusAreas: string[];
  featured: boolean;
  visual?: ProjectVisual;
  /** Technical areas used by the catalogue filter (kind covers Professional / Personal) */
  areas: ProjectArea[];
  /** Employer the project was built at (must match an experience company) */
  company?: string;
  client?: string;
  period?: string;
  /** Verified contributions, from the resume. No invented metrics. */
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "prepforge",
    title: "PrepForge",
    category: "AI Career Intelligence Platform",
    kind: "Personal",
    summary:
      "A career intelligence and interview preparation platform: resume and job description analysis, per-job skill gaps, practice, mock interviews and job discovery, with a provider-agnostic LLM gateway.",
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "LLM gateway"],
    focusAreas: ["Resume & JD analysis", "Skill gaps", "Interview prep", "Job discovery", "LLM integrations"],
    featured: true,
    visual: "career",
    areas: ["AI / GenAI", "Backend"],
  },
  {
    slug: "checkmate",
    title: "CheckMate",
    category: "AI-Assisted Code Review Platform",
    kind: "Personal",
    summary:
      "AI-powered developer tooling that combines LLMs, static code analysis, security scanning and RAG into automated code review workflows.",
    technologies: ["Python", "LLMs", "RAG", "LangChain", "Code Analysis"],
    focusAreas: ["Automated review", "Static analysis", "Security scanning", "RAG"],
    featured: true,
    visual: "review",
    areas: ["AI / GenAI"],
  },
  {
    slug: "enterprise-resiliency-engineering",
    title: "Enterprise Resiliency Engineering",
    category: "Chaos & Resiliency Engineering",
    kind: "Professional",
    summary:
      "Engineering solutions for testing application resilience across private, public, and hybrid cloud environments.",
    technologies: ["Python", "Django", "REST APIs", "Microservices", "Cloud", "Linux", "Shell Scripting", "Observability"],
    focusAreas: ["Chaos engineering", "Microservices", "Cloud environments", "Observability"],
    featured: true,
    visual: "resilience",
    areas: ["Cloud", "Backend"],
    company: "JPMorgan Chase",
    client: "Internal",
    period: "2022 – Present",
  },
  {
    slug: "prepforge-academic-hub",
    title: "PrepForge Academic Hub",
    category: "AI Learning Platform",
    kind: "Personal",
    summary:
      "A personal AI learning environment: curriculum and study plans, a document library processed into a personal knowledge base, and a cited AI tutor in development.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Celery"],
    focusAreas: ["Content organization", "Learning workflows", "AI-assisted learning", "Assessments"],
    featured: true,
    visual: "learning",
    areas: ["AI / GenAI", "Backend"],
  },
  {
    slug: "telecom-bss-platform",
    title: "Digital BSS Platform",
    category: "Telecom BSS",
    kind: "Professional",
    summary:
      "Digital business support systems for telecom network providers, delivered for Ericsson (Veon programme) with customer-specific customizations.",
    technologies: ["Python", "Django", "Django REST Framework", "Microservices", "RabbitMQ", "Linux", "Shell Scripting"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "Qvantel Software Solutions",
    client: "Ericsson",
    period: "2020 – 2022",
    highlights: [
      "Developed five major features for the BSS platform.",
      "Worked on order channels, CRM, product catalog and message manager modules.",
      "Integrated third-party systems (Ericsson CS, 3PP, payments) into the Qvantel BSS stack.",
      "Built RESTful microservices with Django, using RabbitMQ as the message queue.",
    ],
  },
  {
    slug: "operations-management-platform",
    title: "Operations Management Platform",
    category: "Internal operations app",
    kind: "Professional",
    summary:
      "Web and mobile app for project management, roll calls, reminders and referrals, built with Ionic and Django.",
    technologies: ["Python", "Django", "Angular", "TypeScript", "Ionic", "MySQL", "MongoDB", "AWS"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "CustomFurnish / Hinshitsu Manufacturing",
    client: "Medplus",
    period: "2019 – 2020",
    highlights: [
      "Designed database models for project management, roll call, reminders and referrals.",
      "Implemented JWT authentication with per-module roles and permissions.",
      "Built the web and mobile UI with Angular, TypeScript and Ionic; shipped the APK and web view.",
      "Turned end-user feedback into improvements with internal teams.",
    ],
  },
  {
    slug: "custom-sofa-ecommerce",
    title: "CustomSofa.in",
    category: "E-commerce",
    kind: "Professional",
    summary:
      "E-commerce site where customers configure sofas to their own height, softness, depth and seating requirements.",
    technologies: ["Python", "Django", "Angular", "TypeScript", "MongoDB", "AWS"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "CustomFurnish / Hinshitsu Manufacturing",
    period: "2019",
    highlights: [
      "Implemented the sofa customization models and customer login.",
      "Integrated EBS and Paytm payment gateways.",
    ],
  },
  {
    slug: "product-marketplace",
    title: "BatchTag.com",
    category: "E-commerce marketplace",
    kind: "Professional",
    summary:
      "Marketplace for furniture, decor and furnishing products with customizable options such as colour and fabric.",
    technologies: ["Python", "Django", "jQuery", "MongoDB", "Linux", "AWS"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "CustomFurnish / Hinshitsu Manufacturing",
    period: "2017 – 2019",
    highlights: [
      "Designed the product data schema.",
      "Implemented authentication with role- and permission-based views, cart and session management.",
      "Built payments through the EBS gateway and an in-house wallet, plus coupon-based discounts.",
      "Delivered order tracking, online invoices and order analytics dashboards.",
    ],
  },
  {
    slug: "crm",
    title: "Sales CRM",
    category: "Internal application",
    kind: "Professional",
    summary:
      "CRM that tracks every customer interaction: managers qualify and assign leads, salespeople update lead status.",
    technologies: ["Python", "Django", "jQuery", "MongoDB", "Linux", "AWS"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "CustomFurnish / Hinshitsu Manufacturing",
    period: "2016 – 2020",
    highlights: [
      "Designed the customer data schema with role-based access.",
      "Built lead listing, qualification and calendar views for managers and salespeople.",
      "Created daily and weekly dashboards and a cron job for daily email alerts.",
    ],
  },
  {
    slug: "customfurnish-storefront",
    title: "CustomFurnish.com",
    category: "Company website",
    kind: "Professional",
    summary: "Website for an interior solutions company serving homes and offices.",
    technologies: ["Python", "Django", "jQuery", "MySQL", "MongoDB", "AWS"],
    focusAreas: [],
    featured: false,
    areas: ["Backend"],
    company: "CustomFurnish / Hinshitsu Manufacturing",
    period: "2015 – 2016",
    highlights: [
      "Built SEO-focused static pages and responsive product listing pages.",
      "Created an admin dashboard for uploading product images and details.",
    ],
  },
];

export const hasCaseStudy = (slug: string) => slug in caseStudies;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectsAt = (company: string) => projects.filter((p) => p.company === company);
