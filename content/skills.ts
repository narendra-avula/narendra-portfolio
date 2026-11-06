import type { IconType } from "react-icons";
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiGnubash, SiDjango, SiFlask, SiRabbitmq,
  SiAngular, SiReact, SiIonic, SiBootstrap, SiLinux, SiGit, SiJenkins, SiMysql, SiMongodb,
  SiSqlite, SiPostgresql, SiLangchain, SiPrometheus, SiGrafana,
} from "react-icons/si";
import {
  LuWebhook, LuBoxes, LuCloud, LuServer, LuBrain, LuSparkles, LuWorkflow, LuBot, LuZap,
  LuShield, LuEye, LuFileCode, LuDatabase, LuActivity, LuLayers,
} from "react-icons/lu";

export type Skill = { name: string; icon: IconType; color?: string };
export type SkillGroup = { title: string; icon: IconType; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend Engineering",
    icon: LuServer,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Django", icon: SiDjango, color: "#44B78B" },
      { name: "Django REST Framework", icon: SiDjango, color: "#A30000" },
      { name: "Flask", icon: SiFlask },
      { name: "REST APIs", icon: LuWebhook, color: "#3B82F6" },
      { name: "Microservices", icon: LuBoxes, color: "#8B5CF6" },
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
    ],
  },
  {
    title: "Frontend Engineering",
    icon: LuLayers,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#E3C21B" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: LuFileCode, color: "#1572B6" },
      { name: "Ionic", icon: SiIonic, color: "#3880FF" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: LuCloud,
    skills: [
      { name: "AWS (EC2, S3)", icon: LuCloud, color: "#FF9900" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Shell Scripting", icon: SiGnubash, color: "#4EAA25" },
      { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Cloud Platforms", icon: LuCloud, color: "#0EA5E9" },
    ],
  },
  {
    title: "Reliability",
    icon: LuActivity,
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
    title: "AI & GenAI",
    icon: LuBrain,
    skills: [
      { name: "Machine Learning", icon: LuBrain, color: "#8B5CF6" },
      { name: "Deep Learning", icon: LuBrain, color: "#A855F7" },
      { name: "LLMs", icon: LuSparkles, color: "#F59E0B" },
      { name: "Generative AI", icon: LuSparkles, color: "#EC4899" },
      { name: "RAG", icon: LuWorkflow, color: "#10B981" },
      { name: "LangChain", icon: SiLangchain, color: "#1C9C7C" },
      { name: "AI-assisted Development", icon: LuBot, color: "#6366F1" },
    ],
  },
  {
    title: "Data",
    icon: LuDatabase,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#5A9BD5" },
      { name: "Data Modeling", icon: LuDatabase, color: "#10B981" },
    ],
  },
];

/** Engineering practices, shown as a single line under the grid. */
export const practices = ["REST API design", "Unit testing", "Object-oriented programming", "Agile delivery", "Code review"];

export const skillCount = new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name))).size;
