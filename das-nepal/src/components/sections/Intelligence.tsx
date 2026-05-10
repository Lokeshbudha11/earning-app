"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { intelligenceCards } from "@/data/site";
import { Eyebrow, SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

export function Intelligence() {
  return (
    <section id="intelligence" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="02" title="Agriculture Intelligence System" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              An <span className="text-gradient-emerald">orchestrated</span>{" "}
              intelligence layer across Nepal&apos;s farms.
            </h2>
          </div>
          <div className="text-base leading-relaxed text-white/65 lg:max-w-md">
            Eight tightly-integrated systems form a single, evolving organism —
            sensing, learning and acting on every hectare from the Terai to the
            Himalaya in real time.
            <div className="mt-4">
              <Eyebrow>Operational nationwide</Eyebrow>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {intelligenceCards.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  card,
  index
}: {
  card: (typeof intelligenceCards)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(sy, [-50, 50], [10, -10]);
  const rotateY = useTransform(sx, [-50, 50], [-10, 10]);

  const accentColor =
    card.accent === "electric"
      ? "#00D1FF"
      : card.accent === "gold"
        ? "#D9B86C"
        : "#8DFF8A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
      style={{ perspective: 1100 }}
      className="group/c relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-full overflow-hidden rounded-3xl glass holo-border p-6 transition-shadow duration-500",
          "hover:shadow-[0_30px_80px_-30px_rgba(141,255,138,0.35)]"
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition group-hover/c:opacity-100"
          style={{
            background: `radial-gradient(420px 220px at var(--mx,50%) var(--my,50%), ${accentColor}22, transparent 60%)`
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${accentColor}10, transparent 35%, transparent 70%, ${accentColor}10)`
          }}
        />

        <div className="relative flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/[0.03]"
            style={{
              borderColor: `${accentColor}66`,
              boxShadow: `inset 0 0 24px ${accentColor}22, 0 0 30px ${accentColor}22`
            }}
          >
            <Glyph name={card.glyph} color={accentColor} />
          </div>
          <span
            className="text-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: `${accentColor}cc` }}
          >
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {card.description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, ${accentColor}aa, transparent)`
            }}
          />
          <span
            className="text-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: `${accentColor}cc` }}
          >
            Active
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Glyph({ name, color }: { name: string; color: string }): ReactNode {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };
  switch (name) {
    case "smart":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <path d="M8 6V4M16 6V4M3 11h18" />
          <circle cx="8" cy="15" r="1.2" fill={color} />
          <circle cx="12" cy="15" r="1.2" fill={color} />
          <circle cx="16" cy="15" r="1.2" fill={color} />
        </svg>
      );
    case "ai":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
        </svg>
      );
    case "soil":
      return (
        <svg {...props}>
          <path d="M3 18h18" />
          <path d="M5 18V8M9 18V5M13 18V10M17 18V6M21 18V12" />
          <path d="M3 18l4 3 5-2 5 2 4-3" />
        </svg>
      );
    case "drop":
      return (
        <svg {...props}>
          <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" />
          <path d="M9 14a3 3 0 0 0 3 3" />
        </svg>
      );
    case "climate":
      return (
        <svg {...props}>
          <circle cx="6.5" cy="9" r="3" />
          <path d="M14 13a4 4 0 1 1 4 4H7a3 3 0 1 1 1-5.83" />
        </svg>
      );
    case "livestock":
      return (
        <svg {...props}>
          <path d="M5 8a3 3 0 0 1 6 0v3" />
          <path d="M13 8a3 3 0 1 1 6 0v3" />
          <path d="M5 11h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6Z" />
        </svg>
      );
    case "network":
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M7.5 7.5 10.5 10.5M16.5 7.5 13.5 10.5M7.5 16.5 10.5 13.5M16.5 16.5 13.5 13.5" />
        </svg>
      );
    case "research":
      return (
        <svg {...props}>
          <path d="M9 3h6v4l4 8a4 4 0 0 1-3.6 5.7H8.6A4 4 0 0 1 5 15l4-8V3Z" />
          <path d="M9 11h6" />
        </svg>
      );
    default:
      return null;
  }
}
