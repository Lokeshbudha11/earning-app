"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { navItems, me } from "@/lib/mock";
import { cn } from "@/lib/cn";
import { NumberTicker } from "@/components/anim/NumberTicker";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="absolute inset-0 -z-10 bg-bg/60 backdrop-blur-xl border-b border-white/5" />
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-lg font-semibold">
          <motion.span
            className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 ring-glow"
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 14 }}
          >
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            <span className="pointer-events-none absolute inset-0 animate-pulseGlow rounded-xl" />
          </motion.span>
          <span className="text-gradient bg-[length:200%_100%] animate-gradientShift">Blaster</span>
        </Link>

        <nav className="relative hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60" />
            <NumberTicker value={me.pointsBalance} className="font-medium text-white" />
            <span className="text-zinc-400">pts</span>
          </div>
          <button className="btn-ghost h-9 w-9 !p-0" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/profile" className="hidden h-9 w-9 overflow-hidden rounded-xl ring-1 ring-white/10 sm:block">
            <img src={me.avatar} alt="" className="h-full w-full" />
          </Link>
          <button className="btn-ghost h-9 w-9 !p-0 md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/5 bg-bg/90 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-1 py-3">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      active ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
