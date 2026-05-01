"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, Zap, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, me } from "@/lib/mock";
import { cn } from "@/lib/cn";
import { NumberTicker } from "@/components/anim/NumberTicker";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-white/85 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-b border-line shadow-card" : "border-b border-transparent"
        )}
      />
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-button"
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 14 }}
          >
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </motion.span>
          <span>blaster<span className="text-brand-500">.</span></span>
        </Link>

        <nav className="relative hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "text-brand-700" : "text-ink-muted hover:text-ink"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-50 ring-1 ring-brand-100"
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
          <div className="hidden items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf-500 shadow-[0_0_10px] shadow-leaf-400" />
            <NumberTicker value={me.pointsBalance} className="font-bold text-ink" />
            <span className="text-ink-muted">pts</span>
          </div>
          <button className="hidden h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-line/40 hover:text-ink sm:inline-flex" aria-label="Language">
            <Globe className="h-4 w-4" />
          </button>
          <button className="hidden h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-line/40 hover:text-ink sm:inline-flex" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/profile" className="hidden h-9 w-9 overflow-hidden rounded-full ring-2 ring-brand-100 sm:block">
            <img src={me.avatar} alt="" className="h-full w-full" />
          </Link>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-line/40 hover:text-ink md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
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
            className="overflow-hidden border-b border-line bg-white md:hidden"
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
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold",
                      active ? "bg-brand-50 text-brand-700" : "text-ink-muted hover:bg-line/40"
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
