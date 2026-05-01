"use client";

import { type ReactNode } from "react";

export function Marquee({ children, className, speed = "30s" }: { children: ReactNode; className?: string; speed?: string }) {
  return (
    <div className={`group relative overflow-hidden ${className ?? ""}`}>
      <div
        className="flex w-max animate-marquee gap-10 [animation-duration:var(--marquee-speed)] group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-speed" as never]: speed } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
