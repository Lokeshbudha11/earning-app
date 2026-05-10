"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-neon text-ink-900 shadow-[0_10px_40px_-10px_rgba(141,255,138,0.6)] hover:shadow-[0_18px_60px_-10px_rgba(141,255,138,0.85)]",
  ghost:
    "bg-white/5 text-white border border-white/10 hover:bg-white/10",
  outline:
    "bg-transparent text-white border border-neon/40 hover:border-neon hover:bg-neon/10"
};

export function MagneticButton({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  icon,
  type = "button"
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (reduce || isTouch) return;
    }

    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const dx = me.clientX - rect.left - rect.width / 2;
      const dy = me.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
      if (inner.current) {
        inner.current.style.transform = `translate(${dx * 0.08}px, ${dy * 0.1}px)`;
      }
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
      if (inner.current) inner.current.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const cls = cn(
    "btn-cine relative isolate overflow-hidden font-medium will-change-transform transition-[transform,box-shadow] duration-300 ease-out",
    variantClasses[variant],
    className
  );

  const content = (
    <>
      <span
        ref={inner}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
        {icon}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 translate-x-[-100%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[100%]"
      />
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cn(cls, "group")}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={cn(cls, "group")}
      type={type}
    >
      {content}
    </button>
  );
}
