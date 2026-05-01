"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Gift, Users } from "lucide-react";
import { type Tx } from "@/lib/mock";
import { timeAgo, formatPoints, formatNPR } from "@/lib/format";
import { cn } from "@/lib/cn";

const kindIcon = {
  earn: ArrowDownLeft,
  withdraw: ArrowUpRight,
  bonus: Gift,
  referral: Users
} as const;

const statusColor: Record<Tx["status"], string> = {
  completed: "text-emerald-300 bg-emerald-400/10",
  pending: "text-amber-300 bg-amber-400/10",
  failed: "text-rose-300 bg-rose-400/10"
};

export function ActivityFeed({ items }: { items: Tx[] }) {
  return (
    <div className="card divide-y divide-white/5">
      {items.map((tx, i) => {
        const Icon = kindIcon[tx.kind];
        const isOut = tx.kind === "withdraw";
        return (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div className={cn(
              "grid h-9 w-9 place-items-center rounded-xl ring-1 ring-white/10",
              isOut ? "bg-rose-500/15 text-rose-300" : "bg-emerald-500/15 text-emerald-300"
            )}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{tx.ref}</div>
              <div className="text-xs text-zinc-500">{timeAgo(tx.at)}</div>
            </div>
            <div className="text-right">
              <div className={cn("font-display text-sm font-semibold", isOut ? "text-rose-300" : "text-emerald-300")}>
                {isOut ? "−" : "+"}
                {tx.unit === "points" ? formatPoints(tx.amount) + " pts" : formatNPR(tx.amount)}
              </div>
              <div className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] uppercase", statusColor[tx.status])}>
                {tx.status}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
