"use client";

import { Component, ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    const gl =
      (c.getContext("webgl2") as WebGLRenderingContext | null) ||
      (c.getContext("webgl") as WebGLRenderingContext | null) ||
      (c.getContext("experimental-webgl") as WebGLRenderingContext | null);
    return !!gl;
  } catch {
    return false;
  }
}

class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // Swallow — we already render the fallback. The error message is most
    // commonly "Error creating WebGL context" from three.js.
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function HeroFallback() {
  return (
    <div
      data-hero-fallback="true"
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(141,255,138,0.18),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(0,209,255,0.18),transparent_60%),linear-gradient(180deg,#06140d_0%,#050505_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent" />
    </div>
  );
}

export function HeroSceneSafe() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  if (supported === false) return <HeroFallback />;
  if (supported === null) return <HeroFallback />;

  return (
    <WebGLBoundary fallback={<HeroFallback />}>
      <HeroScene />
    </WebGLBoundary>
  );
}
