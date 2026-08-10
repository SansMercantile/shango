# SHANGO Frontend — Atmospheric & Climate Engineering Intelligence

SHANGO is Sans Mercantile's global climate engineering and weather command
system: threat radar, predictive weather modeling, deployable intervention
planning (seeding, dispersal, thermal/sonic countermeasures), and an AI
advisory core.

## Stack

Single Node/Express server (`server.ts`) that runs Vite in middleware mode for
dev and serves the static build in production — one process, one port.

- React 19 + TypeScript, Vite 6, Tailwind CSS 4
- `recharts` for data visualization, `motion` (Framer Motion), `lucide-react`
- Google Gemini (`@google/genai`, model `gemini-3.5-flash`) for the AI advisor

## Local Development

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env.local
# then set GEMINI_API_KEY in .env.local
npm run dev
```

Runs on **http://localhost:3000**. Without `GEMINI_API_KEY` set, the AI
advisor endpoint returns a clear error rather than failing silently.

## API Routes (server.ts)

- `POST /api/ai/advise` — SHANGO Atmospheric Intelligence Core advisory,
  takes `{ prompt, operationContext }`, returns `{ text }`

## Build & Run (production)

```bash
npm run build   # vite build + esbuild-bundles server.ts to dist/server.cjs
npm start        # node dist/server.cjs
```

## Project Structure

```
shango/
├── server.ts                  # Express app: /api/ai/advise + Vite/static serving
├── src/
│   ├── App.tsx                 # Landing <-> Console view switch
│   ├── data.ts
│   ├── types.ts
│   └── components/
│       ├── LandingPage.tsx
│       ├── OnboardingWizard.tsx
│       ├── Header.tsx
│       ├── CommandMap.tsx       # Global threat/operations map
│       ├── PredictiveEngine.tsx # Weather prediction + anomaly ledger
│       ├── InterventionPanel.tsx # Deployable countermeasure controls
│       ├── AIAdvisor.tsx        # Chat interface to /api/ai/advise
│       ├── AgentDirectory.tsx
│       └── OperatorProfile.tsx
└── vite.config.ts
```

## Notes

- 2026-08-09: fixed invalid Tailwind fractional sizes (`w-4.5`/`h-4.5`,
  `w-5.5`/`h-5.5` aren't real Tailwind values) and the leftover `react-example`
  placeholder package name; build script was missing the esbuild step needed
  to actually produce `dist/server.cjs` for `npm start` (same pattern found in
  [[ptah]]). Custom `--color-brand-*` theme tokens in `index.css` are real and
  fine, not part of this cleanup.
