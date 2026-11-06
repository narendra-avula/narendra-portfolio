# Content Guide

All site content lives in `content/`. Edit the files, run `npm run dev` and check the page, then run `npm test`. The content tests catch the most common mistakes.

## Rules

1. **No invented metrics.** Use only numbers you can source, such as from the resume. Tests reject numeric claims in case studies and architecture pages, and the only number allowed in Engineering Impact is the verified one ("five major features").
2. **Client and employer names are fine.** Describe confidential systems in sanitised terms, and label diagrams of employer work as illustrative.
3. **Say what is real.** Case-study capabilities carry a status (`implemented`, `in-progress`, `experimental`, `planned`). Don't present planned work as shipped.
4. **Public links only.** Links must be `https` and public.
5. **Facts in one place.** Years of experience, current role, email and social links are set only in `content/profile.ts`.

## Where things live

| To change | Edit | Notes |
| --- | --- | --- |
| Name, headline, role, years, links, "Open to" | `content/profile.ts` | Used site-wide, including metadata and JSON-LD |
| Work history | `content/experience.ts` | Newest first; `current: true` on the present role, which must match `profile.employer` |
| Skills | `content/skills.ts` | Six groups; icons from `react-icons` |
| Education and certifications | `content/education.ts` | |
| "Now", testimonials, featured repos, Engineering Impact | `content/extras.ts` | Testimonials section stays hidden while the list is empty |
| Projects (catalogue cards) | `content/projects.ts` | Professional projects need `company` matching an experience entry |
| Case studies | `content/case-studies.ts` | Keyed by project slug; a project gets a `/projects/[slug]` page only if it has one |
| Architecture Lab | `content/architecture.ts` | Diagrams must pass `validateDiagram()` |
| Articles | `content/insights.ts` + `content/insights/<slug>.mdx` | See below |
| Resume | `public/resume.pdf` | Replace the file and keep the name. Downloads are saved as `profile.resume.filename` |

## Common tasks

### Add a project

1. Add an entry to `projects` in `content/projects.ts` with a unique `slug`.
2. Set `featured: true` only for the homepage's featured four. The test expects exactly four, each with a `visual`.
3. Optional: add a case study under the same slug in `content/case-studies.ts`. The page, metadata and sitemap entry are created automatically.

### Write an article

1. Create `content/insights/<slug>.mdx`. Use `##` and `###` headings; they become the table of contents.
2. Add metadata to `insights` in `content/insights.ts` with `status: "draft"`.
3. Preview at `/insights/<slug>` with `npm run dev`. Drafts are visible in development and carry a "Draft" badge.
4. To publish, set `status: "published"` and `published: "YYYY-MM-DD"`. The article then appears on `/insights`, on the homepage and in the sitemap.

Reading time and the table of contents are calculated from the MDX, so you never set them by hand.

### Add an architecture page

Add an `ArchitecturePage` to `content/architecture.ts`. Diagram nodes sit on a column/row grid. If `npm test` reports overlapping nodes, edges crossing a node, or labels on edges too short to show them, move nodes until the check passes.

### Add a testimonial

Add `{ quote, name, role, relationship }` to `testimonials` in `content/extras.ts`. Only use quotes the person has agreed to have published.

## Checks before committing

```bash
npm run typecheck && npm run lint && npm test
```

`npm run test:e2e` builds the site and runs the browser tests. CI runs everything on each pull request.
