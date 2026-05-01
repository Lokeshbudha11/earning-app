"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Mail, Shield, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/anim/Reveal";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { ProgressRing } from "@/components/anim/ProgressRing";
import { me, referrals } from "@/lib/mock";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(me.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const tabs = [
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
    { id: "preferences", label: "Preferences" }
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("account");

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl bg-hero p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(900px_500px_at_70%_-20%,white,transparent)]" />
          <div className="relative grid items-center gap-6 sm:grid-cols-[auto,1fr,auto]">
            <div className="relative">
              <img src={me.avatar} alt="" className="h-20 w-20 rounded-2xl ring-4 ring-white/30" />
              <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 rounded-full bg-sun-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink ring-2 ring-white">
                <Sparkles className="h-3 w-3" /> {me.tier}
              </span>
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold">{me.name}</h1>
              <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/85">
                <Mail className="h-4 w-4" /> {me.email}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/15 px-3 py-1 text-white ring-1 ring-white/20 backdrop-blur">Joined Mar 2025</span>
                <span className="rounded-full bg-leaf-400/30 px-3 py-1 text-leaf-100 ring-1 ring-leaf-300/40 backdrop-blur">2× earn rate</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-white ring-1 ring-white/20 backdrop-blur">137 tasks</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ProgressRing value={me.streak / 30} size={108} stroke={9}>
                <div className="text-center">
                  <div className="font-display text-xl font-extrabold text-white">{me.streak}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">streak</div>
                </div>
              </ProgressRing>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Tabs */}
      <div className="card inline-flex flex-wrap items-center gap-1 !rounded-full p-1.5">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="profile-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 shadow-button"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={active ? "text-white" : "text-ink-muted hover:text-ink"}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {tab === "account" && (
          <motion.div
            key="account"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            <div className="card relative overflow-hidden bg-gradient-to-br from-brand-50 to-white p-6 lg:col-span-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
                <Users className="h-4 w-4" /> Referral program
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold text-ink">Earn ₨ 50 per friend, forever.</div>
              <p className="mt-1 text-sm text-ink-muted">
                Share your referral code. You earn 5% of every task they complete on top of a sign-up bonus.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2">
                <code className="flex-1 truncate font-display text-base font-bold text-brand-700">{me.referralCode}</code>
                <button onClick={copyCode} className="btn-violet btn-sm">
                  <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Invited", value: referrals.invited },
                  { label: "Joined", value: referrals.joined },
                  { label: "Earned", value: referrals.earnedFromRefs, suffix: " pts" }
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-white p-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">{s.label}</div>
                    <div className="mt-1 font-display text-xl font-extrabold text-ink">
                      <NumberTicker value={s.value} suffix={s.suffix} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-leaf-50 to-white p-6">
              <div className="text-sm font-semibold text-ink-muted">Cash balance</div>
              <div className="mt-1 font-display text-3xl font-extrabold text-leaf-600">
                ₨ <NumberTicker value={me.cashBalance} />
              </div>
              <Link href="/wallet" className="btn-primary mt-4 w-full">Open wallet</Link>
              <Link href="/leaderboard" className="btn-outline mt-2 w-full">See leaderboard</Link>
            </div>
          </motion.div>
        )}

        {tab === "security" && (
          <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
              <Shield className="h-4 w-4" /> Account security
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Two-factor authentication", state: "Off", btn: "Enable" },
                { label: "Active sessions", state: "2 devices", btn: "Manage" },
                { label: "Login alerts", state: "Email", btn: "Edit" }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-2xl border border-line bg-surface-soft p-3">
                  <div>
                    <div className="text-sm font-semibold text-ink">{row.label}</div>
                    <div className="text-xs text-ink-muted">{row.state}</div>
                  </div>
                  <button className="btn-outline btn-sm">{row.btn}</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "preferences" && (
          <motion.div key="preferences" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card space-y-3 p-6">
            {[
              "Email notifications for task approvals",
              "Daily streak reminder push",
              "Weekly leaderboard digest",
              "Marketing emails"
            ].map((label, i) => (
              <Toggle key={label} label={label} defaultOn={i < 2} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between rounded-2xl border border-line bg-surface-soft p-3 transition hover:bg-white"
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className={`relative h-6 w-10 rounded-full transition-colors ${on ? "bg-brand-500" : "bg-line-strong"}`}>
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-card"
          animate={{ x: on ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </span>
    </button>
  );
}
