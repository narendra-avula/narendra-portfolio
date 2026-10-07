import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiGnubash,
  SiDjango,
  SiFlask,
  SiRabbitmq,
  SiAngular,
  SiReact,
  SiIonic,
  SiBootstrap,
  SiLinux,
  SiGit,
  SiJenkins,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiLangchain,
  SiPrometheus,
  SiGrafana,
} from "react-icons/si";
import {
  LuWebhook,
  LuBoxes,
  LuServer,
  LuDatabase,
  LuNetwork,
  LuBrain,
  LuSparkles,
  LuWorkflow,
  LuBot,
  LuZap,
  LuShield,
  LuEye,
  LuTestTube,
  LuCode,
  LuRefreshCw,
  LuFileCode,
  LuCloud,
} from "react-icons/lu";

export type Skill = {
  name: string;
  icon: IconType;
  color?: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillsOverview = [
  {
    title: "Software Engineering",
    icon: LuCode,
    iconColor: "#2563EB",
    iconBg: "#EFF6FF",
    description:
      "Building backend services, APIs, web applications, and developer platforms.",
    technologies:
      "Python · Django · REST APIs · TypeScript · Angular · React",
  },
  {
    title: "Cloud & Reliability",
    icon: LuCloud,
    iconColor: "#0891B2",
    iconBg: "#ECFEFF",
    description:
      "Designing reliable systems and working with cloud, automation, resiliency, and observability.",
    technologies:
      "AWS · Microservices · Automation · Chaos Engineering · Observability",
  },
  {
    title: "AI & GenAI",
    icon: LuBrain,
    iconColor: "#7C3AED",
    iconBg: "#F5F3FF",
    description:
      "Exploring practical applications of machine learning, LLMs, and Generative AI.",
    technologies:
      "ML · Deep Learning · LLMs · GenAI · RAG · LangChain",
  },
];

export const experiences = [
  {
    period: "Apr 2022 — Present",
    company: "JPMorgan Chase",
    role: "Software Engineer III",
    domain: "Resiliency Engineering / Chaos Engineering",
    description:
      "Working on engineering solutions for testing and improving application resilience across private, public, and hybrid cloud environments.",
    technologies:
      "Python · Django · REST APIs · Microservices · Linux · Shell Scripting · Cloud · Observability",
    current: true,
  },
  {
    period: "Jul 2020 — Mar 2022",
    company: "Qvantel Software Solutions",
    role: "Senior Software Developer",
    domain: "Telecom BSS",
    description:
      "Worked on highly scalable telecom Business Support Systems and integrations with third-party systems.",
    technologies:
      "Python · Django · Django REST Framework · Microservices · RabbitMQ · Linux · Shell Scripting",
    current: false,
  },
  {
    period: "May 2015 — Jun 2020",
    company: "CustomFurnish / Hinshitsu Manufacturing",
    role: "Software Developer",
    domain: "E-commerce & Internal Applications",
    description:
      "Developed e-commerce platforms, internal business applications, dashboards, APIs, authentication systems, and customer-facing web applications.",
    technologies:
      "Python · Django · Angular · TypeScript · MySQL · MongoDB · AWS · Linux",
    current: false,
  },
];

export const projects = [
  {
    title: "Chaos Engineering & Resiliency",
    category: "Professional",
    description:
      "Engineering solutions for testing application resilience across private, public, and hybrid cloud environments.",
    technologies:
      "Python · Django · REST APIs · Microservices · Cloud · Linux · Shell Scripting · Observability",
  },
  {
    title: "AI-Assisted Code Review",
    category: "AI / GenAI",
    description:
      "An exploration of AI-powered developer tooling combining LLMs, code analysis, security scanning, RAG, and automated review workflows.",
    technologies:
      "Python · LLMs · RAG · LangChain · Code Analysis · AI",
  },
  {
    title: "Telecom BSS Platform",
    category: "Professional",
    description:
      "Development and integration of scalable telecom Business Support Systems with third-party platforms.",
    technologies: "Python · Django · REST APIs · Microservices · RabbitMQ",
  },
  {
    title: "Operations Management Platform",
    category: "E-commerce / Internal",
    description:
      "Internal web and mobile platform supporting project management, roll calls, reminders, referrals, authentication, and role-based access.",
    technologies:
      "Python · Django · Angular · TypeScript · MySQL · MongoDB · AWS · Ionic",
  },
  {
    title: "Custom Sofa E-commerce",
    category: "E-commerce",
    description:
      "E-commerce platform allowing customers to configure customized sofas based on their requirements.",
    technologies:
      "Python · Django · Angular · TypeScript · MongoDB · AWS · Payment Gateways",
  },
  {
    title: "Product Marketplace",
    category: "E-commerce",
    description:
      "Online platform supporting customizable products, shopping cart, authentication, payments, discounts, orders, invoices, and dashboards.",
    technologies: "Python · Django · jQuery · MongoDB · Linux · AWS",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#C7A600" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: LuFileCode, color: "#1572B6" },
      { name: "Shell Scripting", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "Django REST Framework", icon: SiDjango, color: "#A30000" },
      { name: "Flask", icon: SiFlask, color: "#444444" },
      { name: "REST APIs", icon: LuWebhook, color: "#2563EB" },
      { name: "Microservices", icon: LuBoxes, color: "#7C3AED" },
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Ionic", icon: SiIonic, color: "#3880FF" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS", icon: LuCloud, color: "#FF9900" },
      { name: "EC2", icon: LuServer, color: "#FF9900" },
      { name: "S3", icon: LuCloud, color: "#569A31" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
      { name: "Cloud Platforms", icon: LuCloud, color: "#0EA5E9" },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Database Design", icon: LuDatabase, color: "#0891B2" },
      { name: "Data Modeling", icon: LuNetwork, color: "#10B981" },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", icon: LuBrain, color: "#7C3AED" },
      { name: "Deep Learning", icon: LuBrain, color: "#9333EA" },
      { name: "LLMs", icon: LuSparkles, color: "#F59E0B" },
      { name: "Generative AI", icon: LuSparkles, color: "#EC4899" },
      { name: "RAG", icon: LuWorkflow, color: "#10B981" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      { name: "AI-assisted Development", icon: LuBot, color: "#6366F1" },
    ],
  },
  {
    title: "Reliability & Engineering",
    skills: [
      { name: "Chaos Engineering", icon: LuZap, color: "#EF4444" },
      { name: "Resiliency Engineering", icon: LuShield, color: "#0EA5E9" },
      { name: "Observability", icon: LuEye, color: "#8B5CF6" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Automation", icon: LuWorkflow, color: "#10B981" },
    ],
  },
  {
    title: "Development Practices",
    skills: [
      { name: "REST API Design", icon: LuWebhook, color: "#2563EB" },
      { name: "Unit Testing", icon: LuTestTube, color: "#DC2626" },
      { name: "Object-Oriented Programming", icon: LuBoxes, color: "#7C3AED" },
      { name: "Agile Development", icon: LuRefreshCw, color: "#059669" },
      { name: "Code Review", icon: LuCode, color: "#374151" },
    ],
  },
];
