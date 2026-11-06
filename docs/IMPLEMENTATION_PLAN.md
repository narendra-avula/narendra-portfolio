# Implementation Plan — Portfolio 2.0

Companion to `docs/PORTFOLIO_AUDIT.md`. Each phase ends with typecheck, lint, production build and (from Phase 2) automated tests passing before the next phase starts.

---

## Decisions needed before / during implementation

| # | Decision | Recommendation | Blocks |
| --- | --- | --- | --- |
| D1 | Canonical domain (narendraavula.com does not resolve) | Use `https://narendra-portfolio-woad.vercel.app` now via one `SITE_URL` setting; switch when the domain is connected | Phase 2 (quick fix), Phase 6 |
| D2 | Updated resume PDF (current one says 9 yrs / SE II and shows phone number) | Owner supplies an updated PDF; site links stay at `/resume.pdf` | Phase 3 |
| D3 | PrepForge / Academic Hub / CheckMate content | Done for PrepForge and Academic Hub (read from their private repos). **CheckMate open:** no repo found; its card stays without a case study until the owner points to a source | Phase 4 |
| D4 | Contact form delivery | Resend (free tier) via a Server Action, key stored as a Vercel env var; without a key the form is hidden and mailto is shown | Phase 6 |
| D5 | Existing sections not in the brief's homepage order (Open to, Now, GitHub, Testimonials) | Open to → Recruiter Snapshot; Now → Professional Summary; GitHub → Engineering Impact; Testimonials → after Experience (still hidden while empty) | Phase 2 |
| D6 | Light theme | Dark by default, keep the toggle | Phase 2 |
| D7 | Insights with no real articles yet | Publish route + 1–2 drafts marked "Draft — unpublished", excluded from sitemap and homepage until published | Phase 6 |
| D8 | Remove `Archive.zip` from the repo | Yes (starter backup, no portfolio content) | Phase 2 |

---

## Recommended component structure

```
app/
  layout.tsx                    Root: fonts, theme, analytics, JSON-LD, Navbar/Footer, skip link
  page.tsx                      Homepage — composes section components only
  projects/page.tsx             Catalogue: filter, search, featured
  projects/[slug]/page.tsx      Case study (generateStaticParams + generateMetadata)
  architecture/page.tsx         Architecture Lab index
  architecture/[slug]/page.tsx  Architecture detail
  recruiter/page.tsx            One-page, print-optimised profile
  insights/page.tsx             Article list: categories, search, reading time
  insights/[slug]/page.tsx      MDX article: TOC, related articles
  actions/contact.ts            Server Action: validate + send (Resend)
  sitemap.ts, robots.ts         Generated from content (replaces public/robots.txt)
  opengraph-image.tsx           Default OG; per-route OG for projects/insights
components/
  layout/      Navbar, MobileNav, Footer, ScrollToTop, SkipLink, ThemeToggle
  ui/          Button, Card, Badge, Tag, SectionHeader, Container, Kbd, Callout
  motion/      Reveal, Stagger, Timeline (trimmed set, reduced-motion aware)
  home/        Hero, CodeCard, RecruiterSnapshot, ProfessionalSummary, FeaturedProjects,
               ExpertiseGrid, ExperienceTimeline, EngineeringImpact, Education, InsightsPreview, Contact
  projects/    ProjectCard, ProjectFilters, CaseStudySection, StatusBadge
  diagrams/    Diagram (accessible SVG wrapper), RagDiagram, CodeReviewPipeline,
               MicroservicesDiagram, ResiliencyDiagram
  insights/    ArticleCard, TableOfContents, ReadingTime
  contact/     ContactForm (client), FormField
content/
  profile.ts        Single source of truth: name, titles, years, links, location, open-to
  experience.ts     Roles with responsibilities, contributions, tech, business context
  skills.ts         De-duplicated skill groups (brief's 6 groups)
  projects.ts       Projects + case-study fields with per-feature status
  architecture.ts   Architecture pages content
  education.ts      Degrees + certifications (Credly link)
  insights/*.mdx    Articles (frontmatter via exported `metadata`)
lib/
  site.ts           SITE_URL, nav items, social links
  seo.ts            buildMetadata(), JSON-LD builders
  analytics.ts      track() wrapper for custom events
  github.ts         (existing) contributions loader
tests/
  unit/             Vitest + Testing Library (filters, validation, data integrity)
  e2e/              Playwright (routes, nav, mobile nav, resume download, metadata, print)
docs/               Audit, design system, architecture, content guide, plan, deployment
```

Rule: **every repeated fact** (years, title, employer, links, email) lives in `content/profile.ts` and is imported everywhere, including OG images and JSON-LD.

---

## Files to modify

