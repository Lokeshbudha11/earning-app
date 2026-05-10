"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  formatter
}: {
  to: number;
  duration?: number;
  decimals?: number;
  formatter?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    let start = 0;
    let observed = false;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(eased * to);
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !observed) {
            observed = true;
            raf = requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const text = formatter
    ? formatter(val)
    : decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString();

  return <span ref={ref}>{text}</span>;
}
