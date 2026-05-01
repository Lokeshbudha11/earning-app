"use client";

import confetti from "canvas-confetti";

export function fireConfetti(opts?: { spread?: number; particleCount?: number }) {
  const defaults = { spread: 70, particleCount: 90, startVelocity: 45, ticks: 200, origin: { y: 0.65 } } as const;
  confetti({
    ...defaults,
    ...opts,
    colors: ["#aa6cff", "#7a1fff", "#06d6a0", "#ffd166", "#ef476f"]
  });
}

export function fireRewardBurst() {
  const end = Date.now() + 800;
  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#aa6cff", "#06d6a0", "#ffd166"]
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#aa6cff", "#06d6a0", "#ffd166"]
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
