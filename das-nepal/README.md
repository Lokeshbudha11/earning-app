# DAS Nepal — Cinematic 3D Agriculture Intelligence Site

A world-class cinematic 3D interactive marketing site for **DAS Nepal** (Digital Agricultural Systems) — Nepal's intelligent national agriculture platform.

> Inspired by Lusion, Noomo Agency, RenderBox Studio, Dub3D, and Three Aces Studios. Designed for Awwwards-level quality.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **GSAP** for cinematic timelines
- **Framer Motion** for component transitions
- **Lenis** for smooth scrolling
- **Tailwind CSS** for utility-driven design system
- **Prisma** + **PostgreSQL** (optional — falls back to in-memory)

## Sections (homepage)

1. **Hero** — Immersive 3D farmland at sunrise (drones, satellites, holographic analytics, animated network connections, parallax camera, magnetic CTAs)
2. **Agriculture Intelligence System** — 8 interactive cards with 3D tilt, glowing borders, glassmorphism
3. **Live National Dashboard** — Realtime-feel admin UI with animated graphs, donuts, streaming district table
4. **Cinematic Storytelling Scroll** — Parallax stage transforming Nepal from terraces → thinking landscape
5. **Interactive Nepal Map** — Hover-driven district network with live telemetry overlays
6. **Programs & Initiatives** — Six animated showcase tabs with orbital diagrams
7. **Media Experience** — Netflix/YouTube-style cinematic gallery with hover film-frame previews
8. **Team & Leadership** — Floating holographic portrait cards with 3D tilt
9. **Contact Experience** — Animated network globe + smart inquiry form (POST `/api/inquiries`)

## Color System

| Role | Token | Hex |
| --- | --- | --- |
| Primary | `forest` | `#0B3D2E` |
| Accent — Neon | `neon` | `#8DFF8A` |
| Background | `ink` | `#050505` |
| Earth | `earth` | `#5E3B28` |
| Electric | `electric` | `#00D1FF` |
| Premium | `gold` | `#D9B86C` |

## Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Backend

- `POST /api/inquiries` — submit a contact-form inquiry. Persists to PostgreSQL via Prisma if `DATABASE_URL` is set; otherwise persists in-memory for the request lifetime.
- `GET /api/inquiries` — list recent inquiries.
- `GET /api/metrics` — current dashboard metrics + production data.

To enable PostgreSQL persistence, copy `.env.example` to `.env` and set `DATABASE_URL`, then run:

```bash
npx prisma migrate dev --name init
```

## Performance & Accessibility

- Smooth-scroll + 3D scenes respect `prefers-reduced-motion`
- 3D scene `dpr` clamped to `[1, 1.6]` for high-FPS rendering
- Mobile-aware: heavy hover/magnetic effects gated behind `(hover: hover)`
- Semantic HTML, accessible labels, focus styles preserved

## Project Structure

```
das-nepal/
├── prisma/                  # Prisma schema
├── public/
├── src/
│   ├── app/                 # App router pages + API routes
│   ├── components/
│   │   ├── sections/        # Nine homepage sections
│   │   ├── three/           # R3F 3D scenes
│   │   └── ui/              # Cinematic UI primitives
│   ├── data/                # Site content
│   ├── lib/                 # Helpers (cn, db)
│   └── styles/              # Global CSS
├── tailwind.config.ts
└── tsconfig.json
```
