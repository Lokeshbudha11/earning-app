"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Banknote, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/anim/Reveal";
import { TiltCard } from "@/components/anim/TiltCard";
import { ActivityFeed } from "@/components/wallet/ActivityFeed";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { CoinParticles } from "@/components/anim/CoinParticles";
import { fireConfetti } from "@/components/anim/Confetti";
import { RippleButton } from "@/components/anim/RippleButton";
import { me, transactions } from "@/lib/mock";
import { cn } from "@/lib/cn";

const methods = [
  { id: "esewa", name: "eSewa", desc: "NPR · 24h processing", color: "from-emerald-500 to-emerald-700" },
  { id: "khalti", name: "Khalti", desc: "NPR · instant", color: "from-fuchsia-500 to-fuchsia-700" },
  { id: "paypal", name: "PayPal", desc: "USD · 1-2 days", color: "from-sky-500 to-sky-700" },
  { id: "bank", name: "Bank Transfer", desc: "NPR · 1 day", color: "from-amber-500 to-amber-700" }
] as const;

export default function WalletPage() {
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("esewa");
  const [amount, setAmount] = useState(500);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  function withdraw() {
    setDone(true);
    fireConfetti({ particleCount: 100, spread: 80 });
    setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 2200);
  }

  return (
    <div className="space-y-8 pb-16">
      <Reveal>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Wallet</h1>
        <p className="mt-1 text-zinc-400">Track your balance, conversions, and withdrawals.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Balance card */}
        <Reveal className="lg:col-span-2">
          <TiltCard className="card relative overflow-hidden p-8 sm:p-10" intensity={3}>
            <div className="absolute inset-0 bg-mesh opacity-60" />
            <CoinParticles count={10} className="opacity-50" />
            <div className="relative grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-sm text-zinc-300">Points balance</div>
                <div className="mt-1 font-display text-5xl font-semibold">
                  <NumberTicker value={me.pointsBalance} suffix=" pts" />
                </div>
                <div className="mt-1 text-xs text-zinc-400">
                  ≈ ₨ <NumberTicker value={me.pointsBalance / me.conversionRate} /> at {me.conversionRate} pts = NPR 1
                </div>
              </div>
              <div>
                <div className="text-sm text-zinc-300">Cash balance</div>
                <div className="mt-1 font-display text-5xl font-semibold text-emerald-300">
                  ₨ <NumberTicker value={me.cashBalance} />
                </div>
                <div className="mt-1 text-xs text-zinc-400">Withdrawable to eSewa, Khalti, PayPal, or bank.</div>
              </div>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="btn-primary px-5 py-2.5">
                <Banknote className="h-4 w-4" /> Withdraw
              </button>
              <button className="btn-ghost px-5 py-2.5">
                <ArrowDown className="h-4 w-4" /> Convert points → NPR
              </button>
            </div>
          </TiltCard>
        </Reveal>

        {/* Quick stats */}
        <Reveal delay={0.05}>
          <div className="grid h-full gap-4">
            {[
              { label: "Total earned", value: 124200, suffix: " pts" },
              { label: "Total withdrawn", value: 32500, prefix: "₨ " },
              { label: "Pending review", value: 4200, suffix: " pts" }
            ].map((s) => (
              <TiltCard key={s.label} className="card p-5" intensity={4}>
                <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
                <div className="mt-1 font-display text-2xl font-semibold">
                  <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="font-display text-xl font-semibold">Recent activity</h2>
      </Reveal>
      <ActivityFeed items={transactions} />

      {/* Withdraw modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="card relative w-full max-w-md overflow-hidden p-6"
            >
              <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="font-display text-xl font-semibold">Withdraw funds</h3>
                    <p className="mt-1 text-sm text-zinc-400">Choose a method and amount. Funds processed within 24 hours.</p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {methods.map((m) => {
                        const isActive = method === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMethod(m.id)}
                            className={cn(
                              "relative overflow-hidden rounded-xl border p-3 text-left transition-all",
                              isActive ? "border-brand-300/60 bg-white/[0.08]" : "border-white/10 bg-white/5 hover:bg-white/10"
                            )}
                          >
                            <div className={cn("mb-2 h-2 w-12 rounded-full bg-gradient-to-r", m.color)} />
                            <div className="text-sm font-medium">{m.name}</div>
                            <div className="text-xs text-zinc-400">{m.desc}</div>
                            {isActive && (
                              <motion.span
                                layoutId="method-glow"
                                className="absolute inset-0 -z-10 rounded-xl ring-2 ring-brand-300/50"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <label className="text-xs uppercase tracking-wider text-zinc-400">Amount (NPR)</label>
                      <input
                        type="number"
                        min={100}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="input mt-1"
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[500, 1000, 2000, me.cashBalance].map((v) => (
                          <button
                            key={v}
                            onClick={() => setAmount(v)}
                            className="rounded-lg bg-white/5 px-2.5 py-1 text-xs ring-1 ring-white/10 hover:bg-white/10"
                          >
                            {v === me.cashBalance ? "Max" : `₨ ${v}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button onClick={() => setOpen(false)} className="btn-ghost flex-1">Cancel</button>
                      <RippleButton onClick={withdraw} className="flex-1">
                        Confirm <ChevronRight className="h-4 w-4" />
                      </RippleButton>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 ring-2 ring-emerald-400/30"
                    >
                      <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                    </motion.div>
                    <h3 className="mt-4 font-display text-xl font-semibold">Withdrawal requested!</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      ₨ {amount.toLocaleString()} via {methods.find((m) => m.id === method)?.name} — processing.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
