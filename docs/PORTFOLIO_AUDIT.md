# Portfolio Audit — Phase 1

Audit date: 2026-11-06 · Commit audited: `6b3e63a` (main) · Live site: https://narendra-portfolio-woad.vercel.app/

This document records the state of the repository before the Portfolio 2.0 redesign. Nothing in the application was changed during this phase.

---

## 1. Existing architecture

| Area | Current state |
| --- | --- |
| Framework | Next.js **16.3.6**, App Router, React **19.2.8** |
| Language | TypeScript 5, `strict: true` |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, class-based dark mode (`@custom-variant dark`) |
| Animation | `motion` 14.9.1 (Framer Motion), with `MotionConfig reducedMotion="user"` |
| Icons | `react-icons` 5.7 (`lu` Lucide set, `si` Simple Icons, `fa` for LinkedIn/GitHub) |
| Fonts | `next/font/google`: Geist (body), Geist Mono, Bricolage Grotesque (headings) |
| Package manager | npm (`package-lock.json`) |
| Hosting | Vercel (git integration; no `vercel.json` or `.vercel/` in repo) |
| Routing | **Single route** `/` plus metadata routes: `/sitemap.xml`, `/opengraph-image`, `/twitter-image`, `/icon.svg`, `/apple-icon` |
| Rendering | `/` is static with `revalidate: 1d` (GitHub contributions fetch) |
| Tests / CI | **None** (no test runner, no `.github/workflows`) |

### File map

```
app/
  layout.tsx            Root layout, fonts, metadata, pre-paint theme script, MotionProvider
  page.tsx              Entire homepage (~830 lines, server component) + helpers (Tags, SectionHeader, ContributionGraph)
  data.ts               All content: skillsOverview, experiences, projects, skillGroups, openTo, now, credentials, testimonials, github
  globals.css           Tailwind import, theme variables (light/dark), keyframes, reduced-motion overrides
  lib/github.ts         Scrapes github.com/users/<u>/contributions (cached 1 day)
  components/
    Navbar.tsx          Client: section-tracking pill, hide-on-scroll, mobile menu, ThemeToggle
    ThemeToggle.tsx     Client: light/dark toggle (localStorage + system default)
    Footer.tsx          Server: copyright, back-to-top
    motion.tsx          Client primitives: ScrollProgress, Reveal, Stagger, SpotlightCard, Magnetic, WordReveal, HeroItem, HeroBackground, Timeline, Pill
    sections.tsx        Client: CodeCard (typing editor), CountUp, SkillTabs
  sitemap.ts, opengraph-image.tsx, twitter-image.tsx, icon.svg, apple-icon.tsx
public/
  resume.pdf            4-page resume (see issue I-3)
  robots.txt
docs/                   (new) this audit + implementation plan
Archive.zip             Tracked backup of the original create-next-app starter (see issue I-8)
```

## 2. Current features (worth preserving)

- **Content model in one file** (`app/data.ts`): experiences, projects, skills, open-to, now, credentials, testimonials. Good base for a data-driven site.
- **Dark/light theme** with no flash on load, persisted choice, system default.
- **Motion system** with reduced-motion support everywhere: scroll reveals, staggered cards, scroll-drawn timeline, active-section nav pill, animated mobile menu.
- **Hero code-editor card** (typing Python snippet). The new brief explicitly asks for this, so keep it.
- **Recruiter signals already shipped:** Open to card, Now card, AWS credential with verified Credly link, GitHub contribution graph + featured repos, testimonials slot (hidden while empty).
- **Accessibility basics:** visible focus rings, 44px touch targets on primary controls, `aria-*` on nav/tabs, semantic sections.
- **SEO basics:** metadata, Open Graph/Twitter tags, generated OG image, sitemap, robots, icon set.
- **Live checks (2026-11-06):** no console errors or warnings, no failed requests, no broken in-page anchors, `/resume.pdf` returns 200, GitHub link 200, LinkedIn 301 (normal login redirect).

## 3. Dependencies

