import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionLabel({
  index,
  title,
  className,
  accent = "neon"
}: {
  index: string;
  title: string;
  className?: string;
  accent?: "neon" | "electric" | "gold";
}) {
  const accentColor =
    accent === "electric"
      ? "text-electric"
      : accent === "gold"
        ? "text-gold"
        : "text-neon";

  const dot =
    accent === "electric"
      ? "bg-electric"
      : accent === "gold"
        ? "bg-gold"
        : "bg-neon";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="relative inline-flex h-2 w-2">
        <span className={cn("absolute inset-0 animate-pulse-ring rounded-full", dot, "opacity-60")} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dot)} />
      </span>
      <span className={cn("text-mono text-[11px] uppercase tracking-[0.32em]", accentColor)}>
        {index}
      </span>
      <span className="h-px w-8 bg-white/15" />
      <span className="text-mono text-[11px] uppercase tracking-[0.32em] text-white/60">
        {title}
      </span>
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70",
        className
      )}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
      </span>
      {children}
    </div>
  );
}
