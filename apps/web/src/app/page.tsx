"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  Gift,
  ListChecks,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Video
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/anim/Reveal";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { Marquee } from "@/components/anim/Marquee";

const offers = [
  { brand: "Daraz", action: "Install & open", reward: "₨ 150", rating: 5.0, emoji: "🛒", bg: "bg-rose-50" },
  { brand: "TikTok", action: "Sign up & follow", reward: "₨ 90", rating: 5.0, emoji: "🎵", bg: "bg-zinc-100" },
  { brand: "YouTube", action: "Try Premium", reward: "₨ 110", rating: 5.0, emoji: "▶️", bg: "bg-rose-50" }
];

const ways = [
  {
    Icon: Gamepad2,
    title: "Play games",
    description:
      "Get paid to play mobile games, puzzles, and trivia. Earn cash for every game you complete.",
    range: "₨ 30 — ₨ 4,800",
    label: "Earn per game",
    bg: "from-rose-100 to-rose-50",
    iconBg: "bg-rose-500",
    cta: "Play games to earn"
  },
  {
    Icon: ListChecks,
    title: "Complete surveys",
    description:
      "Paid surveys in 2–5 minutes. Share your opinion, get instant rewards to eSewa or Khalti.",
    range: "₨ 50 — ₨ 3,200",
    label: "Earn per survey",
    bg: "from-violet-100 to-violet-50",
    iconBg: "bg-brand-600",
    cta: "Complete surveys to earn"
  },
  {
    Icon: Sparkles,
    title: "Do tasks",
    description:
      "Freelance micro-tasks: reels, articles, design. Work from home on your schedule.",
    range: "₨ 90 — ₨ 5,000",
    label: "Earn per task",
    bg: "from-amber-100 to-amber-50",
    iconBg: "bg-sun-500",
    cta: "Do tasks to earn"
  },
  {
    Icon: Video,
    title: "Watch videos",
    description: "Get paid to watch short videos. Earn per video, instant payouts, no signup fees.",
    range: "₨ 5 — ₨ 250",
    label: "Earn per video",
    bg: "from-emerald-100 to-emerald-50",
    iconBg: "bg-leaf-500",
    cta: "Watch videos to earn"
  },
  {
    Icon: Gift,
    title: "Offerwall deals",
    description: "Lootably, CPX & Adscend offers — try premium products and pocket the bounty.",
    range: "₨ 200 — ₨ 6,400",
    label: "Earn per deal",
    bg: "from-sky-100 to-sky-50",
    iconBg: "bg-sky",
    cta: "Open the offerwall"
  },
  {
    Icon: Smartphone,
    title: "Test apps",
    description: "Sign up, try a feature, screenshot. Auto-approved by partner SDKs.",
    range: "₨ 70 — ₨ 1,500",
    label: "Earn per app",
    bg: "from-fuchsia-100 to-fuchsia-50",
    iconBg: "bg-fuchsia-500",
    cta: "Test apps to earn"
  }
];

const steps = [
  {
    n: 1,
    title: "Create account",
    body: "Sign up free in 30 seconds with your phone or Google account — no card needed.",
    accent: "from-brand-100 to-brand-50",
    badge: "bg-brand-500"
  },
  {
    n: 2,
    title: "Start earning",
    body: "Pick from games, surveys, videos, or jobs — finish what you like, when you like.",
    accent: "from-sun-100 to-sun-50",
    badge: "bg-sun-500"
  },
  {
    n: 3,
    title: "Get paid instantly",
    body: "Withdraw to eSewa, Khalti, PayPal or bank as soon as you hit ₨ 100.",
    accent: "from-leaf-100 to-leaf-50",
    badge: "bg-leaf-500"
  }
];

const partners = ["Daraz", "Khalti", "eSewa", "PayPal", "Foodmandu", "NIC ASIA", "Hamrobazar", "Sastodeal", "Lootably"];

