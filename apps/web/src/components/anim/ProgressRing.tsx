"use client";

import { motion } from "framer-motion";

type Props = {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  trackClass?: string;
  fillClass?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  trackClass = "stroke-white/10",
  fillClass = "stroke-brand-300",
  className,
  children
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = Math.max(0, Math.min(1, value));

  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ""}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#aa6cff" />
            <stop offset="60%" stopColor="#06d6a0" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className={trackClass} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="url(#ringGrad)"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - target) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={fillClass}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
