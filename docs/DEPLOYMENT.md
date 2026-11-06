# Deployment

The site is hosted on Vercel and connected to the GitHub repo `narendra-avula/narendra-portfolio`.

- **Production**: every push to `main`.
- **Preview**: every push to any other branch or pull request gets its own URL.
- **CI**: GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, lint, unit tests, build and e2e on pull requests and pushes to `main`. Vercel deploys separately, so make the CI check required in branch protection if you want failing builds blocked from merging.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables. None are needed for the site to build.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical base URL for metadata, sitemap and JSON-LD. Defaults to `https://narendra-portfolio-woad.vercel.app`. Set it once the custom domain works |
| `RESEND_API_KEY` | For the contact form | Without it the form is hidden and a mailto link is shown |
| `CONTACT_TO_EMAIL` | No | Where messages go. Defaults to `profile.email` |
| `CONTACT_FROM_EMAIL` | Recommended with Resend | Sender on a domain verified in Resend. Without it Resend's test sender is used, which only delivers to the Resend account's own address |
| `SHOW_DRAFTS` | No | `true` shows draft articles. Used by e2e tests; don't set it in production |

`VERCEL=1` is set by Vercel automatically and turns on Vercel Analytics. Enable Analytics in the Vercel project dashboard as well.

## Local commands

```bash
npm ci
npm run dev          # http://localhost:3000, drafts visible
npm run build        # production build
npm start            # serve the build
npm run typecheck    # next typegen + tsc
npm run lint
npm test             # unit tests
npm run test:e2e     # builds, serves on :3200, runs Playwright (desktop + mobile)
```

Locally Playwright uses your installed Chrome. CI installs Playwright's Chromium.

## Connecting the custom domain

1. In Vercel → Project → Settings → Domains, add `narendraavula.com` (and `www`), then set the DNS records Vercel shows at your registrar.
2. Once it resolves over HTTPS, set `NEXT_PUBLIC_SITE_URL=https://narendraavula.com` for Production and redeploy.
3. Check `/sitemap.xml`, `/robots.txt` and a page's `<link rel="canonical">` all use the new domain.

## Release checklist

After a production deploy:

- [ ] Homepage, `/projects`, a case study, `/architecture`, `/insights` and `/recruiter` load
- [ ] Resume downloads and is the current version
- [ ] `/sitemap.xml` lists only published articles; `/robots.txt` points at the sitemap
- [ ] The link preview shows the OG image (test with LinkedIn Post Inspector)
- [ ] Vercel Analytics records page views and a resume-download event
- [ ] Contact form sends a test message (if `RESEND_API_KEY` is set), or the mailto fallback shows
- [ ] Unknown URL returns the 404 page

## Rollback

In Vercel → Deployments, open the last good production deployment and choose **Promote to Production**. Then revert the bad commit on `main` so the next deploy doesn't bring it back.
