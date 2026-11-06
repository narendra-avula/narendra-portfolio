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
  /** Case study pages arrive in Phase 4 */
  caseStudyReady: boolean;
};

export const projects: Project[] = [
  {
    slug: "prepforge",
    title: "PrepForge",
    category: "AI Career Intelligence Platform",
    kind: "Personal",
    summary:
      "An AI-powered career intelligence and interview preparation platform: resume and job description analysis, skill gap identification, interview preparation and job discovery, built around LLM integrations.",
    technologies: [],
    focusAreas: ["Resume & JD analysis", "Skill gaps", "Interview prep", "Job discovery", "LLM integrations"],
    featured: true,
    visual: "career",
    caseStudyReady: false,
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
    caseStudyReady: false,
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
    caseStudyReady: false,
  },
  {
    slug: "prepforge-academic-hub",
    title: "PrepForge Academic Hub",
    category: "AI Learning Platform",
    kind: "Personal",
    summary:
      "An AI-powered personal learning and academic knowledge platform for organizing course content, learning workflows and assessments.",
    technologies: [],
    focusAreas: ["Content organization", "Learning workflows", "AI-assisted learning", "Assessments"],
    featured: true,
    visual: "learning",
    caseStudyReady: false,
  },
  {
    slug: "telecom-bss-platform",
    title: "Telecom BSS Platform",
    category: "Professional",
    kind: "Professional",
    summary:
      "Development and integration of scalable telecom Business Support Systems with third-party platforms.",
    technologies: ["Python", "Django", "REST APIs", "Microservices", "RabbitMQ"],
    focusAreas: [],
    featured: false,
    caseStudyReady: false,
  },
  {
    slug: "operations-management-platform",
    title: "Operations Management Platform",
    category: "E-commerce / Internal",
    kind: "Professional",
    summary:
      "Internal web and mobile platform supporting project management, roll calls, reminders, referrals, authentication, and role-based access.",
    technologies: ["Python", "Django", "Angular", "TypeScript", "MySQL", "MongoDB", "AWS", "Ionic"],
    focusAreas: [],
    featured: false,
    caseStudyReady: false,
  },
  {
    slug: "custom-sofa-ecommerce",
    title: "Custom Sofa E-commerce",
    category: "E-commerce",
    kind: "Professional",
    summary:
      "E-commerce platform allowing customers to configure customized sofas based on their requirements.",
    technologies: ["Python", "Django", "Angular", "TypeScript", "MongoDB", "AWS", "Payment Gateways"],
    focusAreas: [],
    featured: false,
    caseStudyReady: false,
  },
  {
    slug: "product-marketplace",
    title: "Product Marketplace",
    category: "E-commerce",
    kind: "Professional",
    summary:
      "Online platform supporting customizable products, shopping cart, authentication, payments, discounts, orders, invoices, and dashboards.",
    technologies: ["Python", "Django", "jQuery", "MongoDB", "Linux", "AWS"],
    focusAreas: [],
    featured: false,
    caseStudyReady: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
