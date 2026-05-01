"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Mail, Shield, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/anim/Reveal";
import { TiltCard } from "@/components/anim/TiltCard";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { ProgressRing } from "@/components/anim/ProgressRing";
import { CoinParticles } from "@/components/anim/CoinParticles";
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
        <TiltCard className="card relative overflow-hidden p-6 sm:p-8" intensity={3}>
          <div className="absolute inset-0 bg-mesh opacity-60" />
          <CoinParticles count={8} className="opacity-50" />
          <div className="relative grid items-center gap-6 sm:grid-cols-[auto,1fr,auto]">
            <div className="relative">
              <img src={me.avatar} alt="" className="h-20 w-20 rounded-2xl ring-2 ring-white/20" />
              <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-600 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-950 ring-2 ring-bg">
                <Sparkles className="h-3 w-3" /> {me.tier}
              </span>
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold">{me.name}</h1>
              <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-zinc-400">
                <Mail className="h-4 w-4" /> {me.email}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Joined Mar 2025</span>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-emerald-300 ring-1 ring-emerald-400/20">2× earn rate</span>
                <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">137 tasks</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ProgressRing value={me.streak / 30} size={108} stroke={9}>
                <div className="text-center">
                  <div className="font-display text-xl font-semibold">{me.streak}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">streak</div>
                </div>
              </ProgressRing>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* Tabs */}
      <div className="card flex flex-wrap items-center gap-1 p-1">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative z-10 rounded-lg px-3 py-1.5 text-sm transition-colors"
              style={{ color: active ? "#fff" : undefined }}
            >
              {active && (
                <motion.span
                  layoutId="profile-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={active ? "text-white" : "text-zinc-400"}>{t.label}</span>
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
            <TiltCard className="card relative overflow-hidden p-6 lg:col-span-2" intensity={4}>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Users className="h-4 w-4" /> Referral program
              </div>
              <div className="mt-2 font-display text-2xl font-semibold">Earn ₨ 50 per friend, forever.</div>
              <p className="mt-1 text-sm text-zinc-300">
                Share your referral code. You earn 5% of every task they complete on top of a sign-up bonus.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <code className="flex-1 truncate font-display text-base">{me.referralCode}</code>
                <button onClick={copyCode} className="btn-ghost h-9 px-3 text-xs">
                  <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Invited", value: referrals.invited },
                  { label: "Joined", value: referrals.joined },
                  { label: "Earned", value: referrals.earnedFromRefs, suffix: " pts" }
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
                    <div className="mt-1 font-display text-xl font-semibold">
                      <NumberTicker value={s.value} suffix={s.suffix} />
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="card p-6" intensity={4}>
              <div className="text-sm text-zinc-400">Cash balance</div>
              <div className="mt-1 font-display text-3xl font-semibold text-emerald-300">
                ₨ <NumberTicker value={me.cashBalance} />
              </div>
              <Link href="/wallet" className="btn-primary mt-4 w-full">
                Open wallet
              </Link>
              <Link href="/leaderboard" className="btn-ghost mt-2 w-full">
                See leaderboard
              </Link>
            </TiltCard>
          </motion.div>
        )}

        {tab === "security" && (
          <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Shield className="h-4 w-4" /> Account security
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Two-factor authentication", state: "Off", btn: "Enable" },
                { label: "Active sessions", state: "2 devices", btn: "Manage" },
                { label: "Login alerts", state: "Email", btn: "Edit" }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div>
                    <div className="text-sm">{row.label}</div>
                    <div className="text-xs text-zinc-400">{row.state}</div>
                  </div>
                  <button className="btn-ghost h-8 px-3 text-xs">{row.btn}</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "preferences" && (
          <motion.div key="preferences" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-6 space-y-3">
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
      className="flex w-full items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/[0.07]"
    >
      <span className="text-sm">{label}</span>
      <span className={`relative h-6 w-10 rounded-full transition-colors ${on ? "bg-brand-500" : "bg-white/15"}`}>
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
          animate={{ x: on ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </span>
    </button>
  );
}