| Package | Version | Used for |
| --- | --- | --- |
| next | 16.3.6 | Framework |
| react / react-dom | 19.2.8 | UI |
| motion | ^14.9.1 | Animation |
| react-icons | ^5.7.0 | Icons |
| tailwindcss, @tailwindcss/postcss | ^4 | Styling |
| eslint, eslint-config-next | 9 / 16.3.6 | Lint |
| typescript, @types/* | 5 | Types |

No unused dependencies found.

## 4. Reusable components

`Reveal`, `Stagger`/`StaggerItem`, `SpotlightCard`, `Timeline`/`TimelineItem`, `Pill`, `Magnetic`, `CountUp`, `CodeCard`, `SkillTabs`, `ThemeToggle`, plus page-local `Tags`, `SectionHeader`, `ContributionGraph`. These are reusable but currently live in two grab-bag files (`motion.tsx`, `sections.tsx`) and inside `page.tsx`.

## 5. Issues found

Severity: **High** = visibly broken for users or crawlers today · **Med** = credibility/maintainability · **Low** = polish.

| ID | Sev | Issue | Evidence |
| --- | --- | --- | --- |
| I-1 | **High** | **Canonical domain does not resolve.** `metadataBase`, `og:url`, `og:image`, sitemap and `robots.txt` all point to `https://narendraavula.com`, which does not respond. Link previews on LinkedIn/Slack/X therefore have a broken image, and the sitemap lists an unreachable URL. | `curl narendraavula.com` → no response; live `og:image` = `https://narendraavula.com/opengraph-image?...` |
| I-2 | **High** | **Stats and GitHub total render as "0" in HTML.** `CountUp` starts at 0 and only animates client-side, so crawlers, no-JS visitors and link unfurlers see `0`, `0`, `0`, `0`, `0`. | `curl` of live page: five `tabular-nums">0<` |
| I-3 | **High** | **Resume PDF is out of date and inconsistent with the site.** It says "9 years" and "Software Engineer II"; the site says 11+ years and Software Engineer III. It also publishes a personal phone number. | `public/resume.pdf`, page 1 |
| I-4 | Med | **No tests or CI.** Every change relies on manual checks. | No test runner, no workflows |
| I-5 | Med | **`page.tsx` is ~830 lines** with all sections inline; hard to reuse sections across `/`, `/recruiter`, `/projects`. | `app/page.tsx` |
| I-6 | Med | **Single-page only.** No routes for projects, case studies, architecture, insights or recruiter mode, which the brief requires. | `app/` |
| I-7 | Med | **Missing structured data** (Person / WebSite JSON-LD) and canonical URLs. | Live HTML: 0 `application/ld+json` |
| I-8 | Low | `Archive.zip` (create-next-app starter backup incl. `__MACOSX` files) is committed. | `git ls-files` |
| I-9 | Low | `README.md` is outdated ("Senior Software Developer", "production website will be added"). | `README.md` |
| I-10 | Low | Theme defaults to the visitor's system setting; the brief asks for **dark by default**. | `app/layout.tsx` theme script |
| I-11 | Low | Visual effects exceed the new brief's restraint: three drifting hero blobs, floating hero badges, magnetic buttons, cursor spotlight on every card, shimmering gradient name. | `HeroBackground`, `CodeCard` badges, `Magnetic`, `SpotlightCard` |
| I-12 | Low | GitHub contributions are scraped from HTML; a markup change hides the graph (fails safely, but silently). | `app/lib/github.ts` |
| I-13 | Low | `WordReveal` puts `aria-label` on a `<span>`; screen readers may not announce the headline text reliably. | `app/components/motion.tsx` |
| I-14 | Low | Skill data has near-duplicates ("REST APIs" vs "REST API Design", "Cloud Platforms" vs AWS/EC2/S3) and skills (Jenkins, SQLite, Prometheus, Grafana, LangChain) that should be confirmed against real experience. **PostgreSQL** is in the new brief but not on the site or resume. | `app/data.ts` |

### Counter implementation (requested check)

`CountUp` (`app/components/sections.tsx`) uses `useInView` + `animate()` and respects reduced motion. Behaviour in the browser is correct. The defect is I-2: the server-rendered value is `0`. Fix: render the final value on the server and animate only after hydration (or render the real number inside the element and animate a visual overlay).

## 6. Content gaps (cannot be filled without the owner)

The brief forbids invented facts, so these need input:

| Gap | Needed |
| --- | --- |
| PrepForge, PrepForge Academic Hub | Repos `prepforge`, `prepforge-academic`, `prepforge-evals` exist but are **private**. Need permission to read them (or a written summary), plus which features are implemented vs planned. |
| CheckMate | No repo by that name found on `narendra-avula`. Need its location or a summary. |
| Enterprise Resiliency Engineering | Must stay sanitized. Resume gives: "Chaos Engineering Framework across Private / Public / Hybrid Cloud Environments", Python 3.10, Django, DRF, Linux, shell, microservices. Anything beyond that needs owner wording. |
| Impact metrics | Only verified number found: "Developed five major features" (Qvantel, resume). Everything else must be qualitative unless provided. |
| Insights articles | None exist. Drafts must be clearly marked unpublished. |
| Testimonials | None provided yet. |
| Contact form delivery | Needs an email provider decision (see plan). |

## 7. Verified facts available from the resume (usable without inventing)

- Qvantel (client Ericsson): integrated third-party systems (Ericsson CS, 3PP, payments) into the BSS stack; order channels, CRM, product catalog, message manager; RESTful microservices with Django and RabbitMQ; client interaction and requirement analysis; developed five major features.
- CustomFurnish: Medplus operations app (Ionic + Django; project management, roll call, reminders, referrals; JWT auth; roles and permissions; APK deployment); CustomSofa.in (customization models, EBS and Paytm payment gateways); BatchTag.com (schema, auth, cart, wallet, coupons, order tracking, invoices, dashboards); CRM (lead qualification workflow, dashboards, daily email cron); Customfurnish.com (SEO pages, admin dashboard, responsive listings).
- JPMorgan Chase: chaos engineering framework across private, public and hybrid cloud (internal client).

Client names (Ericsson, Veon, Medplus) appear on the resume; confirm the owner is comfortable showing them publicly before use.

## 8. Implementation risks

| Risk | Mitigation |
| --- | --- |
| Domain unresolved → wrong canonical URLs in every new page | Centralise the site URL in one config value; decide domain before Phase 6 SEO work. |
| Fabricated or overstated project claims | Every case-study field gets a `status` (implemented / experiment / planned); no metrics without a source. |
| Confidential employer detail in architecture pages | Label all architectures "illustrative"; no internal names, tools or numbers. |
| Mermaid runtime is heavy (~hundreds of KB client JS) | Prefer hand-built SVG diagram components (zero dependency, themeable, accessible). |
| Contact form showing false success | Server action returns real provider result; no provider configured → form hidden, mailto shown. |
| Regressions while splitting `page.tsx` | Add Playwright smoke tests in Phase 2 before large refactors. |
| Bundle growth from motion on every card | Keep motion to reveals and nav; drop per-card spotlight/magnetic effects per the new brief. |
