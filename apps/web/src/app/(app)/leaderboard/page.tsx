"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Flame } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { TiltCard } from "@/components/anim/TiltCard";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { leaderboard, type LeaderRow } from "@/lib/mock";
import { cn } from "@/lib/cn";

const tierColor: Record<LeaderRow["tier"], string> = {
  Diamond: "from-cyan-400 to-sky-600",
  Gold: "from-amber-300 to-amber-600",
  Silver: "from-zinc-300 to-zinc-500",
  Bronze: "from-orange-400 to-orange-700"
};

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderRow[]>([...leaderboard].sort((a, b) => b.points - a.points));

  // Periodically shuffle scores to demo FLIP rank changes
  useEffect(() => {
    const id = setInterval(() => {
      setRows((curr) => {
        const next = curr.map((r) => ({ ...r, points: r.points + Math.floor((Math.random() - 0.4) * 4000) }));
        return next.sort((a, b) => b.points - a.points);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="space-y-10 pb-16">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Weekly leaderboard</h1>
            <p className="mt-1 text-zinc-400">Top earners this week. Updates live.</p>
          </div>
          <div className="card flex items-center gap-2 px-3 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70" />
            Live
          </div>
        </div>
      </Reveal>

      {/* Podium */}
      <div className="grid items-end gap-4 sm:grid-cols-3">
        {[1, 0, 2].map((podiumIdx) => {
          const r = top3[podiumIdx];
          if (!r) return null;
          const place = podiumIdx + 1;
          const heights = ["h-44", "h-56", "h-36"];
          return (
            <motion.div
              key={r.id}
              layout
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <TiltCard className={cn("card relative overflow-hidden p-5 text-center", heights[place - 1])} intensity={4}>
                <div className="absolute inset-0 bg-mesh opacity-50" />
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <img src={r.avatar} alt="" className="h-16 w-16 rounded-2xl ring-2 ring-white/20" />
                    {place === 1 && (
                      <Crown className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 text-amber-300 drop-shadow-[0_0_12px_rgba(255,209,102,0.6)]" />
                    )}
                  </div>
                  <div className="mt-3 font-display text-base font-semibold">{r.name}</div>
                  <div className="mt-1 text-xs text-zinc-400">#{place}</div>
                  <div className="mt-2 font-display text-2xl font-semibold">
                    <NumberTicker value={r.points} suffix=" pts" />
                  </div>
                  <div className={cn("mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white", tierColor[r.tier])}>
                    <Trophy className="h-3 w-3" /> {r.tier}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-[64px,1fr,140px,120px,80px] gap-2 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-wider text-zinc-400">
          <div>Rank</div>
          <div>User</div>
          <div className="text-right">Points</div>
          <div className="text-right">Streak</div>
          <div className="text-right">Tier</div>
        </div>
        <AnimatePresence initial={false}>
          {rest.map((r, idx) => {
            const rank = idx + 4;
            return (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="grid grid-cols-[64px,1fr,140px,120px,80px] items-center gap-2 px-4 py-3 hover:bg-white/[0.03]"
              >
                <div className="font-display text-base text-zinc-300">#{rank}</div>
                <div className="flex items-center gap-3 min-w-0">
                  <img src={r.avatar} alt="" className="h-9 w-9 rounded-xl ring-1 ring-white/10" />
                  <div className="truncate text-sm">{r.name}</div>
                </div>
                <motion.div
                  key={r.points}
                  initial={{ scale: 0.95, color: "#aa6cff" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.4 }}
                  className="text-right font-display text-sm font-semibold"
                >
                  {r.points.toLocaleString()}
                </motion.div>
                <div className="flex items-center justify-end gap-1 text-sm text-rose-200">
                  <Flame className="h-4 w-4" /> {r.streak}
                </div>
                <div className="text-right">
                  <span className={cn("rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] uppercase tracking-wider text-white", tierColor[r.tier])}>
                    {r.tier}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
