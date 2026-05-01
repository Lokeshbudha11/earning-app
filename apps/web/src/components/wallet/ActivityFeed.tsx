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
  completed: "bg-leaf-50 text-leaf-700 ring-1 ring-leaf-100",
  pending: "bg-sun-50 text-sun-700 ring-1 ring-sun-100",
  failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
};

export function ActivityFeed({ items }: { items: Tx[] }) {
  return (
    <div className="card overflow-hidden divide-y divide-line">
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
            className="flex items-center gap-3 px-4 py-3.5"
          >
            <div className={cn(
              "grid h-10 w-10 place-items-center rounded-2xl",
              isOut ? "bg-rose-50 text-rose-600" : "bg-leaf-50 text-leaf-600"
            )}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-ink">{tx.ref}</div>
              <div className="text-xs text-ink-muted">{timeAgo(tx.at)}</div>
            </div>
            <div className="text-right">
              <div className={cn("font-display text-sm font-extrabold", isOut ? "text-rose-600" : "text-leaf-600")}>
                {isOut ? "−" : "+"}
                {tx.unit === "points" ? formatPoints(tx.amount) + " pts" : formatNPR(tx.amount)}
              </div>
              <div className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", statusColor[tx.status])}>
                {tx.status}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
