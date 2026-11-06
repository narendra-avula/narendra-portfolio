# Architecture

A statically generated Next.js 16 (App Router) site. Content is plain TypeScript and MDX in the repo, with no CMS or database. Almost every page is prerendered at build time. The only server code that runs at request time is the contact form's Server Action.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.3 (App Router, Turbopack), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with semantic design tokens (`docs/DESIGN_SYSTEM.md`) |
| Motion | `motion` (respects `prefers-reduced-motion`) |
| Articles | MDX through `@next/mdx` |
| Analytics | `@vercel/analytics`, cookieless, loaded only on Vercel |
| Email | Resend HTTP API, called with `fetch` (no SDK) |
| Tests | Vitest + Testing Library (unit), Playwright (e2e, desktop + mobile) |
| Hosting | Vercel, deployed from GitHub |

## Directory layout

```
app/                 Routes (App Router)
  page.tsx           Homepage: composes components/home/* in the brief's order
  projects/          /projects catalogue and /projects/[slug] case studies
  architecture/      /architecture index and /architecture/[slug] reference designs
  insights/          /insights list and /insights/[slug] MDX articles
  recruiter/         One-page printable profile
  actions/contact.ts Server Action for the contact form
  sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx, icons
components/
  home/              Homepage sections
  layout/            Navbar, Footer, ThemeToggle, ScrollToTop
  projects/, insights/, diagrams/, recruiter/, analytics/
  ui/                Shared primitives (Section, Card, Tag, buttons, focus ring)
  motion/            Animation wrappers
content/             All site content (see docs/CONTENT_GUIDE.md)
lib/                 Pure logic, unit tested (filters, diagram geometry, SEO, email)
mdx-components.tsx   MDX element styling and heading ids (required by @next/mdx)
tests/unit/          Vitest
tests/e2e/           Playwright
```

## Data flow

```
content/*.ts  ──►  lib/* (derive, filter, validate)  ──►  components/*  ──►  app/* routes
content/insights/*.mdx ──► lib/insights.ts (reading time, TOC) ──► app/insights/[slug]
```

- **One source of truth.** Facts that appear in several places, such as years of experience, current role and links, live in `content/profile.ts` and are imported everywhere. Unit tests in `tests/unit/content.test.ts` check that they stay consistent.
- **Static params.** `/projects/[slug]`, `/architecture/[slug]` and `/insights/[slug]` use `generateStaticParams` from content. Unknown slugs return 404.
- **Derived data.** Article reading time and the table of contents come from the MDX source, so they can't drift from the text. Heading ids are produced by the same `slugify` in `lib/insights.ts` and `mdx-components.tsx`.
- **Diagrams as data.** Architecture diagrams are grid specs in `content/architecture.ts`, laid out by `lib/diagram.ts` and rendered as accessible SVG by `components/diagrams/Diagram.tsx`. `validateDiagram()` rejects overlapping nodes, edges that cross a node, and labels that hide their arrow. A unit test runs it on every diagram.

## Runtime behaviour

| Feature | Where | Notes |
| --- | --- | --- |
| Canonical URLs, sitemap, JSON-LD | `lib/site.ts`, `lib/structured-data.ts`, `app/sitemap.ts` | Base URL from `NEXT_PUBLIC_SITE_URL`, defaulting to the Vercel URL |
| Draft articles | `lib/insights.ts` `showDrafts()` | Shown in `next dev` or with `SHOW_DRAFTS=true`; otherwise no page, listing or sitemap entry |
| Analytics | `components/analytics/*`, `lib/analytics.ts` | Enabled only when `VERCEL=1`; custom events for resume download, project and recruiter visits, GitHub/LinkedIn clicks, contact submit |
| Contact form | `app/actions/contact.ts`, `lib/contact.ts`, `lib/email.ts` | Same validation in browser and Server Action; honeypot field; form hidden and mailto shown when `RESEND_API_KEY` is unset |
| GitHub activity | `lib/github.ts` | Reads the public contribution calendar, cached for a day. Hidden if GitHub is unreachable |
| Theme | `components/layout/ThemeToggle.tsx` | Dark by default, light available |
| Print | `/recruiter` print stylesheet | A4, light, no nav or motion |

## Testing

- **Unit (`npm test`)**: content integrity (no invented metrics, valid slugs, every professional project tied to an employer), filters, diagram geometry, SEO metadata, contact validation and delivery, draft visibility.
- **E2E (`npm run test:e2e`)**: builds the site and serves it on port 3200 with `SHOW_DRAFTS=true`, then runs every route on desktop and mobile. Covers navigation, filtering, 404s, metadata, the recruiter print view and the contact fallback.
- **CI**: `.github/workflows/ci.yml` runs typecheck, lint, unit tests, build and e2e on every pull request and on pushes to `main`.

`npm run typecheck` runs `next typegen` first. That generates the route types (`PageProps`, `next-env.d.ts`) a fresh checkout doesn't have yet.
