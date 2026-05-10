"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionLabel, Eyebrow } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

type FormState = {
  name: string;
  email: string;
  org: string;
  topic: "Smart Farming" | "Research" | "Cooperative" | "Press" | "Other";
  message: string;
};

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    org: "",
    topic: "Smart Farming",
    message: ""
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        org: "",
        topic: "Smart Farming",
        message: ""
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to submit");
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="09" title="Contact Experience" />
            <h2 className="heading-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
              Connect to <span className="text-gradient-emerald">Nepal&apos;s</span>{" "}
              digital agriculture network.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Whether you&apos;re a farmer, researcher, partner, journalist or
            policymaker — submit an inquiry and our team will route you to the
            right node in the network.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[28px] glass-strong holo-border p-6 sm:p-8">
            <Globe />
            <div className="relative">
              <Eyebrow>Realtime Network · 7 provinces</Eyebrow>
              <h3 className="heading-display mt-4 text-2xl text-white sm:text-3xl">
                The whole country, one signal.
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Connection points across Nepal&apos;s agro-ecological zones —
                each pulsing with live data from drones, sensors and farmer
                cooperatives.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { l: "Provinces", v: "7" },
                  { l: "Districts", v: "77" },
                  { l: "Languages", v: "12" }
                ].map((m) => (
                  <div
                    key={m.l}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center"
                  >
                    <div className="font-display text-xl text-white">{m.v}</div>
                    <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-[28px] glass-strong holo-border p-6 sm:p-8"
          >
            <Eyebrow>Smart Inquiry</Eyebrow>
            <h3 className="heading-display mt-4 text-2xl text-white sm:text-3xl">
              Send a transmission.
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Anjali Karki"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@domain.np"
                />
              </Field>
              <Field label="Organization" full>
                <input
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="input"
                  placeholder="Cooperative · NGO · Ministry · Press"
                />
              </Field>

              <Field label="Topic" full>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "Smart Farming",
                      "Research",
                      "Cooperative",
                      "Press",
                      "Other"
                    ] as const
                  ).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, topic: t })}
                      className={
                        form.topic === t
                          ? "rounded-full border border-neon/60 bg-neon/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-neon"
                          : "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55 hover:bg-white/[0.06]"
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Message" full>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="input resize-none"
                  placeholder="Tell us how you'd like to plug into Nepal's agriculture intelligence network."
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                We respond within 48 hours · Kathmandu time
              </div>
              <MagneticButton
                variant="primary"
                type="submit"
                icon={<Arrow />}
              >
                {status === "submitting" ? "Transmitting…" : "Send Transmission"}
              </MagneticButton>
            </div>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-neon/40 bg-neon/10 p-4 text-sm text-neon"
              >
                Transmission received. Welcome to the network — we&apos;ll be in
                touch shortly.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-rose-400/40 bg-rose-400/10 p-4 text-sm text-rose-200"
              >
                {error ?? "Something went wrong. Please try again."}
              </motion.div>
            )}

          </form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 12px 14px;
          color: #fff;
          font-size: 14px;
          transition: all 220ms ease;
        }
        .input:focus {
          outline: none;
          border-color: rgba(141, 255, 138, 0.5);
          box-shadow: 0 0 0 3px rgba(141, 255, 138, 0.14);
          background: rgba(255, 255, 255, 0.06);
        }
        .input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
  full
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <div className="text-mono mb-1.5 text-[10px] uppercase tracking-[0.22em] text-white/45">
        {label}
      </div>
      {children}
    </label>
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

function Globe() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] opacity-50"
      aria-hidden
    >
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8DFF8A" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#00D1FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="280" fill="url(#globe-glow)" />
      {/* Latitudes */}
      {[60, 120, 180, 240].map((r, i) => (
        <ellipse
          key={r}
          cx="300"
          cy="300"
          rx="280"
          ry={r}
          fill="none"
          stroke="#8DFF8A"
          strokeOpacity={0.18 + i * 0.04}
        />
      ))}
      {/* Longitudes */}
      {[20, 60, 100, 140].map((r) => (
        <ellipse
          key={r}
          cx="300"
          cy="300"
          rx={r}
          ry="280"
          fill="none"
          stroke="#00D1FF"
          strokeOpacity="0.18"
        />
      ))}
      {/* Equator highlight */}
      <line x1="20" y1="300" x2="580" y2="300" stroke="#00D1FF" strokeOpacity="0.4" />
      {/* Animated orbiting ring */}
      <ellipse
        cx="300"
        cy="300"
        rx="280"
        ry="160"
        fill="none"
        stroke="#8DFF8A"
        strokeOpacity="0.6"
        strokeDasharray="3 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 300 300"
          to="360 300 300"
          dur="40s"
          repeatCount="indefinite"
        />
      </ellipse>
      {/* Network points */}
      {[
        { x: 300, y: 220, n: "Kathmandu" },
        { x: 240, y: 250, n: "Pokhara" },
        { x: 360, y: 270, n: "Biratnagar" },
        { x: 200, y: 290, n: "Lumbini" },
        { x: 380, y: 320, n: "Janakpur" },
        { x: 160, y: 260, n: "Dhangadhi" }
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#8DFF8A" />
          <circle cx={p.x} cy={p.y} r="14" fill="none" stroke="#8DFF8A" strokeOpacity="0.4">
            <animate
              attributeName="r"
              from="6"
              to="22"
              dur="2.4s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              from="0.6"
              to="0"
              dur="2.4s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
