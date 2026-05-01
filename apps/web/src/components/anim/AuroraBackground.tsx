"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-90" />
      <div className="absolute inset-0 bg-grid bg-grid [mask-image:radial-gradient(70%_60%_at_50%_30%,#000_30%,transparent_75%)] opacity-40" />
      <motion.div
        className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(122,31,255,0.35), rgba(6,214,160,0.30), rgba(255,209,102,0.30), rgba(239,71,111,0.30), rgba(122,31,255,0.35))",
          filter: "blur(80px)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(6,214,160,0.45), rgba(0,0,0,0) 60%)",
          filter: "blur(40px)"
        }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
