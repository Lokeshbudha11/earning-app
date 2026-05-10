"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { label: "Intelligence", href: "#intelligence" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Story", href: "#story" },
  { label: "Map", href: "#map" },
  { label: "Programs", href: "#programs" },
  { label: "Media", href: "#media" },
  { label: "Team", href: "#team" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-cine">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500",
            scrolled
              ? "glass-strong holo-border shadow-glass"
              : "bg-transparent"
          )}
        >
          <Link href="/" className="group flex items-center gap-3 pl-2">
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-neon via-electric to-gold opacity-80 blur-md transition group-hover:opacity-100" />
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-ink-900/80 text-[11px] font-bold tracking-widest text-neon">
                DN
              </span>
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-wide">
                DAS Nepal
              </div>
              <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Digital Agri System
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100 bg-white/5" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#contact"
              className="hidden md:inline-flex btn-cine bg-neon text-ink-900 hover:shadow-glow"
            >
              <span>Join the Network</span>
              <span className="text-base leading-none">→</span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 right-0 top-0 h-px bg-white transition",
                    open && "translate-y-[6px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 right-0 top-1/2 h-px bg-white transition",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-px bg-white transition",
                    open && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden mt-3 grid gap-1 rounded-3xl glass-strong p-3 holo-border"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-neon px-4 py-3 text-sm font-semibold text-ink-900"
              >
                Join the Innovation Network →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
