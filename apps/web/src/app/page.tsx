import Link from "next/link";
import { ArrowRight, ChevronRight, Gift, ListChecks, Shield, Sparkles, TrendingUp, Users, Video, Wallet, Zap } from "lucide-react";
import { AuroraBackground } from "@/components/anim/AuroraBackground";
import { CoinParticles } from "@/components/anim/CoinParticles";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/anim/Reveal";
import { Marquee } from "@/components/anim/Marquee";
import { TiltCard } from "@/components/anim/TiltCard";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { MagneticButton } from "@/components/anim/MagneticButton";

const features = [
  { icon: ListChecks, title: "Microtasks", desc: "Surveys, app installs, sign-ups, reviews — credited on approval.", accent: "from-brand-400 to-brand-600" },
  { icon: Video, title: "Video ads", desc: "Watch 15–30s ads to earn instant points with daily limits.", accent: "from-rose-400 to-rose-600" },
  { icon: Gift, title: "Offerwall", desc: "Lootably, Adscend, CPX Research with real-time postbacks.", accent: "from-amber-400 to-amber-600" },
  { icon: Wallet, title: "Wallet & payouts", desc: "Withdraw via eSewa, Khalti, or PayPal in 24 hours.", accent: "from-emerald-400 to-emerald-600" },
  { icon: Shield, title: "Anti-fraud", desc: "Auto + manual verification. Slot limits and proof checks.", accent: "from-sky-400 to-sky-600" },
  { icon: Users, title: "Referrals", desc: "Earn commission on every friend you invite — forever.", accent: "from-fuchsia-400 to-fuchsia-600" }
];

const partners = ["AdColony", "Unity Ads", "Lootably", "Adscend", "CPX Research", "Google AdSense", "eSewa", "Khalti", "PayPal"];

export default function LandingPage() {
  return (
    <main className="relative overflow-x-clip">
      <AuroraBackground />
      <CoinParticles count={18} />

      {/* Hero */}
      <section className="container relative pt-24 pb-28 sm:pt-32 sm:pb-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="gradient-border mx-auto inline-flex items-center gap-2 rounded-full bg-bg/60 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-brand-200" /> New in Nepal · earn in NPR or USD
          </span>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <h1 className="mx-auto max-w-4xl text-balance text-center font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Get paid for the
            <span className="text-gradient bg-[length:200%_100%] animate-gradientShift"> tiny things </span>
            you already do online.
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-6">
          <p className="mx-auto max-w-2xl text-center text-base text-zinc-300 sm:text-lg">
            Complete microtasks, watch a few ads, finish offerwall deals, or pick up freelance gigs.
            Withdraw your earnings to <span className="text-white">eSewa</span>,{" "}
            <span className="text-white">Khalti</span>, or <span className="text-white">PayPal</span> in 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard">
              <MagneticButton className="px-6 py-3 text-base">
                Start earning <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link href="/tasks" className="btn-ghost px-5 py-3 text-base">
              Browse tasks <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-6">
          {[
            { label: "Total payouts", value: 1248321, prefix: "₨ " },
            { label: "Active earners", value: 28710 },
            { label: "Tasks completed", value: 1024500 }
          ].map((s) => (
            <StaggerItem key={s.label} className="card relative overflow-hidden p-5 text-center">
              <div className="font-display text-2xl font-semibold sm:text-3xl">
                <NumberTicker value={s.value} prefix={s.prefix} />
              </div>
              <div className="mt-1 text-xs text-zinc-400 sm:text-sm">{s.label}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Partners marquee */}
      <section className="border-y border-white/5 bg-bg-soft/40">
        <Marquee className="py-5" speed="35s">
          {partners.map((p) => (
            <span key={p} className="inline-flex items-center gap-3 text-zinc-400">
              <Zap className="h-4 w-4 text-brand-300" />
              <span className="font-display text-sm">{p}</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Features */}
      <section className="container py-24">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Five ways to earn. One wallet.</h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            Choose how you want to stack rewards — they all flow into the same Blaster balance.
          </p>
        </Reveal>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <TiltCard className="card group relative h-full overflow-hidden p-6 noise">
                <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${f.accent} ring-1 ring-white/15 shadow-glow`}>
                  <f.icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm text-brand-200 opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Earn live preview */}
      <section className="container py-12">
        <Reveal>
          <TiltCard className="card relative overflow-hidden p-8 sm:p-12" intensity={4}>
            <div className="absolute inset-0 bg-mesh opacity-60" />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-300" /> Premium · 2× earn rate
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                  Hit your weekly streak. Stack the multiplier.
                </h3>
                <p className="mt-3 max-w-md text-zinc-300">
                  Daily streaks unlock bonus point multipliers on top of every task you finish — survey, ad, gig, or all three.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link href="/dashboard" className="btn-primary px-5 py-2.5">
                    Open dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/leaderboard" className="btn-ghost px-5 py-2.5">
                    See leaderboard
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="card relative overflow-hidden p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-zinc-400">Today's earnings</div>
                    <span className="text-xs text-emerald-300">+18%</span>
                  </div>
                  <div className="mt-2 font-display text-4xl font-semibold">
                    <NumberTicker value={6420} suffix=" pts" />
                  </div>
                  <div className="mt-6 grid grid-cols-7 items-end gap-2 h-24">
                    {[28, 42, 30, 60, 45, 80, 64].map((v, i) => (
                      <div
                        key={i}
                        className="rounded-t-md bg-gradient-to-t from-brand-600 to-brand-300"
                        style={{
                          height: `${v}%`,
                          animation: `pulseGlow 2.4s ease-out ${i * 0.15}s infinite`
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-7 text-center text-[10px] uppercase tracking-wider text-zinc-500">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </section>

      <section className="container py-24">
        <Reveal className="card relative overflow-hidden p-10 text-center sm:p-16">
          <CoinParticles count={10} />
          <h3 className="relative font-display text-3xl font-semibold sm:text-4xl">Ready when you are.</h3>
          <p className="relative mx-auto mt-3 max-w-xl text-zinc-300">
            Sign up, complete your first microtask in under 5 minutes, and watch the points roll in.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Link href="/auth/sign-in">
              <MagneticButton className="px-7 py-3 text-base">
                Create my account <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
