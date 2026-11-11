# Narendra Avula — Portfolio

Personal portfolio of **Narendra Avula**, a software engineer with 11+ years of experience in backend systems, cloud and reliability engineering, and AI/GenAI developer tooling.

**Live:** https://narendra-portfolio-woad.vercel.app

[![CI](https://github.com/narendra-avula/narendra-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/narendra-avula/narendra-portfolio/actions/workflows/ci.yml)

## What's inside

- **Homepage**: hero, recruiter snapshot, featured projects, expertise, experience timeline, engineering impact, education, insights and contact.
- **Projects** (`/projects`): filterable catalogue with case studies that separate implemented work from planned work.
- **Architecture Lab** (`/architecture`): illustrative reference designs (RAG pipeline, AI code review, event-driven microservices, chaos engineering) with accessible SVG diagrams, failure handling and trade-offs.
- **Insights** (`/insights`): MDX technical articles with reading time and a table of contents.
- **Recruiter Mode** (`/recruiter`): a one-page profile that prints cleanly to A4.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · MDX · Vercel Analytics · Vitest · Playwright

## Getting started

Requires Node.js 20.9 or later.

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | Generates route types, then runs `tsc` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Builds the site and runs Playwright on desktop and mobile |

## Docs

- [Architecture](docs/ARCHITECTURE.md): how the site is built and where things live
- [Content guide](docs/CONTENT_GUIDE.md): editing profile, projects, case studies and articles
- [Deployment](docs/DEPLOYMENT.md): Vercel, environment variables, custom domain, release checklist
- [Design system](docs/DESIGN_SYSTEM.md): tokens, typography and components
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md) and [audit](docs/PORTFOLIO_AUDIT.md): Portfolio 2.0 history

## Connect

- GitHub: https://github.com/narendra-avula
- LinkedIn: https://www.linkedin.com/in/narendraavula/

© Narendra Avula
