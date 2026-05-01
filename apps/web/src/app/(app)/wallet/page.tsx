"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Banknote, ChevronRight, CheckCircle2, Coins, TrendingUp, Wallet as WalletIcon } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { ActivityFeed } from "@/components/wallet/ActivityFeed";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { fireConfetti } from "@/components/anim/Confetti";
import { RippleButton } from "@/components/anim/RippleButton";
import { me, transactions } from "@/lib/mock";
import { cn } from "@/lib/cn";

const methods = [
  { id: "esewa", name: "eSewa", desc: "NPR · 24h processing", tone: "from-leaf-100 to-leaf-50", dot: "bg-leaf-500" },
  { id: "khalti", name: "Khalti", desc: "NPR · instant", tone: "from-fuchsia-100 to-fuchsia-50", dot: "bg-fuchsia-500" },
  { id: "paypal", name: "PayPal", desc: "USD · 1-2 days", tone: "from-sky-100 to-sky-50", dot: "bg-sky" },
  { id: "bank", name: "Bank Transfer", desc: "NPR · 1 day", tone: "from-sun-100 to-sun-50", dot: "bg-sun-500" }
] as const;

export default function WalletPage() {
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("esewa");
  const [amount, setAmount] = useState(500);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  function withdraw() {
    setDone(true);
    fireConfetti({ particleCount: 90, spread: 80 });
    setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 2200);
  }

  return (
    <div className="space-y-8 pb-16">
      <Reveal>
        <span className="pill-leaf">Wallet</span>
        <h1 className="h-display mt-3 text-3xl sm:text-4xl">Your earnings, in one place</h1>
        <p className="mt-1 text-ink-muted">Track your balance, conversions, and withdrawals.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Balance card */}
        <Reveal className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-4xl bg-hero p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(900px_500px_at_70%_-20%,white,transparent)]" />
            <div className="relative grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-sm text-white/85">Points balance</div>
                <div className="mt-1 font-display text-5xl font-extrabold">
                  <NumberTicker value={me.pointsBalance} suffix=" pts" />
                </div>
                <div className="mt-1 text-xs text-white/75">
                  ≈ ₨ <NumberTicker value={me.pointsBalance / me.conversionRate} /> at {me.conversionRate} pts = NPR 1
                </div>
              </div>
              <div>
                <div className="text-sm text-white/85">Cash balance</div>
                <div className="mt-1 font-display text-5xl font-extrabold text-sun-300">
                  ₨ <NumberTicker value={me.cashBalance} />
                </div>
                <div className="mt-1 text-xs text-white/75">Withdrawable to eSewa, Khalti, PayPal, or bank.</div>
              </div>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="btn-primary">
                <Banknote className="h-4 w-4" /> Withdraw
              </button>
              <button className="btn border border-white/30 bg-white/10 px-5 py-3 text-white backdrop-blur hover:bg-white/15">
                <ArrowDown className="h-4 w-4" /> Convert points → NPR
              </button>
            </div>
          </div>
        </Reveal>

        {/* Quick stats */}
        <Reveal delay={0.05}>
          <div className="grid h-full gap-4">
            {[
              { label: "Total earned", value: 124200, suffix: " pts", Icon: Coins, tone: "from-brand-100 to-brand-50", iconBg: "bg-brand-500" },
              { label: "Total withdrawn", value: 32500, prefix: "₨ ", Icon: WalletIcon, tone: "from-leaf-100 to-leaf-50", iconBg: "bg-leaf-500" },
              { label: "Pending review", value: 4200, suffix: " pts", Icon: TrendingUp, tone: "from-sun-100 to-sun-50", iconBg: "bg-sun-500" }
            ].map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn("card flex items-center gap-4 bg-gradient-to-br p-5", s.tone)}
              >
                <span className={cn("grid h-11 w-11 place-items-center rounded-2xl text-white", s.iconBg)}>
                  <s.Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">{s.label}</div>
                  <div className="mt-0.5 font-display text-2xl font-extrabold text-ink">
                    <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="h-display text-xl">Recent activity</h2>
      </Reveal>
      <ActivityFeed items={transactions} />

      {/* Withdraw modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
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
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="pill">Withdraw</span>
                    <h3 className="h-display mt-3 text-xl">Withdraw your earnings</h3>
                    <p className="mt-1 text-sm text-ink-muted">Choose a method and amount. Funds processed within 24 hours.</p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {methods.map((m) => {
                        const isActive = method === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMethod(m.id)}
                            className={cn(
                              "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-3 text-left transition-all",
                              m.tone,
                              isActive
                                ? "border-brand-400 ring-4 ring-brand-100"
                                : "border-line hover:border-brand-200"
                            )}
                          >
                            <span className={cn("mb-2 inline-block h-2 w-10 rounded-full", m.dot)} />
                            <div className="text-sm font-bold text-ink">{m.name}</div>
                            <div className="text-xs text-ink-muted">{m.desc}</div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Amount (NPR)</label>
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
                            className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-muted hover:border-brand-200 hover:text-brand-600"
                          >
                            {v === me.cashBalance ? "Max" : `₨ ${v}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button onClick={() => setOpen(false)} className="btn-outline flex-1">Cancel</button>
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
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-50 ring-4 ring-leaf-100"
                    >
                      <CheckCircle2 className="h-8 w-8 text-leaf-600" />
                    </motion.div>
                    <h3 className="h-display mt-4 text-xl">Withdrawal requested!</h3>
                    <p className="mt-1 text-sm text-ink-muted">
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
