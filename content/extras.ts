/** Recruiter-facing extras carried over from v1 (Now, testimonials, GitHub, impact, insights). */

export const now = {
  updated: "November 2026",
  items: [
    { label: "Working on", text: "Resiliency and chaos engineering at JPMorgan Chase." },
    { label: "Studying", text: "M.Tech in AI & ML at BITS Pilani: deep neural networks and statistical methods." },
    {
      label: "Building",
      text: "Credit Default Risk Analyzer: comparing ML classifiers on the UCI credit card dataset, with a Streamlit app.",
    },
    { label: "Exploring", text: "RAG pipelines and AI-assisted code review tooling." },
  ],
};

export type Testimonial = { quote: string; name: string; role: string; relationship?: string };
/** Section stays hidden while empty. */
export const testimonials: Testimonial[] = [];

export const featuredRepos = [
  {
    name: "credit-default-analyzer",
    description:
      "Predicts credit card default risk on the UCI dataset, compares multiple classifiers, and serves predictions through a Streamlit app.",
    language: "Jupyter Notebook",
    languageColor: "#DA5B0B",
  },
  {
    name: "narendra-portfolio",
    description: "This site: Next.js, TypeScript, Tailwind CSS and Motion.",
    language: "TypeScript",
    languageColor: "#3178C6",
  },
];

/**
 * Qualitative achievements only. The single number ("five major features")
 * comes from the resume; do not add metrics without a source.
 */
export const impact = [
  {
    title: "Application resilience",
    text: "Engineering chaos engineering solutions that test application resilience across private, public and hybrid cloud environments.",
    context: "JPMorgan Chase",
  },
  {
    title: "Telecom platform delivery",
    text: "Developed five major features for a telecom BSS platform and integrated third-party systems, including payments, through Django microservices and RabbitMQ.",
    context: "Qvantel",
  },
  {
    title: "E-commerce, end to end",
    text: "Built e-commerce platforms covering product customization, carts, payment gateway integrations, order tracking, invoicing and dashboards.",
    context: "CustomFurnish",
  },
  {
    title: "Internal tools & automation",
    text: "Built internal applications with role-based access and JWT authentication, CRM lead workflows, and scheduled email reporting.",
    context: "CustomFurnish",
  },
  {
    title: "AI developer tooling",
    text: "Exploring AI-assisted code review that combines LLMs, static analysis, security scanning and RAG.",
    context: "Personal work",
  },
];
