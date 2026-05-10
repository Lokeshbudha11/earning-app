"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { mediaItems } from "@/data/site";
import { SectionLabel, Eyebrow } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

export function Media() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="media" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="07" title="Media Experience" accent="electric" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Cinematic Nepal,{" "}
              <span className="text-gradient-emerald">told differently</span>.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            A curated theatre of drone documentaries, climate research and
            farmer-first stories — pulled directly from the field.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-2">
          {["All", "Documentaries", "Drone", "Climate", "Cooperative", "Tech"].map(
            (t, i) => (
              <span
                key={t}
                className={
                  i === 0
                    ? "rounded-full border border-neon/40 bg-neon/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-neon"
                    : "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/50"
                }
              >
                {t}
              </span>
            )
          )}
          <div className="ml-auto hidden md:block">
            <Eyebrow>Updated weekly</Eyebrow>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mediaItems.map((m, i) => (
            <motion.button
              key={m.title}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group/m text-left"
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500",
                  "aspect-[16/10]"
                )}
              >
                {/* Cinematic gradient backdrop */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-90 transition-transform duration-700 group-hover/m:scale-[1.06]",
                    m.color
                  )}
                />
                {/* Animated scanlines + grid */}
                <div className="absolute inset-0 grid-bg opacity-40 mix-blend-screen" />
                <div className="absolute inset-0 scanline opacity-30 mix-blend-screen" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* "Frames" hover preview - simulated with sliding rectangles */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500",
                    hover === i && "opacity-100"
                  )}
                >
                  <FilmFrames seed={i} />
                </div>

                {/* Top row */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                    {m.category}
                  </span>
                  <span className="rounded-full border border-white/30 bg-black/30 px-2 py-0.5 text-[10px] tracking-[0.16em] text-white/85 backdrop-blur">
                    {m.duration}
                  </span>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition group-hover/m:scale-110">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7L8 5Z" />
                    </svg>
                  </span>
                </div>

                {/* Bottom row */}
                <div className="absolute inset-x-4 bottom-4">
                  <div className="font-display text-lg font-semibold text-white">
                    {m.title}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-white/75">
                    {m.blurb}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilmFrames({ seed }: { seed: number }) {
  const frames = Array.from({ length: 5 }).map((_, i) => i);
  return (
    <div className="grid w-full grid-cols-5 gap-2 px-3">
      {frames.map((i) => (
        <motion.div
          key={i}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="aspect-[4/3] overflow-hidden rounded-md border border-white/30 bg-black/40 backdrop-blur-sm"
        >
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(${(i * 47 + seed * 13) % 360}deg, rgba(141,255,138,0.4), rgba(0,209,255,0.4) 50%, rgba(217,184,108,0.4))`,
              opacity: 0.7
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
