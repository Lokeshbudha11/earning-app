"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
};

export function CoinParticles({ count = 14, className }: Props) {
  const coins = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * -8,
        rotate: Math.random() * 360
      })),
    [count]
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {coins.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: "110%", rotate: c.rotate, opacity: 0 }}
          animate={{ y: "-20%", rotate: c.rotate + 360, opacity: [0, 1, 1, 0] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: `${c.left}%`, width: c.size, height: c.size }}
          className="absolute"
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_4px_18px_rgba(255,209,102,0.45)] ring-2 ring-amber-300/40" />
        </motion.div>
      ))}
    </div>
  );
}
