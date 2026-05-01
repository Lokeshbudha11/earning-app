"use client";

import { ChevronRight, Coins, Flame, ListChecks, Sparkles, Trophy, Wallet as WalletIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/anim/Reveal";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { ProgressRing } from "@/components/anim/ProgressRing";
import { transactions, tasks, me } from "@/lib/mock";
import { TaskCard } from "@/components/tasks/TaskCard";
import { ActivityFeed } from "@/components/wallet/ActivityFeed";

const stats = [
  { label: "Total Points", value: me.pointsBalance, Icon: Coins, tone: "from-brand-100 to-brand-50", iconBg: "bg-brand-500" },
  { label: "Cash Balance", value: me.cashBalance, prefix: "₨ ", Icon: WalletIcon, tone: "from-leaf-100 to-leaf-50", iconBg: "bg-leaf-500" },
  { label: "Tasks Completed", value: 137, Icon: ListChecks, tone: "from-sun-100 to-sun-50", iconBg: "bg-sun-500" },
  { label: "Daily Streak", value: me.streak, suffix: " days", Icon: Trophy, tone: "from-rose-100 to-rose-50", iconBg: "bg-rose-500" }
];

export default function DashboardPage() {
  const trending = tasks.slice(0, 4);

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome strip */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-ink-muted">Welcome back,</div>
            <h1 className="h-display text-3xl sm:text-4xl">{me.name.split(" ")[0]} 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="card flex items-center gap-3 px-4 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50 text-rose-500">
                <Flame className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Daily streak</div>
                <div className="font-display text-lg font-extrabold text-ink">
                  <NumberTicker value={me.streak} suffix=" days" />
                </div>
              </div>
            </div>
            <Link href="/tasks" className="btn-violet btn-sm hidden sm:inline-flex">
              Find a task <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Stat cards */}
      <StaggerGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`card h-full overflow-hidden bg-gradient-to-br ${s.tone} p-5`}
            >
              <div className={`mb-4 grid h-10 w-10 place-items-center rounded-2xl text-white ${s.iconBg}`}>
                <s.Icon className="h-5 w-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Hero card with progress */}
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl bg-hero p-7 text-white sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(900px_500px_at_70%_-20%,white,transparent)]" />
          <div className="relative grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
            <ProgressRing value={me.streak / 30} size={140} stroke={10}>
              <div className="text-center">
                <div className="font-display text-2xl font-extrabold text-white">{me.streak}/30</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">streak</div>
              </div>
            </ProgressRing>
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-sun-300" /> Premium · 2× earn rate active
              </span>
              <h2 className="h-display !text-white text-2xl sm:text-3xl">
                {30 - me.streak} more days for the Diamond bonus.
              </h2>
              <p className="max-w-xl text-white/85">
                Complete at least one task daily. Miss a day and the multiplier resets.
              </p>
              <div className="pt-2">
                <Link href="/tasks" className="btn-primary">
                  Find a task <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Trending tasks + recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-end justify-between">
            <h3 className="h-display text-xl">Trending tasks</h3>
            <Link href="/tasks" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all →
            </Link>
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
            <h3 className="h-display text-xl">Activity</h3>
            <Link href="/wallet" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Wallet →
            </Link>
          </div>
          <ActivityFeed items={transactions.slice(0, 6)} />
        </div>
      </div>
    </div>
  );
}
