"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Sparkles, Zap } from "lucide-react";
import { AuroraBackground } from "@/components/anim/AuroraBackground";
import { CoinParticles } from "@/components/anim/CoinParticles";
import { Reveal } from "@/components/anim/Reveal";
import { TiltCard } from "@/components/anim/TiltCard";
import { RippleButton } from "@/components/anim/RippleButton";

export default function SignInPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  function handleOtp(i: number, v: string) {
    const next = [...code];
    next[i] = v.slice(-1);
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) {
      setTimeout(() => router.push("/dashboard"), 600);
    }
  }

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden p-4">
      <AuroraBackground />
      <CoinParticles count={12} className="opacity-70" />

      <Reveal className="relative w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-zinc-300 hover:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 ring-glow">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg">Blaster</span>
        </Link>

        <TiltCard className="card relative overflow-hidden p-7" intensity={3}>
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-1 text-xs ring-1 ring-white/10">
                  <Sparkles className="h-3.5 w-3.5 text-brand-200" /> Welcome to Blaster
                </span>
                <h1 className="mt-4 font-display text-2xl font-semibold">Sign in to your account</h1>
                <p className="mt-1 text-sm text-zinc-400">We'll email you a one-time code.</p>

                <label className="mt-5 block text-xs uppercase tracking-wider text-zinc-400">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-9"
                  />
                </div>

                <RippleButton
                  onClick={() => email && setStep("otp")}
                  className="mt-5 w-full"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </RippleButton>

                <div className="my-5 flex items-center gap-3 text-xs text-zinc-500">
                  <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
                </div>

                <button className="btn-ghost w-full">
                  <svg className="h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5 0 9.5-1.9 12.9-5l-6-4.9c-2 1.4-4.6 2.3-6.9 2.3-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6 4.9c-.4.4 6.5-4.7 6.5-14.6 0-1.3-.1-2.5-.4-3.5z"/></svg>
                  Continue with Google
                </button>

                <p className="mt-6 text-center text-xs text-zinc-500">
                  By continuing you agree to our <a className="underline hover:text-zinc-300" href="#">Terms</a> &{" "}
                  <a className="underline hover:text-zinc-300" href="#">Privacy Policy</a>.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <button onClick={() => setStep("email")} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
                <h1 className="mt-3 font-display text-2xl font-semibold">Enter the 6-digit code</h1>
                <p className="mt-1 text-sm text-zinc-400">We sent it to <span className="text-zinc-200">{email || "your email"}</span>.</p>

                <div className="mt-6 grid grid-cols-6 gap-2">
                  {code.map((c, i) => (
                    <motion.input
                      key={i}
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      value={c}
                      onChange={(e) => handleOtp(i, e.target.value)}
                      maxLength={1}
                      inputMode="numeric"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="input h-12 text-center font-display text-xl"
                    />
                  ))}
                </div>

                <p className="mt-6 text-center text-xs text-zinc-500">
                  Didn't get the code? <button className="underline hover:text-zinc-300">Resend</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </TiltCard>
      </Reveal>
    </main>
  );
}
