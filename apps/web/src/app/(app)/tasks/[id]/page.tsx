"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Coins, Flame, ImageUp, Loader2 } from "lucide-react";
import { tasks, categories } from "@/lib/mock";
import { TiltCard } from "@/components/anim/TiltCard";
import { ProgressRing } from "@/components/anim/ProgressRing";
import { fireConfetti, fireRewardBurst } from "@/components/anim/Confetti";
import { NumberTicker } from "@/components/anim/NumberTicker";
import { RippleButton } from "@/components/anim/RippleButton";
import { Reveal } from "@/components/anim/Reveal";
import { cn } from "@/lib/cn";

type Step = "intro" | "doing" | "proof" | "review" | "done";

export default function TaskDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const task = useMemo(() => tasks.find((t) => t.id === params.id), [params.id]);
  const cat = task ? categories.find((c) => c.key === task.category)! : null;

  const [step, setStep] = useState<Step>("intro");
  const [seconds, setSeconds] = useState(0);

  if (!task || !cat) {
    return (
      <div className="card grid place-items-center p-12 text-zinc-400">
        Task not found.
        <Link href="/tasks" className="mt-3 text-brand-200">Back to tasks</Link>
      </div>
    );
  }

  function doStart() {
    setStep("doing");
    // Demo runs in seconds; production would use task!.durationMin * 60
    const total = Math.min(8, task!.durationMin);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.min(total, Math.floor((Date.now() - start) / 1000));
      setSeconds(elapsed);
      if (elapsed >= total) {
        clearInterval(id);
        setStep("proof");
      }
    }, 250);
  }

  function doSubmit() {
    setStep("review");
    setTimeout(() => {
      setStep("done");
      fireConfetti({ particleCount: 140, spread: 90 });
      setTimeout(fireRewardBurst, 200);
    }, 1500);
  }

  const Icon = cat.icon;
  const ratio = step === "doing" ? Math.min(1, seconds / (task.durationMin * 60)) : step === "intro" ? 0 : 1;

  return (
    <div className="space-y-8 pb-16">
      <Reveal>
        <Link href="/tasks" className="btn-ghost h-9 w-fit !px-3 text-xs">
          <ArrowLeft className="h-4 w-4" /> All tasks
        </Link>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        <Reveal>
          <TiltCard className="card relative overflow-hidden p-8" intensity={3}>
            <div className="flex items-start gap-4">
              <div className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-white/15", cat.color)}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-400">{cat.label}</div>
                <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{task.title}</h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-zinc-300">{task.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <Clock className="h-4 w-4 text-zinc-400" /> {task.durationMin} min
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <Flame className="h-4 w-4 text-rose-300" /> {task.slotsLeft} slots left
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                Expires in {task.expiresIn}
              </span>
              {task.provider && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  via {task.provider}
                </span>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { t: "1. Start", d: "Click start and follow the link. The clock begins." },
                { t: "2. Complete", d: "Finish the task within the time. Stay on-task." },
                { t: "3. Submit proof", d: "Upload a screenshot. Auto + manual review." }
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xs uppercase tracking-wider text-zinc-400">{s.t}</div>
                  <div className="mt-1 text-sm text-zinc-200">{s.d}</div>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltCard className="card relative overflow-hidden p-6" intensity={4}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-400">Reward</div>
              <Coins className="h-4 w-4 text-amber-300" />
            </div>
            <div className="mt-1 font-display text-3xl font-semibold">
              +<NumberTicker value={task.rewardPoints} suffix=" pts" />
            </div>

            <div className="mt-6 flex flex-col items-center">
              <ProgressRing value={ratio} size={160} stroke={12}>
                <div className="text-center">
                  {step === "intro" && <div className="text-xs uppercase tracking-wider text-zinc-400">Ready</div>}
                  {step === "doing" && (
                    <div>
                      <div className="font-display text-2xl font-semibold">
                        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">elapsed</div>
                    </div>
                  )}
                  {(step === "proof" || step === "review") && (
                    <div className="text-xs uppercase tracking-wider text-zinc-400">Proof</div>
                  )}
                  {step === "done" && <CheckCircle2 className="h-10 w-10 text-emerald-300" />}
                </div>
              </ProgressRing>
            </div>

            <div className="mt-6 space-y-2">
              <AnimatePresence mode="wait">
                {step === "intro" && (
                  <motion.div key="intro" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <RippleButton onClick={doStart} className="w-full">
                      Start task
                    </RippleButton>
                  </motion.div>
                )}
                {step === "doing" && (
                  <motion.div key="doing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button disabled className="btn-ghost w-full opacity-70">
                      <Loader2 className="h-4 w-4 animate-spin" /> Working…
                    </button>
                  </motion.div>
                )}
                {step === "proof" && (
                  <motion.div key="proof" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-zinc-300 transition hover:bg-white/10">
                      <ImageUp className="h-4 w-4" />
                      Drop a screenshot or click to upload
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                    <RippleButton onClick={doSubmit} className="mt-3 w-full">
                      Submit proof
                    </RippleButton>
                  </motion.div>
                )}
                {step === "review" && (
                  <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-sm text-zinc-300">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-brand-200" />
                    Verifying proof…
                  </motion.div>
                )}
                {step === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="font-display text-lg">Reward credited!</div>
                    <div className="mt-1 text-xs text-zinc-400">+{task.rewardPoints} points added to your wallet.</div>
                    <button onClick={() => router.push("/wallet")} className="btn-primary mt-3 w-full">
                      Open wallet
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
