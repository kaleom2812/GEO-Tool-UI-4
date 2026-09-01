# GEO Audit — Option 2: Executive Intelligence

A frontend-only demo of a **GEO (Generative Engine Optimization) auditing platform**.
Premium enterprise / consulting aesthetic: editorial serif display, restrained palette,
generous whitespace, document-style report that reads like a board deliverable.

No backend, no authentication, no real payments. All audit data is mock data for the
fictional brand **Rivet CRM** and lives in `src/data/auditData.js` (identical across all
three UI options in this set).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build     # production build to /dist
npm run preview   # serve the production build on :4173
```

Requires Node 18+.

## Workflow

`Landing → Audit brief → Analysis (animated) → Findings preview (90% locked) →
Payment (demo) → Access code → Full deliverable`

- The demo access code is **`GEO-DEMO-2026`** (also revealed on the access screen).
- Unlock state persists in `localStorage` (`geo-demo-unlocked-v1`). Clear site data to reset.

## The deliverable — 14 sections

GEO Score & breakdown · Executive summary · AI Visibility · Entity Understanding ·
Answerability · Prompt evidence · Competitor intelligence & share of voice ·
Citation visibility · Page & content findings · Technical GEO ·
Schema / robots.txt / llms.txt · Action center · 90-day roadmap · Methodology

Every section is structured **Problem → Evidence → Impact → Recommendation → Action**.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion. Charts are hand-built SVG
(`src/charts.jsx`) — no charting library. Fonts load from Google Fonts.

## Accessibility

Keyboard-navigable, visible focus rings, `prefers-reduced-motion` respected,
semantic landmarks and headings, form error summaries, chart text alternatives,
skip link, AA contrast target.