| File | Change |
| --- | --- |
| `app/layout.tsx` | Dark default, skip link, global Navbar/Footer, JSON-LD, analytics, `SITE_URL` metadataBase |
| `app/page.tsx` | Becomes a thin composition of `components/home/*` in the brief's section order |
| `app/globals.css` | Design tokens (navy/charcoal surfaces, blue/violet accents), print styles, trimmed keyframes |
| `app/components/Navbar.tsx` → `components/layout/Navbar.tsx` | New nav items (Home, About, Experience, Projects, Architecture, Insights, Contact), route-aware active state, Download Resume CTA |
| `app/components/Footer.tsx` → `components/layout/Footer.tsx` | Sitemap-style links, scroll-to-top |
| `app/components/motion.tsx` | Split; remove HeroBackground blobs, Magnetic, per-card spotlight; keep Reveal/Stagger/Timeline |
| `app/components/sections.tsx` | CodeCard → `components/home/CodeCard.tsx` (badges removed); CountUp fixed (I-2) |
| `app/data.ts` | Split into `content/*`; skills de-duplicated |
| `app/sitemap.ts` | All routes, `SITE_URL` |
| `app/opengraph-image.tsx` | Use `content/profile.ts`, new positioning line |
| `app/lib/github.ts` → `lib/github.ts` | Moved, unchanged behaviour |
| `README.md` | Setup, commands, structure, content guide, deploy |
| `package.json` | New scripts: `test`, `test:e2e`, `typecheck` |
| `next.config.ts` | MDX support (`pageExtensions`) |

## Files to create

`docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT_GUIDE.md`, `docs/DEPLOYMENT.md`, all route files listed above, `components/**`, `content/**`, `lib/site.ts`, `lib/seo.ts`, `lib/analytics.ts`, `app/robots.ts`, `app/actions/contact.ts`, `mdx-components.tsx`, `vitest.config.ts`, `playwright.config.ts`, `tests/**`, `.github/workflows/ci.yml`.

## Files to delete

`Archive.zip` (D8), `public/robots.txt` (replaced by `app/robots.ts`).

## Dependencies

| Package | Why | Phase |
| --- | --- | --- |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | Insights articles (official Next.js MDX path) | 6 |
| `@vercel/analytics` | Page views + custom events, cookieless | 6 |
| `resend` | Contact form delivery (only if D4 = Resend) | 6 |
| `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/dom` | Unit/component tests | 2 |
| `@playwright/test` | E2E: routes, nav, print, metadata, mobile | 2 |

Deliberately **not** added: Mermaid (heavy client runtime; SVG components instead), a CMS or database, a form library, a search library (client-side filtering is enough for this content size). No existing dependency is upgraded.

---

## Phases

### Phase 2 — Design system, global layout, navigation, homepage
1. Add test tooling (Vitest, Playwright) and smoke tests for the **current** homepage, so the refactor is protected.
2. Create `content/profile.ts`, `lib/site.ts` (`SITE_URL`, D1). Fix I-1 immediately.
3. Design tokens + `docs/DESIGN_SYSTEM.md`; dark default (D6); trim effects (I-11); fix CountUp SSR (I-2) and WordReveal a11y (I-13).
4. Layout components: Navbar (new items, Download Resume CTA, mobile nav), Footer, ScrollToTop, skip link.
5. Homepage sections 1–10 in the brief's order, using existing content; placeholders only where content is pending and clearly hidden or labelled.
6. Remove `Archive.zip` (D8).
Exit: typecheck, lint, build, unit + e2e green; screenshots light/dark/mobile.

### Phase 3 — Experience, education, skills, resume
1. `content/experience.ts` with responsibilities, contributions, business context from the resume (sanitised).
2. `content/skills.ts`: brief's six groups, duplicates removed (I-14), PostgreSQL added per brief.
3. Education + certifications (Credly). Engineering Impact: qualitative items + the one verified number.
4. Resume: swap in the updated PDF (D2); add a download test.

### Phase 4 — Projects catalogue and case studies
1. `content/projects.ts` schema with all 13 case-study fields and per-capability `status`.
2. `/projects` (filter by category, search, featured) and `/projects/[slug]` (static params, per-page metadata/OG).
3. Content for PrepForge, CheckMate, Resiliency, Academic Hub from D3 sources; existing six projects kept as catalogue entries (nothing deleted).
4. Tests: filtering, search, every slug renders, 404 for unknown slug.

### Phase 5 — Architecture Lab and Recruiter Mode
1. Accessible SVG diagram system (title/desc, text alternative list, responsive, theme-aware).
2. Four architecture pages, each labelled illustrative, with flows, boundaries, failure handling, trade-offs.
3. `/recruiter`: one-page profile from `content/*`, print stylesheet (A4, light, no nav/motion), Print button, contact links.
4. Tests: recruiter page renders all facts; print media snapshot.

### Phase 6 — Insights, analytics, SEO, contact form
1. MDX setup, `/insights` (categories, search, reading time), `/insights/[slug]` (TOC, related), drafts flagged (D7).
2. Vercel Analytics + custom events (resume download, project visit, recruiter visit, GitHub/LinkedIn click, contact submit).
3. SEO: per-route metadata, canonical URLs, Person + WebSite JSON-LD, sitemap from content, `app/robots.ts`.
4. Contact form: client validation + Server Action validation, honeypot, real provider result only (D4).
5. Tests: metadata per route, contact validation and error states.

### Phase 7 — Testing, performance, accessibility, deployment
1. Lighthouse runs (mobile + desktop) on `/`, `/projects/[slug]`, `/recruiter`; fix regressions.
2. Keyboard-only and reduced-motion passes; axe checks in Playwright.
3. CI workflow (typecheck, lint, build, tests). `docs/DEPLOYMENT.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT_GUIDE.md`, README.
4. Deploy and verify the live site (OG preview, sitemap, robots, analytics events).
