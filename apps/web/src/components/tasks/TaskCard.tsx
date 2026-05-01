"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, Flame } from "lucide-react";
import type { Task } from "@/lib/mock";
import { categories } from "@/lib/mock";
import { TiltCard } from "@/components/anim/TiltCard";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { cn } from "@/lib/cn";

const difficultyColor: Record<Task["difficulty"], string> = {
  easy: "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20",
  medium: "text-amber-300 bg-amber-400/10 ring-amber-400/20",
  hard: "text-rose-300 bg-rose-400/10 ring-rose-400/20"
};

export function TaskCard({ task }: { task: Task }) {
  const cat = categories.find((c) => c.key === task.category)!;
  const Icon = cat.icon;

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <TiltCard className="card group relative h-full overflow-hidden p-5" intensity={5}>
        <div className="flex items-start justify-between gap-3">
          <div className={cn("grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-white/15", cat.color)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ring-1", difficultyColor[task.difficulty])}>
            {task.difficulty}
          </span>
        </div>

        <h4 className="mt-4 line-clamp-2 font-display text-base font-semibold leading-snug">{task.title}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{task.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {task.durationMin} min</span>
            <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {task.slotsLeft} left</span>
          </div>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="font-display text-base font-semibold text-brand-200"
          >
            +<NumberTicker value={task.rewardPoints} suffix=" pts" />
          </motion.div>
        </div>

        <span className="pointer-events-none absolute right-4 top-4 opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-zinc-300" />
        </span>
      </TiltCard>
    </Link>
  );
}
