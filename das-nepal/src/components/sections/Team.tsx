"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { team } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Team() {
  return (
    <section id="team" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="08" title="Team & Leadership" accent="gold" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              The minds behind Nepal&apos;s{" "}
              <span className="text-gradient-emerald">agricultural future</span>.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            A multi-disciplinary leadership team unifying scientists,
            technologists, cooperatives, climate experts and farmers — building
            the future together.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <PersonCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonCard({
  member,
  index
}: {
  member: (typeof team)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const rx = useTransform(sy, [-50, 50], [10, -10]);
  const ry = useTransform(sx, [-50, 50], [-12, 12]);

  const accent =
    member.accent === "electric"
      ? "#00D1FF"
      : member.accent === "gold"
        ? "#D9B86C"
        : "#8DFF8A";

  const initials = member.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      style={{ perspective: 1100 }}
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
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group/t relative overflow-hidden rounded-3xl glass-strong holo-border p-6"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(80% 60% at 50% 0%, ${accent}33, transparent 70%)`
          }}
        />

        {/* Portrait — stylized holographic glyph */}
        <div className="relative mx-auto h-44 w-44">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id={`p-${index}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill={`url(#p-${index})`} />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeDasharray="3 5"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="22s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={accent}
              strokeOpacity="0.3"
            />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const x1 = 100 + Math.cos(a) * 70;
              const y1 = 100 + Math.sin(a) * 70;
              const x2 = 100 + Math.cos(a) * 78;
              const y2 = 100 + Math.sin(a) * 78;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={accent}
                  strokeOpacity="0.5"
                />
              );
            })}
          </svg>
          <div
            className="absolute inset-6 flex items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${accent}33, transparent 60%, ${accent}22)`,
              border: `1px solid ${accent}55`,
              backdropFilter: "blur(8px)"
            }}
          >
            <span
              className="font-display text-3xl font-semibold tracking-wide"
              style={{ color: accent }}
            >
              {initials}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="font-display text-xl text-white">{member.name}</div>
          <div
            className="text-mono mt-1 text-[10px] uppercase tracking-[0.24em]"
            style={{ color: `${accent}cc` }}
          >
            {member.role}
          </div>
          <p className="mt-3 text-sm text-white/60">{member.bio}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
