# Design System

Direction: premium dark engineering portfolio (Linear / Vercel / GitHub docs). Credibility and readability over effects.

## Colour tokens

Defined once in `app/globals.css` and exposed to Tailwind through `@theme inline`. Components use **semantic tokens only**; raw palette colours are reserved for brand icons and the code editor.

| Token | Tailwind | Dark (default) | Light | Use |
| --- | --- | --- | --- | --- |
| `--bg` | `bg-bg` | `#0a0d14` | `#f7f8fa` | Page background |
| `--surface` | `bg-surface` | `#0f131c` | `#ffffff` | Cards, footer |
| `--surface-2` | `bg-surface-2` | `#151a25` | `#f1f3f6` | Tags, insets, hover |
| `--line` | `border-line` | `#1f2633` | `#e3e6eb` | Default borders, dividers |
| `--line-strong` | `border-line-strong` | `#2c3544` | `#cdd2da` | Hover borders, secondary buttons |
| `--fg` | `text-fg` | `#e8ecf3` | `#0b1020` | Headings, primary text, primary button bg |
| `--muted` | `text-muted` | `#a3acbb` | `#4a5363` | Body text |
| `--subtle` | `text-subtle` | `#8a93a3` | `#636b78` | Meta text, labels |
| `--accent` | `text-accent` | `#5b93ff` | `#2563eb` | Electric blue: eyebrows, links, active states |
| `--accent-2` | `text-accent-2` | `#9d8cff` | `#7c3aed` | Violet, secondary accent (sparingly) |
| `--accent-soft` | `bg-accent-soft` | blue 10% | blue 8% | Status pills, highlight rings |

All text tokens meet WCAG AA (4.5:1) on `bg`, `surface` and `surface-2` in both themes.

Theme: dark by default; the toggle stores `light`/`dark` in `localStorage`. A pre-paint script in `app/layout.tsx` prevents a flash.

## Typography

- **Geist** (sans) for everything; **Geist Mono** for eyebrows, dates, repo names and the code card.
- Headings: `font-semibold`, `letter-spacing: -0.025em`, `text-wrap: balance`.
- Scale: H1 `text-4xl → 6xl`, H2 `text-3xl → 4xl`, H3 `text-lg–xl`, body `text-lg` (leads) / `15–16px` (cards).
- Eyebrow: mono, `text-xs`, uppercase, `tracking-[0.18em]`, accent colour.

## Spacing & shape

- Container: `max-w-6xl`, `px-5 sm:px-6`.
- Sections: `py-20 md:py-28`, separated by a `border-t border-line` divider.
- Cards: `rounded-xl`, `border-line`, `bg-surface`, padding `p-5–p-8`. No shadows except the hero code card and floating buttons.
- Buttons: `rounded-lg`, `min-h-11` (44px touch target).

## Components (`components/ui`)

| Component | Notes |
| --- | --- |
| `Container`, `Section` | Layout width and vertical rhythm |
| `Eyebrow`, `SectionHeader` | Section intro (eyebrow, H2, lead) with reveal |
| `Card` | `interactive` adds a border-colour hover only |
| `Tag`, `TagList` | Technology / focus-area chips |
| `ButtonLink` | `primary` (fg on bg), `secondary` (outlined), `ghost` |
| `focusRing` | Shared 2px accent focus outline |

## Motion (`components/motion`)

Restrained and always reduced-motion aware (`MotionConfig reducedMotion="user"`).

| Allowed | Not used |
| --- | --- |
| Fade/rise reveals (≤ 0.6s), staggered grids (70ms) | Floating or drifting decorations |
| Scroll-drawn timeline line | Magnetic buttons, cursor spotlights, 3D tilt |
| Nav active-item slide | Shimmering gradient text |
| Hero code typing, CountUp on stats | Infinite marquees |

`CountUp` server-renders the final number so crawlers and no-JS visitors see real values.

## Accessibility checklist

- Skip link to `#main`; landmark roles (`header`, `nav`, `main`, `footer`).
- Visible focus on every interactive element; Escape closes the mobile menu.
- Decorative visuals (`CodeCard`, project diagrams) are `aria-hidden`; their information also exists as text.
- Lists use list semantics; dates use `<time>`.
- No horizontal overflow at 390px (tested in Playwright).
