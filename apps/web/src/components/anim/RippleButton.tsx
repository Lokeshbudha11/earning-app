"use client";

import { useState, type ButtonHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type Ripple = { id: number; x: number; y: number };

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function RippleButton({ variant = "primary", className, children, onClick, ...rest }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  return (
    <button
      onClick={(e) => {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        const id = Date.now() + Math.random();
        setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
        onClick?.(e);
      }}
      className={cn(variant === "primary" ? "btn-primary" : "btn-ghost", "relative overflow-hidden", className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 7, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ left: r.x, top: r.y, width: 24, height: 24 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
