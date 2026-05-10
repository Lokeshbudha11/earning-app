"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { programs } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

export function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programs" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="06" title="Programs & Initiatives" accent="gold" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              National <span className="text-gradient-emerald">programs</span>{" "}
              shaping Nepal&apos;s future.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Six cross-disciplinary programs uniting public, private and rural
            partners — engineered to scale across geography, language and
            generation.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-2">
            {programs.map((p, i) => {
              const accent =
                p.accent === "electric"
                  ? "#00D1FF"
                  : p.accent === "gold"
                    ? "#D9B86C"
                    : "#8DFF8A";
              return (
                <button
                  key={p.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  type="button"
                  className={cn(
                    "group/p w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-left transition-all duration-300",
                    active === i
                      ? "bg-white/[0.05] shadow-[0_0_60px_-30px_rgba(141,255,138,0.4)]"
                      : "hover:bg-white/[0.04]"
                  )}
                  style={{
                    borderColor:
                      active === i ? `${accent}55` : "rgba(255,255,255,0.06)"
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div
                        className="text-mono text-[10px] uppercase tracking-[0.24em]"
                        style={{ color: `${accent}cc` }}
                      >
                        Program · 0{i + 1}
                      </div>
                      <div className="mt-1 font-display text-xl text-white">
                        {p.title}
                      </div>
                      <div className="mt-1 text-sm text-white/55">
                        {p.tagline}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
                        active === i
                          ? "border-white/40 bg-white/10"
                          : "border-white/10 bg-white/0"
                      )}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <ProgramShow program={programs[active]} index={active} />
        </div>
      </div>
    </section>
  );
}

function ProgramShow({
  program,
  index
}: {
  program: (typeof programs)[number];
  index: number;
}) {
  const accent =
    program.accent === "electric"
      ? "#00D1FF"
      : program.accent === "gold"
        ? "#D9B86C"
        : "#8DFF8A";

  return (
    <div className="relative overflow-hidden rounded-[28px] glass-strong holo-border p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${accent}22, transparent 60%)`
        }}
      />
      <motion.div
        key={program.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: accent }}
          >
            Program 0{index + 1}
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60">
            {program.metric}
          </span>
        </div>
        <h3 className="heading-display mt-6 text-3xl text-white sm:text-4xl">
          {program.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
          {program.description}
        </p>

        {/* Decorative animated visual: orbital rings + glyphs */}
        <div className="relative mt-10 h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id={`glow-${index}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="360" fill={`url(#glow-${index})`} />
            {[60, 110, 160, 210].map((r, i) => (
              <ellipse
                key={r}
                cx="300"
                cy="180"
                rx={r * 1.5}
                ry={r}
                fill="none"
                stroke={accent}
                strokeOpacity={0.2 + i * 0.08}
                strokeDasharray="3 6"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`${i * 18} 300 180`}
                  to={`${i * 18 + 360} 300 180`}
                  dur={`${20 + i * 6}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
            ))}
            <circle cx="300" cy="180" r="14" fill={accent} />
            <circle cx="300" cy="180" r="34" fill="none" stroke={accent} strokeOpacity="0.5" />
            {[
              { x: 90, y: 90, t: "Drones" },
              { x: 510, y: 90, t: "Satellites" },
              { x: 90, y: 270, t: "Cooperatives" },
              { x: 510, y: 270, t: "Research" },
              { x: 300, y: 60, t: "Cabinet" },
              { x: 300, y: 300, t: "Farmers" }
            ].map((n, i) => (
              <g key={i}>
                <line
                  x1="300"
                  y1="180"
                  x2={n.x}
                  y2={n.y}
                  stroke={accent}
                  strokeOpacity="0.35"
                />
                <circle cx={n.x} cy={n.y} r="5" fill={accent} />
                <text
                  x={n.x}
                  y={n.y - 12}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  className="font-mono uppercase"
                >
                  {n.t}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
