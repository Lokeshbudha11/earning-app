"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search } from "lucide-react";
import { categories, tasks } from "@/lib/mock";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Reveal } from "@/components/anim/Reveal";
import { cn } from "@/lib/cn";

const allCats = ["all", ...categories.map((c) => c.key)] as const;

export default function TasksPage() {
  const [active, setActive] = useState<(typeof allCats)[number]>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (active === "all" ? true : t.category === active))
      .filter((t) =>
        q.trim() === ""
          ? true
          : (t.title + t.description).toLowerCase().includes(q.toLowerCase())
      );
  }, [active, q]);

  return (
    <div className="space-y-8 pb-16">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Earn from tasks</h1>
            <p className="mt-1 text-zinc-400">Pick a task. Submit proof. Get paid in points.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tasks…"
              className="input pl-9"
            />
          </div>
        </div>
      </Reveal>

      <LayoutGroup id="cat-pills">
        <div className="card flex flex-wrap items-center gap-1 p-1">
          {allCats.map((c) => {
            const meta = categories.find((cat) => cat.key === c);
            const label = c === "all" ? "All" : meta?.label;
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "relative z-10 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <TaskCard task={t} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="card col-span-full grid place-items-center p-10 text-zinc-400">
            No tasks match. Try a different filter.
          </div>
        )}
      </div>
    </div>
  );
}
