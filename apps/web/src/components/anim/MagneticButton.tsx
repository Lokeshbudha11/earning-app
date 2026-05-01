"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<HTMLMotionProps<"button">, "ref"> & {
  strength?: number;
  variant?: "primary" | "ghost";
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { strength = 0.35, variant = "primary", className, children, onMouseMove, onMouseLeave, style, ...rest },
  forwardedRef
) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    onMouseMove?.(e);
  }
  function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
    x.set(0);
    y.set(0);
    onMouseLeave?.(e);
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
});
