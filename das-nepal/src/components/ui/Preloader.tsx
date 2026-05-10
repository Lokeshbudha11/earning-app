"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 animate-spin-slow rounded-full border border-neon/30" />
              <span className="absolute inset-2 rounded-full border border-electric/30" />
              <span className="absolute inset-4 animate-pulse rounded-full bg-neon/30 blur-md" />
              <span className="relative font-display text-sm font-bold tracking-[0.4em] text-neon">
                DN
              </span>
            </div>
            <div className="text-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
              Calibrating national network
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "12rem" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-neon to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