export default function LandingPage() {
  return (
    <main>
      {/* ============== TOP NAV ============== */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container flex h-[68px] items-center justify-between text-white">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4" />
            </span>
            blaster<span className="text-sun-300">.</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#how" className="opacity-90 hover:opacity-100">How it works</a>
            <a href="#ways" className="opacity-90 hover:opacity-100">Ways to earn</a>
            <Link href="/leaderboard" className="opacity-90 hover:opacity-100">Leaderboard</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/sign-in" className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
              Sign in
            </Link>
            <Link href="/auth/sign-in" className="btn-primary btn-sm hidden sm:inline-flex">
              GET STARTED
            </Link>
          </div>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-hero pt-[68px] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen [background-image:radial-gradient(1200px_500px_at_20%_-10%,white,transparent),radial-gradient(800px_400px_at_90%_10%,#fbbf24,transparent)]" />
        <div className="container relative grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">
                <span className="inline-flex items-center gap-1">
                  <Play className="h-3 w-3 fill-white" /> Google Play <span className="text-sun-300">★</span> 4.7
                </span>
                <span className="opacity-50">·</span>
                <span>App Store <span className="text-sun-300">★</span> 4.5</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
                Make Money
                <br /> Online
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-base text-white/85 md:text-lg">
                Get paid for testing apps, playing games, watching videos and finishing surveys —
                cashing out via <b>eSewa</b>, <b>Khalti</b> or <b>PayPal</b>.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/auth/sign-in" className="btn-primary">
                  Start earning now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#how" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/15">
                  How it works
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex items-center gap-5 text-sm text-white/85">
                <div className="flex -space-x-2">
                  {["1", "2", "3", "4"].map((s) => (
                    <img
                      key={s}
                      src={`https://api.dicebear.com/9.x/thumbs/svg?seed=blaster${s}&radius=50`}
                      className="h-8 w-8 rounded-full ring-2 ring-brand-700"
                      alt=""
                    />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    <NumberTicker value={200000} duration={1.6} className="" />+ earners
                  </div>
                  <div className="text-xs text-white/70">paid out ₨ <NumberTicker value={12480000} duration={1.8} /> last month</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Floating offer cards */}
          <div className="relative mx-auto grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-3">
            {offers.map((o, i) => (
              <motion.div
                key={o.brand}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 220, damping: 22 }}
                whileHover={{ y: -6, rotate: 0 }}
                className={`card relative !rounded-3xl !bg-white p-5 text-ink ${i === 1 ? "sm:translate-y-6" : ""}`}
              >
                <div className={`grid h-11 w-11 place-items-center rounded-2xl text-2xl ${o.bg}`}>{o.emoji}</div>
                <div className="mt-3 text-base font-bold">{o.brand}</div>
                <div className="text-xs text-ink-muted">{o.action}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-extrabold text-leaf-600">{o.reward}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-muted">
                    <Star className="h-3 w-3 fill-sun-400 stroke-sun-400" /> {o.rating}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* floating bubbles */}
            <motion.div
              aria-hidden
              className="absolute -left-8 top-2 hidden h-20 w-20 rounded-full bg-sun-300/40 blur-2xl sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              aria-hidden
              className="absolute -right-6 bottom-0 hidden h-24 w-24 rounded-full bg-white/30 blur-2xl sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </div>
        </div>

        {/* wave divider */}
        <svg viewBox="0 0 1440 80" className="absolute -bottom-px left-0 w-full text-surface-soft" preserveAspectRatio="none">
          <path d="M0 60 C 240 0 480 100 720 60 C 960 20 1200 80 1440 30 L 1440 80 L 0 80 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ============== PARTNERS MARQUEE ============== */}
      <section className="bg-surface-soft py-10">
        <Marquee className="text-ink-muted">
          {partners.map((p) => (
            <span key={p} className="mx-8 inline-flex items-center gap-2 font-display text-lg font-bold opacity-70">
              <Sparkles className="h-4 w-4 text-brand-500" /> {p}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ============== WAYS / CATEGORIES ============== */}
      <section id="ways" className="py-20">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="pill">Six ways to earn</span>
            <h2 className="h-display mt-4 text-3xl md:text-5xl">The best ways to make money</h2>
            <p className="mt-4 text-base text-ink-muted">
              A trusted platform where Nepalis earn by playing games, testing apps, completing paid surveys and doing flexible online tasks worldwide.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ways.map((w) => (
              <StaggerItem key={w.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-br ${w.bg} p-7 shadow-card transition-shadow hover:shadow-cardHover`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${w.iconBg}`}>
                    <w.Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-xl font-extrabold text-ink">{w.title}</div>
                  <p className="mt-2 text-sm text-ink-muted">{w.description}</p>
                  <div className="mt-5 rounded-2xl bg-white/70 p-4 ring-1 ring-line/80 backdrop-blur">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{w.label}</div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-600">{w.range}</div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink group-hover:text-brand-700">
                    {w.cta} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section id="how" className="bg-white py-20">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="pill-leaf">3 simple steps</span>
            <h2 className="h-display mt-4 text-3xl md:text-5xl">Earn real cash with simple tasks</h2>
            <p className="mt-3 text-base text-ink-muted">
              <b>500K+</b> Google Play & App Store downloads · <b>5K+</b> positive reviews
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-b ${s.accent} p-8`}
                >
                  <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full ${s.badge} opacity-10`} />
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${s.badge} text-lg font-extrabold`}>
                    {s.n}
                  </div>
                  <div className="mt-5 font-display text-2xl font-extrabold text-ink">{s.title}</div>
                  <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* stats strip */}
          <div className="mt-16 grid gap-5 rounded-4xl border border-line bg-surface-soft p-8 md:grid-cols-4">
            {[
              { v: 1248321, prefix: "₨ ", label: "Total payouts" },
              { v: 28710, label: "Active earners" },
              { v: 1024500, label: "Tasks completed" },
              { v: 99.4, label: "On-time payouts %", suffix: "%" }
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                  {s.prefix}
                  <NumberTicker value={s.v as number} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PAYOUT METHODS ============== */}
      <section className="py-20">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <span className="pill-sun">Withdraw in 24 hours</span>
            <h2 className="h-display mt-4 text-3xl md:text-5xl">Earn real cash online with simple tasks</h2>
            <p className="mt-4 text-base text-ink-muted">
              Cash out instantly via the methods Nepalis already use. ₨ 100 minimum withdrawal — no hidden fees.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                "Instant eSewa & Khalti payouts",
                "PayPal supported worldwide",
                "Anti-fraud + manual review on jobs",
                "5% lifetime referral commission"
              ].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-leaf-500" />
                  <span className="text-ink">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <Link href="/wallet" className="btn-success">
                See payout methods <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-4xl border border-line bg-white p-8 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 font-display text-xl font-extrabold text-brand-600">3</span>
                <div>
                  <div className="font-display text-xl font-extrabold">Get Paid Instantly</div>
                  <div className="text-xs text-ink-muted">Choose your preferred wallet</div>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3">
                {["eSewa", "Khalti", "PayPal", "IME Pay", "NIC Bank", "Visa"].map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 240, damping: 22 }}
                    whileHover={{ y: -3 }}
                    className="flex h-16 items-center justify-center rounded-2xl border border-line bg-surface-soft text-sm font-bold text-ink"
                  >
                    {m}
                  </motion.div>
                ))}

                <div className="absolute -right-3 -top-3 rounded-full bg-leaf-500 px-3 py-1 text-xs font-extrabold text-white shadow-leaf">
                  +₨ 1,250
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface-soft p-4">
                <ShieldCheck className="h-5 w-5 text-brand-600" />
                <div>
                  <div className="text-sm font-bold">Bank-grade security</div>
                  <div className="text-xs text-ink-muted">256-bit encryption · 2FA · KYC verified payouts</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== FINAL CTA BAND ============== */}
      <section className="bg-hero">
        <div className="container py-16 text-center text-white">
          <h2 className="h-display !text-white text-3xl md:text-5xl">Make money online from home</h2>
          <p className="mt-3 text-white/80">Join 200,000+ Nepalis already earning daily. No fees. No catch.</p>
          <div className="mt-7">
            <Link href="/auth/sign-in" className="btn-primary">
              Start earning now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
