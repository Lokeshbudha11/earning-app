"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { dashboardMetrics, productionData } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { SectionLabel, Eyebrow } from "@/components/ui/SectionLabel";

const districts = [
  "Kathmandu",
  "Pokhara",
  "Chitwan",
  "Lumbini",
  "Biratnagar",
  "Janakpur",
  "Dhangadhi",
  "Butwal",
  "Nepalgunj",
  "Ilam"
];

export function Dashboard() {
  return (
    <section id="dashboard" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel index="03" title="Live National Dashboard" accent="electric" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Nepal&apos;s agriculture, in{" "}
              <span className="text-gradient-emerald">real time</span>.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Drone telemetry, satellite intelligence, soil sensors and farmer
            cooperatives stream into a single pane of glass — empowering policy,
            research and on-the-ground decision making.
          </p>
        </div>

        <div className="mt-16 rounded-[28px] glass-strong holo-border p-4 sm:p-6">
          <DashboardChrome />

          <div className="mt-6 grid grid-cols-12 gap-4">
            {/* Metric cards */}
            <div className="col-span-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-12 lg:grid-cols-6">
              {dashboardMetrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>

            {/* Main chart */}
            <div className="col-span-12 lg:col-span-7">
              <PerformanceChart />
            </div>

            {/* Side: production */}
            <div className="col-span-12 grid gap-3 lg:col-span-5">
              <ProductionPanel />
              <FundingPanel />
            </div>

            <div className="col-span-12 lg:col-span-7">
              <DistrictTable />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <WeatherPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardChrome() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400/60" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300/60" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          das.gov.np / national-intelligence
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Eyebrow>Live · Realtime</Eyebrow>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/60">
          Q4 · 2025
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/60">
          Tier · Federal
        </span>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  trend
}: {
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
}) {
  const isFloat = !Number.isInteger(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-4"
    >
      <div className="text-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-2xl font-semibold tracking-tight text-white">
          <CountUp to={value} decimals={isFloat ? 1 : 0} />
        </span>
        {suffix && (
          <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            {suffix}
          </span>
        )}
      </div>
      {trend && (
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-neon">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 14 6-6 6 6" />
          </svg>
          {trend}
        </div>
      )}
    </motion.div>
  );
}

function PerformanceChart() {
  const points = useMemo(() => {
    const N = 60;
    return Array.from({ length: N }).map((_, i) => {
      const trend = (i / N) * 60;
      const noise = Math.sin(i * 0.4) * 6 + Math.sin(i * 0.13) * 12;
      return 50 + trend + noise;
    });
  }, []);

  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 600;
  const h = 220;
  const stepX = w / (points.length - 1);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - ((v - min) / (max - min)) * (h - 16) - 8}`)
    .join(" ");
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
            National Production Performance
          </div>
          <div className="mt-1 font-display text-xl text-white">
            +<CountUp to={23.7} decimals={1} />% yield · last 12 cycles
          </div>
        </div>
        <div className="hidden gap-2 sm:flex">
          {["Y", "M", "W", "D"].map((t, i) => (
            <span
              key={t}
              className={
                i === 1
                  ? "rounded-md border border-neon/40 bg-neon/10 px-2 py-1 text-[10px] tracking-[0.18em] text-neon"
                  : "rounded-md border border-white/10 px-2 py-1 text-[10px] tracking-[0.18em] text-white/50"
              }
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full">
        <defs>
          <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8DFF8A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8DFF8A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dash-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8DFF8A" />
            <stop offset="100%" stopColor="#00D1FF" />
          </linearGradient>
        </defs>
        {/* horizontal grid */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2={w}
            y1={(h / 4) * i}
            y2={(h / 4) * i}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 4"
          />
        ))}
        <path d={areaPath} fill="url(#dash-area)" />
        <path
          d={path}
          fill="none"
          stroke="url(#dash-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {points.map((v, i) =>
          i % 6 === 0 ? (
            <circle
              key={i}
              cx={i * stepX}
              cy={h - ((v - min) / (max - min)) * (h - 16) - 8}
              r="2"
              fill="#8DFF8A"
            />
          ) : null
        )}
      </svg>
    </div>
  );
}

function ProductionPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5">
      <div className="flex items-center justify-between">
        <div className="text-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
          Crop Production
        </div>
        <span className="text-[10px] text-white/40">M tons</span>
      </div>
      <div className="mt-4 space-y-2.5">
        {productionData.map((p) => {
          const pct = (p.value / 6) * 100;
          return (
            <div key={p.crop}>
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span>{p.crop}</span>
                <span className="text-mono">{p.value.toFixed(1)} {p.unit}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, pct)}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}66)`,
                    boxShadow: `0 0 14px ${p.color}66`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FundingPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5">
      <div className="flex items-center justify-between">
        <div className="text-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
          Funding Allocation
        </div>
        <Eyebrow>FY 2025</Eyebrow>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { l: "Smart Ag", v: 42, c: "#8DFF8A" },
          { l: "Climate", v: 26, c: "#00D1FF" },
          { l: "Research", v: 18, c: "#D9B86C" }
        ].map((d) => (
          <div key={d.l} className="text-center">
            <Donut value={d.v} color={d.c} />
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {d.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut({ value, color }: { value: number; color: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <svg viewBox="0 0 60 60" className="mx-auto h-[68px] w-[68px]">
      <circle
        cx="30"
        cy="30"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="4"
      />
      <motion.circle
        cx="30"
        cy="30"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${c}`}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - dash }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        transform="rotate(-90 30 30)"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text
        x="30"
        y="34"
        textAnchor="middle"
        className="fill-white"
        fontSize="13"
        fontWeight="600"
      >
        {value}%
      </text>
    </svg>
  );
}

function DistrictTable() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);
  const rows = districts.map((name, i) => ({
    name,
    farmers: 4000 + i * 1200 + ((tick + i) % 4) * 80,
    yield: 14 + ((tick + i * 7) % 18),
    sensors: 200 + ((tick * 3 + i * 51) % 540),
    status: i % 4 === 0 ? "scanning" : "online"
  }));

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5">
      <div className="flex items-center justify-between">
        <div className="text-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
          District Operations
        </div>
        <Eyebrow>Streaming</Eyebrow>
      </div>
      <div className="mt-3 overflow-hidden">
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="text-white/40 text-mono uppercase text-[10px] tracking-[0.18em]">
              <th className="py-2 font-normal">District</th>
              <th className="py-2 font-normal">Farmers</th>
              <th className="py-2 font-normal">Yield Δ</th>
              <th className="py-2 font-normal">Sensors</th>
              <th className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r.name} className="text-white/80">
                <td className="py-2.5">{r.name}</td>
                <td className="py-2.5 text-mono">{r.farmers.toLocaleString()}</td>
                <td className="py-2.5 text-neon text-mono">+{r.yield}%</td>
                <td className="py-2.5 text-mono">{r.sensors}</td>
                <td className="py-2.5">
                  <span
                    className={
                      r.status === "scanning"
                        ? "inline-flex items-center gap-1.5 text-electric"
                        : "inline-flex items-center gap-1.5 text-neon"
                    }
                  >
                    <span
                      className={
                        r.status === "scanning"
                          ? "h-1.5 w-1.5 rounded-full bg-electric animate-pulse"
                          : "h-1.5 w-1.5 rounded-full bg-neon"
                      }
                    />
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WeatherPanel() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5">
      <div className="flex items-center justify-between">
        <div className="text-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
          Climate Forecast · Bagmati Province
        </div>
        <Eyebrow>+/- 1.4°C</Eyebrow>
      </div>
      <div className="mt-4 flex items-end gap-2">
        {days.map((d, i) => {
          const t = 18 + Math.sin(i * 0.7) * 6 + ((i * 5) % 7);
          const rain = ((i + 2) * 17) % 100;
          return (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full overflow-hidden rounded-md bg-white/5" style={{ height: 90 }}>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(t / 30) * 100}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className="w-full bg-gradient-to-t from-electric/70 to-neon/70"
                />
              </div>
              <span className="text-[10px] text-white/55 text-mono">{d}</span>
              <span className="text-[10px] text-white/40">{Math.round(rain)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
