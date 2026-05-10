"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const CHAPTERS = [
  {
    title: "Tradition",
    body:
      "For centuries, Nepali farmers have shaped terraces along the Himalaya — feeding a nation through resilience, ritual and rain.",
    accent: "#D9B86C",
    glyph: "tradition"
  },
  {
    title: "Awakening",
    body:
      "Cooperatives, fiber networks and mobile finance light up rural Nepal — connecting growers to data, markets and each other.",
    accent: "#8DFF8A",
    glyph: "awakening"
  },
  {
    title: "Augmentation",
    body:
      "Drones rise above the ridges. Satellites scan a million hectares. Soil sensors whisper across the rivers — a living grid emerges.",
    accent: "#00D1FF",
    glyph: "augmentation"
  },
  {
    title: "Intelligence",
    body:
      "AI orchestrates climate, crop, water and livestock decisions in real time — turning Nepal into a continental research engine.",
    accent: "#B4FFB1",
    glyph: "intelligence"
  }
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const ridgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const fieldsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const droneX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const droneY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const networkOpacity = useTransform(scrollYProgress, [0.2, 0.6, 1], [0, 0.6, 1]);
  const tradeOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.5, 0]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden py-32"
    >
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="04" title="Cinematic Storytelling Scroll" accent="gold" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              From <span className="text-gradient-emerald">terraces</span> to
              <br /> a thinking landscape.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            As you scroll, watch Nepal transform — fields evolve, drones move
            through the valleys, and the national network ignites district by
            district.
          </p>
        </div>
      </div>

      {/* Cinematic stage */}
      <div className="container-cine mt-16">
        <div className="relative h-[140vh] overflow-hidden rounded-[32px] glass-strong holo-border">
          {/* Sky */}
          <motion.div
            style={{ y: skyY }}
            className="absolute inset-x-0 top-0 h-[60%]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 0%, rgba(217,184,108,0.2), transparent 60%), radial-gradient(70% 50% at 60% 30%, rgba(0,209,255,0.18), transparent 60%), linear-gradient(180deg, #07151b 0%, #02080a 60%)"
              }}
            />
            {/* Sun */}
            <div
              className="absolute left-[55%] top-[18%] h-40 w-40 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, #ffd9a3, rgba(217,184,108,0.4) 50%, transparent 80%)",
                filter: "blur(2px)"
              }}
            />
            {/* Stars */}
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${(i * 137) % 100}%`,
                  top: `${(i * 53) % 60}%`,
                  width: i % 7 === 0 ? 2 : 1,
                  height: i % 7 === 0 ? 2 : 1,
                  opacity: 0.5 + (i % 5) * 0.08
                }}
              />
            ))}
          </motion.div>

          {/* Distant ridge */}
          <motion.svg
            viewBox="0 0 1600 400"
            preserveAspectRatio="none"
            style={{ y: ridgeY }}
            className="absolute inset-x-0 top-[40%] h-[28%] w-full"
          >
            <defs>
              <linearGradient id="ridge1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0A2A22" />
                <stop offset="100%" stopColor="#03100C" />
              </linearGradient>
            </defs>
            <path
              d="M0,300 L100,160 L220,240 L340,120 L460,220 L580,140 L720,260 L860,160 L1000,240 L1160,140 L1320,260 L1460,180 L1600,260 L1600,400 L0,400 Z"
              fill="url(#ridge1)"
            />
          </motion.svg>

          {/* Mid ridge with NETWORK */}
          <motion.div
            style={{ y: ridgeY }}
            className="absolute inset-x-0 top-[55%] h-[25%]"
          >
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="ridge2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0E3A2C" />
                  <stop offset="100%" stopColor="#04140F" />
                </linearGradient>
              </defs>
              <path
                d="M0,260 L80,180 L200,220 L320,140 L460,200 L600,160 L780,240 L940,180 L1080,220 L1240,160 L1400,220 L1600,180 L1600,400 L0,400 Z"
                fill="url(#ridge2)"
              />
            </svg>
            {/* Network glowing nodes */}
            <motion.svg
              viewBox="0 0 1600 400"
              preserveAspectRatio="none"
              style={{ opacity: networkOpacity }}
              className="absolute inset-0 h-full w-full"
            >
              {[
                { x: 120, y: 200 },
                { x: 320, y: 160 },
                { x: 540, y: 200 },
                { x: 760, y: 170 },
                { x: 980, y: 200 },
                { x: 1180, y: 170 },
                { x: 1400, y: 200 }
              ].map((n, i, arr) => {
                const next = arr[i + 1];
                return (
                  <g key={i}>
                    {next && (
                      <line
                        x1={n.x}
                        y1={n.y}
                        x2={next.x}
                        y2={next.y}
                        stroke="#8DFF8A"
                        strokeOpacity="0.5"
                        strokeWidth="1.4"
                      />
                    )}
                    <circle cx={n.x} cy={n.y} r="4" fill="#8DFF8A" />
                    <circle cx={n.x} cy={n.y} r="10" fill="#8DFF8A" opacity="0.18" />
                  </g>
                );
              })}
            </motion.svg>
          </motion.div>

          {/* Foreground fields */}
          <motion.div
            style={{ y: fieldsY }}
            className="absolute inset-x-0 bottom-0 h-[45%]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(11,61,46,0.65) 30%, #02110d 100%)"
              }}
            />
            <svg viewBox="0 0 1600 360" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
              <defs>
                <linearGradient id="field" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0F4A37" />
                  <stop offset="100%" stopColor="#02110D" />
                </linearGradient>
              </defs>
              {/* Terraced fields as horizontal bands */}
              {Array.from({ length: 14 }).map((_, i) => {
                const y = 40 + i * 22;
                const intensity = 0.05 + i * 0.05;
                return (
                  <path
                    key={i}
                    d={`M0,${y} C200,${y - 6} 600,${y + 8} 1000,${y - 4} S1600,${y + 6} 1600,${y} L1600,${y + 16} L0,${y + 16} Z`}
                    fill={`rgba(141,255,138,${Math.min(0.35, intensity)})`}
                  />
                );
              })}
              <path d="M0,360 L0,40 L1600,40 L1600,360 Z" fill="url(#field)" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Drone moving across */}
          <motion.div
            style={{ x: droneX, y: droneY }}
            className="absolute left-0 top-[36%] h-12 w-12"
          >
            <div className="relative h-full w-full">
              <span className="absolute inset-0 rounded-full bg-neon/40 blur-2xl" />
              <svg viewBox="0 0 64 64" className="relative h-full w-full text-neon">
                <circle cx="32" cy="32" r="6" fill="currentColor" />
                <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="14" cy="50" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="14" y1="14" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                <line x1="50" y1="14" x2="14" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              </svg>
              <span
                className="absolute left-1/2 top-1/2 h-px w-32 -translate-y-1/2 bg-gradient-to-r from-neon to-transparent"
              />
            </div>
          </motion.div>

          {/* Old market overlay (fades out) */}
          <motion.div
            style={{ opacity: tradeOpacity }}
            className="pointer-events-none absolute left-6 top-6 max-w-[220px] rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-md"
          >
            <div className="text-mono text-[9px] uppercase tracking-[0.24em] text-gold">
              1985 · Market Index
            </div>
            <div className="mt-1 text-xs text-white/70">
              Manual ledger · weekly samples · regional only.
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: networkOpacity }}
            className="pointer-events-none absolute right-6 top-6 max-w-[260px] rounded-2xl border border-neon/30 bg-black/50 p-3 backdrop-blur-md"
          >
            <div className="text-mono text-[9px] uppercase tracking-[0.24em] text-neon">
              2025 · National Intelligence
            </div>
            <div className="mt-1 text-xs text-white/85">
              Realtime · 38,921 sensors · 77/77 districts streaming.
            </div>
          </motion.div>

          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 scanline opacity-30 mix-blend-screen" />
        </div>
      </div>

      {/* Chapter rails */}
      <div className="container-cine mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {CHAPTERS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-2xl glass holo-border p-5"
          >
            <div className="text-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: c.accent }}>
              Chapter 0{i + 1}
            </div>
            <div className="mt-2 font-display text-xl text-white">{c.title}</div>
            <p className="mt-2 text-sm text-white/60">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
