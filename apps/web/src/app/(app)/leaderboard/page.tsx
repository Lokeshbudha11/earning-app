"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Flame } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { leaderboard, type LeaderRow } from "@/lib/mock";
import { cn } from "@/lib/cn";

const tierColor: Record<LeaderRow["tier"], string> = {
  Diamond: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  Gold: "bg-sun-100 text-sun-700 ring-1 ring-sun-200",
  Silver: "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200",
  Bronze: "bg-amber-100 text-amber-800 ring-1 ring-amber-200"
};

const podiumTone = [
  "from-sun-200 via-sun-50 to-white", // 1st
  "from-zinc-200 via-zinc-50 to-white", // 2nd
  "from-amber-200 via-amber-50 to-white" // 3rd
];

const podiumRing = ["ring-sun-300", "ring-zinc-300", "ring-amber-300"];

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderRow[]>([...leaderboard].sort((a, b) => b.points - a.points));

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
            <span className="pill-sun">Weekly leaderboard</span>
            <h1 className="h-display mt-3 text-3xl sm:text-4xl">Top earners of the week</h1>
            <p className="mt-1 text-ink-muted">Updates live every few seconds. Stay on the streak to climb.</p>
          </div>
          <div className="card flex items-center gap-2 px-3 py-2 text-xs font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-500 shadow-[0_0_8px] shadow-leaf-300" />
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
          const heights = ["h-48", "h-60", "h-40"];
          return (
            <motion.div key={r.id} layout transition={{ type: "spring", stiffness: 240, damping: 24 }}>
              <div
                className={cn(
                  "card relative overflow-hidden p-6 text-center bg-gradient-to-b",
                  heights[place - 1],
                  podiumTone[place - 1]
                )}
              >
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <img src={r.avatar} alt="" className={cn("h-16 w-16 rounded-2xl ring-4", podiumRing[place - 1])} />
                    {place === 1 && (
                      <Crown className="absolute -top-4 left-1/2 h-7 w-7 -translate-x-1/2 text-sun-500 drop-shadow-[0_2px_6px_rgba(245,158,11,0.45)]" />
                    )}
                  </div>
                  <div className="mt-3 font-display text-base font-extrabold text-ink">{r.name}</div>
                  <div className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink-muted">#{place}</div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-ink">
                    <NumberTicker value={r.points} suffix=" pts" />
                  </div>
                  <div className={cn("mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", tierColor[r.tier])}>
                    <Trophy className="h-3 w-3" /> {r.tier}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-[64px,1fr,140px,120px,90px] gap-2 border-b border-line bg-surface-soft px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
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
                className="grid grid-cols-[64px,1fr,140px,120px,90px] items-center gap-2 border-t border-line/70 px-5 py-3 hover:bg-surface-soft"
              >
                <div className="font-display text-base font-extrabold text-ink-muted">#{rank}</div>
                <div className="flex min-w-0 items-center gap-3">
                  <img src={r.avatar} alt="" className="h-9 w-9 rounded-2xl ring-2 ring-line" />
                  <div className="truncate text-sm font-semibold text-ink">{r.name}</div>
                </div>
                <motion.div
                  key={r.points}
                  initial={{ scale: 0.95, color: "#7c3aed" }}
                  animate={{ scale: 1, color: "#0f172a" }}
                  transition={{ duration: 0.45 }}
                  className="text-right font-display text-sm font-extrabold"
                >
                  {r.points.toLocaleString()}
                </motion.div>
                <div className="flex items-center justify-end gap-1 text-sm font-semibold text-rose-500">
                  <Flame className="h-4 w-4" /> {r.streak}
                </div>
                <div className="text-right">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", tierColor[r.tier])}>
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
