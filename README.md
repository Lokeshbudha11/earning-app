# Blaster — Online Reward Platform

A full-stack Next.js + Express scaffold of the Blaster reward platform with **advanced UI animations** baked in from the start.

> Earn points and cash by completing microtasks, watching ads, finishing offerwall deals, and picking up freelance gigs. Withdraw via eSewa, Khalti, or PayPal.

## Stack

- **Frontend** — Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide
- **Backend** — Node.js · Express · Prisma · SQLite (swap to Postgres in `prisma/schema.prisma`)
- **Animations** — Framer Motion + canvas-confetti + custom SVG/CSS

## Repo layout

```
blaster/
├── apps/
│   ├── web/   # Next.js 14 frontend
│   └── api/   # Express + Prisma backend (SQLite for demo)
└── package.json   # npm workspaces root
```

## Getting started

```bash
# Install everything
npm install

# Set up the database (SQLite, file-based)
cp apps/api/.env.example apps/api/.env
npm run --workspace apps/api db:push
npm run --workspace apps/api seed

# Run both apps in parallel
npm run dev
# web:   http://localhost:3000
# api:   http://localhost:4000
```

The web app reads `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`) and
proxies `/api/backend/*` to the Express service via Next rewrites.

## Pages

- `/` — animated landing with aurora mesh, coin particles, animated stats counter, marquee partner row, tilt cards, magnetic CTA buttons, gradient text, scroll-linked reveals.
- `/auth/sign-in` — email + OTP step transitions, animated focus chrome.
- `/dashboard` — stat cards (number tickers), streak progress ring, trending tasks, animated activity feed.
- `/tasks` — search, animated filter pill (FLIP via `LayoutGroup` + `layoutId`), list stagger with exit/enter animations.
- `/tasks/[id]` — task detail with progress ring, ripple submit button, **canvas-confetti reward burst on completion**.
- `/wallet` — balance card with floating coin particles, withdraw modal with method picker glow + completion check animation.
- `/leaderboard` — podium top-3, **live FLIP rank-change animations** (auto-shuffles every 3.5s).
- `/profile` — animated tier badge, referral copy state, animated tabs, custom toggles.

## Advanced animation primitives

Each lives under `apps/web/src/components/anim/`:

| File                  | What it does                                                     |
|-----------------------|------------------------------------------------------------------|
| `AuroraBackground.tsx`| Conic gradient + radial blobs + grid mask                        |
| `CoinParticles.tsx`   | Floating gold coins with randomized loops                        |
| `Reveal.tsx`          | Scroll-triggered fade + blur-in with stagger groups              |
| `NumberTicker.tsx`    | Smoothly animates numeric values when in view                    |
| `ProgressRing.tsx`    | Animated SVG ring with gradient stroke                           |
| `MagneticButton.tsx`  | Cursor-magnet button with spring follow                          |
| `RippleButton.tsx`    | Material-style ripple from click coordinate                      |
| `TiltCard.tsx`        | 3D parallax tilt with spotlight tracking the cursor              |
| `PageTransition.tsx`  | App-wide animated route transitions                              |
| `Confetti.tsx`        | `canvas-confetti` reward burst + side-fountain                   |
| `Marquee.tsx`         | Infinite duplicated marquee with hover-pause                     |

## Database

`apps/api/prisma/schema.prisma` defines: `User`, `Task`, `Submission`, `Transaction`, `Referral` — straight from the project documentation. Provider is SQLite for instant local demo; switch to `postgresql` and rerun `prisma db push` for production.

## API endpoints

```
GET  /health
GET  /me
GET  /tasks?category=...
GET  /tasks/:id
POST /tasks/:id/submit          { userId, proofUrl? }
GET  /wallet/:userId
POST /wallet/withdraw           { userId, amount, method }
GET  /leaderboard
GET  /stats
```

## Scripts

| From the root                | Does                                  |
|-----------------------------|---------------------------------------|
| `npm run dev`               | Run web + api in parallel             |
| `npm run dev:web`           | Web only (Next dev server)            |
| `npm run dev:api`           | API only (tsx watch)                  |
| `npm run build`             | Build web + api                       |
| `npm run lint`              | Next lint                             |
| `npm run typecheck`         | TS check both apps                    |
| `npm run seed`              | Seed Prisma DB                        |

## Notes

- All animations respect `prefers-reduced-motion`.
- The frontend uses a small mock data layer (`apps/web/src/lib/mock.ts`) so the UI is demo-able even without the backend running.
- The `apps/api` Prisma schema is wired to the same shape as the mock so you can incrementally swap in real fetches.
