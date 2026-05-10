"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const words = headingRef.current.querySelectorAll<HTMLElement>("[data-word]");
    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0, rotate: 6 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.3
      }
    );
  }, []);

  const heading =
    "Transforming Nepal Agriculture Through Technology".split(" ");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pt-24"
    >
      {/* 3D scene */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroScene />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,transparent,rgba(5,5,5,0.6)_60%,#050505)]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-ink-900" />
        <div className="absolute inset-0 scanline opacity-40 mix-blend-screen" />
      </div>

      <div className="container-cine grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-white/70"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
            </span>
            Department of Agricultural Systems · Nepal
          </motion.div>

          <h1
            ref={headingRef}
            className="heading-display text-4xl text-white sm:text-5xl md:text-6xl lg:text-[5.4rem]"
          >
            <span className="block overflow-hidden">
              {heading.slice(0, 3).map((w, i) => (
                <span
                  key={`a-${i}`}
                  data-word
                  className="inline-block will-change-transform pr-3"
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {heading.slice(3, 4).map((w, i) => (
                <span
                  key={`b-${i}`}
                  data-word
                  className="inline-block will-change-transform pr-3 text-gradient-emerald"
                >
                  {w}
                </span>
              ))}
              {heading.slice(4).map((w, i) => (
                <span
                  key={`c-${i}`}
                  data-word
                  className="inline-block will-change-transform pr-3"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Building an intelligent agricultural ecosystem connecting farmers,
            innovation, sustainability, research, and national development —
            powered by AI, drones, satellite intelligence and a unified national
            digital infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#intelligence" variant="primary" icon={<Arrow />}>
              Explore DAS
            </MagneticButton>
            <MagneticButton href="#programs" variant="outline" icon={<Arrow />}>
              National Programs
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" icon={<Arrow />}>
              Join Innovation Network
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-4"
          >
            {[
              { v: "248K+", l: "Farmers" },
              { v: "77/77", l: "Districts" },
              { v: "1.4M ha", l: "Mapped" }
            ].map((m) => (
              <div
                key={m.l}
                className="rounded-2xl glass holo-border px-4 py-3"
              >
                <div className="font-display text-2xl font-semibold text-gradient-emerald">
                  {m.v}
                </div>
                <div className="text-mono mt-1 text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {m.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Side cinematic readouts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
          className="relative hidden lg:col-span-4 lg:flex flex-col gap-3"
        >
          <ReadoutCard
            label="Live · Drone Fleet"
            value="1,204"
            unit="active"
            color="text-neon"
            chart={[6, 9, 7, 12, 14, 11, 16, 18, 15, 20]}
          />
          <ReadoutCard
            label="Satellite · NDVI"
            value="0.71"
            unit="vigor"
            color="text-electric"
            chart={[3, 5, 6, 4, 8, 9, 12, 10, 14, 16]}
          />
          <ReadoutCard
            label="Soil Network"
            value="38,921"
            unit="sensors online"
            color="text-gold"
            chart={[10, 11, 9, 13, 14, 12, 16, 15, 17, 19]}
          />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="text-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll to enter the system
        </div>
        <div className="relative mx-auto mt-3 h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 h-4 w-px bg-neon animate-[float_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ReadoutCard({
  label,
  value,
  unit,
  color,
  chart
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
  chart: number[];
}) {
  const max = Math.max(...chart);
  return (
    <div className="rounded-2xl glass-strong holo-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
          {label}
        </span>
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className={`font-display text-3xl font-semibold ${color}`}>{value}</div>
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {unit}
        </div>
      </div>
      <svg viewBox={`0 0 ${chart.length * 10} 28`} className="mt-3 h-7 w-full">
        <polyline
          fill="none"
          stroke="currentColor"
          className={color}
          strokeWidth="1.4"
          points={chart
            .map((v, i) => `${i * 10},${28 - (v / max) * 26}`)
            .join(" ")}
        />
      </svg>
    </div>
  );
}
