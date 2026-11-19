# Analytics

The portfolio uses Vercel Analytics for cookieless page views and lightweight custom events. Analytics is enabled only on Vercel deployments (`VERCEL=1`), so local development does not send production data.

## Tracked events

| Event | Meaning |
| --- | --- |
| `Resume Download` | A visitor clicks the downloadable resume |
| `Project Visit` | A project case-study page is opened |
| `Contact Submit` | The contact form is accepted by the delivery provider |
| `Recruiter Visit` | The recruiter-mode page is opened |
| `GitHub Click` | A visitor follows a GitHub link |
| `LinkedIn Click` | A visitor follows a LinkedIn link |

Resume, GitHub and LinkedIn clicks are captured centrally by the delegated listener in `components/analytics/SiteAnalytics.tsx`. Project and recruiter page visits use `TrackView`; contact submissions are tracked only after a successful server response.

## Dashboard

In the Vercel project, open **Analytics → Events** to review event counts and filter by page or event name. The deployment must have Vercel Analytics enabled; no API key or database is required.
