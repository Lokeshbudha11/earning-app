import { ChevronRight, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/anim/Reveal";
import { TiltCard } from "@/components/anim/TiltCard";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { ProgressRing } from "@/components/anim/ProgressRing";
import { stats, transactions, tasks, me } from "@/lib/mock";
import { TaskCard } from "@/components/tasks/TaskCard";
import { ActivityFeed } from "@/components/wallet/ActivityFeed";
import { CoinParticles } from "@/components/anim/CoinParticles";

export default function DashboardPage() {
  const trending = tasks.slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-zinc-400">Welcome back,</div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{me.name.split(" ")[0]} 👋</h1>
          </div>
          <div className="card flex items-center gap-3 px-4 py-3">
            <Flame className="h-5 w-5 text-rose-300" />
            <div>
              <div className="text-xs text-zinc-400">Daily streak</div>
              <div className="font-display text-lg font-semibold">
                <NumberTicker value={me.streak} suffix=" days" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stat cards */}
      <StaggerGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <TiltCard className="card relative h-full overflow-hidden p-5 noise" intensity={5}>
              <div className={`mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.accent} ring-1 ring-white/15`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Hero card with progress */}
      <Reveal>
        <TiltCard className="card relative overflow-hidden p-6 sm:p-10" intensity={3}>
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <CoinParticles count={6} className="opacity-60" />
          <div className="relative grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
            <ProgressRing value={me.streak / 30} size={140} stroke={10}>
              <div className="text-center">
                <div className="font-display text-2xl font-semibold">{me.streak}/30</div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">streak</div>
              </div>
            </ProgressRing>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Premium · 2× earn rate active
              </div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {30 - me.streak} more days for the Diamond bonus.
              </h2>
              <p className="max-w-xl text-zinc-300">
                Complete at least one task daily. Miss a day and the multiplier resets.
              </p>
              <Link href="/tasks" className="btn-primary px-5 py-2.5">
                Find a task <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* Trending tasks + recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-end justify-between">
            <h3 className="font-display text-xl font-semibold">Trending tasks</h3>
            <Link href="/tasks" className="text-sm text-zinc-400 hover:text-white">View all →</Link>
          </div>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {trending.map((t) => (
              <StaggerItem key={t.id}>
                <TaskCard task={t} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <h3 className="font-display text-xl font-semibold">Activity</h3>
            <Link href="/wallet" className="text-sm text-zinc-400 hover:text-white">Wallet →</Link>
          </div>
          <ActivityFeed items={transactions.slice(0, 6)} />
        </div>
      </div>
    </div>
  );
}
