"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, Flame } from "lucide-react";
import type { Task } from "@/lib/mock";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { cn } from "@/lib/cn";

const difficultyColor: Record<Task["difficulty"], string> = {
  easy: "bg-leaf-50 text-leaf-700 ring-1 ring-leaf-100",
  medium: "bg-sun-50 text-sun-700 ring-1 ring-sun-100",
  hard: "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
};

const catColor: Record<Task["category"], { bg: string; tint: string; emoji: string }> = {
  microtask: { bg: "bg-brand-500", tint: "from-brand-50 to-white", emoji: "📋" },
  video: { bg: "bg-rose-500", tint: "from-rose-50 to-white", emoji: "🎬" },
  offerwall: { bg: "bg-sun-500", tint: "from-sun-50 to-white", emoji: "🎁" },
  job: { bg: "bg-leaf-500", tint: "from-leaf-50 to-white", emoji: "💼" }
};

export function TaskCard({ task }: { task: Task }) {
  const c = catColor[task.category];

  return (
    <Link href={`/tasks/${task.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cn("card group relative h-full overflow-hidden p-5 bg-gradient-to-br", c.tint)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className={cn("grid h-11 w-11 place-items-center rounded-2xl text-xl text-white", c.bg)}>{c.emoji}</div>
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", difficultyColor[task.difficulty])}>
            {task.difficulty}
          </span>
        </div>

        <h4 className="mt-4 line-clamp-2 font-display text-base font-extrabold leading-snug text-ink">{task.title}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{task.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {task.durationMin} min</span>
            <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {task.slotsLeft} left</span>
          </div>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="font-display text-base font-extrabold text-brand-600"
          >
            +<NumberTicker value={task.rewardPoints} suffix=" pts" />
          </motion.div>
        </div>

        <span className="pointer-events-none absolute right-4 top-4 opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-brand-500" />
        </span>
      </motion.div>
    </Link>
  );
}
