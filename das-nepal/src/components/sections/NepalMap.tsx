"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { districtPoints } from "@/data/site";
import { SectionLabel, Eyebrow } from "@/components/ui/SectionLabel";

// Hand-crafted simplified Nepal silhouette path (stylized).
// Approximated for visual representation; not geographically exact.
const NEPAL_PATH =
  "M40 110 C 70 78, 110 60, 160 60 C 210 60, 260 70, 320 60 C 380 50, 440 56, 500 70 C 560 84, 610 98, 660 110 C 720 122, 770 134, 800 150 C 820 162, 820 170, 800 178 C 760 188, 700 188, 640 184 C 580 180, 520 184, 460 188 C 400 190, 340 192, 280 188 C 220 184, 160 178, 110 168 C 60 158, 30 142, 30 130 C 30 122, 34 116, 40 110 Z";

export function NepalMap() {
  const [active, setActive] = useState<string | null>(null);

  // Build connection lines between districts
  const connections = useMemo(() => {
    const arr: { from: string; to: string }[] = [];
    for (let i = 0; i < districtPoints.length; i++) {
      const a = districtPoints[i];
      // connect to 2 nearest higher-index districts
      const sorted = districtPoints
        .filter((p) => p.id !== a.id)
        .map((b) => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      for (const s of sorted) arr.push({ from: a.id, to: s.b.id });
    }
    return arr;
  }, []);

  const find = (id: string) => districtPoints.find((p) => p.id === id)!;
  const activePoint = active ? find(active) : null;

  return (
    <section id="map" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="05" title="Interactive 3D Nepal Map" accent="electric" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              The <span className="text-gradient-emerald">national grid</span> of
              agricultural intelligence.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Hover any district to surface live engagement, crop intelligence and
            farmer connectivity flowing through the network.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[28px] glass-strong holo-border p-4 sm:p-6">
            <Eyebrow>77 Districts · 7 Provinces</Eyebrow>
            <div className="relative mt-4 aspect-[840/200] w-full">
              <svg
                viewBox="0 0 840 200"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="map-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0B3D2E" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#062119" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#02110D" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="map-stroke" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#8DFF8A" />
                    <stop offset="50%" stopColor="#00D1FF" />
                    <stop offset="100%" stopColor="#D9B86C" />
                  </linearGradient>
                  <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8DFF8A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8DFF8A" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle internal grid */}
                <g opacity="0.18">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <line
                      key={"v" + i}
                      x1={i * 50}
                      x2={i * 50}
                      y1="0"
                      y2="200"
                      stroke="#8DFF8A"
                      strokeOpacity="0.2"
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line
                      key={"h" + i}
                      y1={i * 50}
                      y2={i * 50}
                      x1="0"
                      x2="840"
                      stroke="#00D1FF"
                      strokeOpacity="0.18"
                    />
                  ))}
                </g>

                {/* Nepal silhouette */}
                <path d={NEPAL_PATH} fill="url(#map-grad)" />
                <path
                  d={NEPAL_PATH}
                  fill="none"
                  stroke="url(#map-stroke)"
                  strokeWidth="1.4"
                  strokeOpacity="0.85"
                />

                {/* Connection lines */}
                {connections.map((c, i) => {
                  const a = find(c.from);
                  const b = find(c.to);
                  return (
                    <line
                      key={i}
                      x1={(a.x / 100) * 840}
                      y1={(a.y / 100) * 200}
                      x2={(b.x / 100) * 840}
                      y2={(b.y / 100) * 200}
                      stroke="#00D1FF"
                      strokeOpacity={0.18}
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* Active connections from hovered */}
                {activePoint && (
                  <g>
                    {districtPoints
                      .filter((p) => p.id !== activePoint.id)
                      .map((p) => {
                        const d = Math.hypot(p.x - activePoint.x, p.y - activePoint.y);
                        if (d > 35) return null;
                        return (
                          <line
                            key={p.id}
                            x1={(activePoint.x / 100) * 840}
                            y1={(activePoint.y / 100) * 200}
                            x2={(p.x / 100) * 840}
                            y2={(p.y / 100) * 200}
                            stroke="#8DFF8A"
                            strokeOpacity="0.7"
                            strokeWidth="1"
                          />
                        );
                      })}
                  </g>
                )}

                {/* District points */}
                {districtPoints.map((p) => {
                  const cx = (p.x / 100) * 840;
                  const cy = (p.y / 100) * 200;
                  const isActive = active === p.id;
                  return (
                    <g
                      key={p.id}
                      transform={`translate(${cx} ${cy})`}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActive(p.id)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <circle r="20" fill="url(#halo)" opacity={isActive ? 1 : 0.5} />
                      <circle
                        r={isActive ? 6 : 3.5}
                        fill={isActive ? "#8DFF8A" : "#B4FFB1"}
                        style={{
                          filter: isActive
                            ? "drop-shadow(0 0 8px #8DFF8A)"
                            : "drop-shadow(0 0 4px #8DFF8A)"
                        }}
                      />
                      <circle
                        r={isActive ? 14 : 8}
                        fill="none"
                        stroke="#8DFF8A"
                        strokeOpacity={isActive ? 0.9 : 0.4}
                      />
                      {isActive && (
                        <text
                          x="10"
                          y="-10"
                          fill="#FFF"
                          fontSize="9"
                          className="font-mono uppercase"
                          style={{ letterSpacing: 1.4 }}
                        >
                          {p.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Compass / coords */}
              <div className="pointer-events-none absolute bottom-4 left-4 text-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                26.34°–30.45°N · 80.06°–88.20°E
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon" />
                Online
                <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-electric" />
                Scanning
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl glass holo-border p-5">
              <Eyebrow>Live Telemetry</Eyebrow>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePoint?.id ?? "default"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4"
                >
                  <div className="font-display text-2xl text-white">
                    {activePoint?.name ?? "National Aggregate"}
                  </div>
                  <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {activePoint
                      ? `Intensity ${(activePoint.intensity * 100).toFixed(0)}%`
                      : "All districts streaming"}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      {
                        l: "Farmers",
                        v: activePoint
                          ? `${Math.round(activePoint.intensity * 18000).toLocaleString()}`
                          : "248,312"
                      },
                      {
                        l: "Yield Δ",
                        v: activePoint
                          ? `+${(12 + activePoint.intensity * 14).toFixed(1)}%`
                          : "+23.7%"
                      },
                      {
                        l: "Sensors",
                        v: activePoint
                          ? Math.round(180 + activePoint.intensity * 480).toString()
                          : "38,921"
                      },
                      {
                        l: "Drones",
                        v: activePoint
                          ? Math.round(2 + activePoint.intensity * 8).toString()
                          : "1,204"
                      }
                    ].map((m) => (
                      <div
                        key={m.l}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                      >
                        <div className="text-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
                          {m.l}
                        </div>
                        <div className="mt-1 font-display text-lg text-white">{m.v}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="rounded-2xl glass holo-border p-5">
              <Eyebrow>Crop Intelligence</Eyebrow>
              <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-white/65">
                {[
                  { c: "Rice", v: "Vegetative · Stage 3" },
                  { c: "Maize", v: "Tasseling" },
                  { c: "Wheat", v: "Heading" },
                  { c: "Tea", v: "Harvest cycle" },
                  { c: "Potato", v: "Tuberization" },
                  { c: "Veg.", v: "Harvest cycle" }
                ].map((d) => (
                  <div
                    key={d.c}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="text-white">{d.c}</div>
                    <div className="mt-1 text-[10px] text-white/45">{d.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass-strong holo-border p-5">
              <Eyebrow>Network Pulse</Eyebrow>
              <div className="mt-3 flex items-center gap-3">
                <NetworkPulseSvg />
                <div className="flex-1 text-sm text-white/70">
                  Real-time signal aggregation across drones, satellites and
                  ground sensors — recalibrated every 1.4 seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NetworkPulseSvg() {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="29" r="6" fill="#8DFF8A" />
      {[12, 18, 24].map((r, i) => (
        <circle
          key={r}
          cx="29"
          cy="29"
          r={r}
          fill="none"
          stroke="#8DFF8A"
          strokeOpacity={0.7 - i * 0.2}
          strokeWidth={1}
        >
          <animate
            attributeName="r"
            from={r}
            to={r + 6}
            dur={`${1.4 + i * 0.2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            from={0.7 - i * 0.2}
            to="0"
            dur={`${1.4 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
