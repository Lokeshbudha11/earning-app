import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" }
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0f172a",
          soft: "#1e293b",
          muted: "#475569"
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f8f7ff",
          alt: "#f5f3ff"
        },
        line: {
          DEFAULT: "#e7e5f1",
          strong: "#d6d3e8"
        },
        brand: {
          50: "#f4f1ff",
          100: "#ebe4ff",
          200: "#d6c8ff",
          300: "#b89eff",
          400: "#9670ff",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#2e1065"
        },
        sun: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309"
        },
        leaf: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857"
        },
        coral: {
          DEFAULT: "#f43f5e",
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c"
        },
        sky: {
          DEFAULT: "#0ea5e9",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 0 rgba(15,23,42,0.04), 0 4px 14px -8px rgba(15,23,42,0.10)",
        cardHover: "0 1px 0 rgba(15,23,42,0.04), 0 22px 50px -22px rgba(124,58,237,0.30)",
        button: "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 18px -8px rgba(124,58,237,0.45)",
        sun: "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 22px -8px rgba(245,158,11,0.55)",
        leaf: "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 22px -8px rgba(16,185,129,0.55)"
      },
      backgroundImage: {
        "hero": "linear-gradient(135deg, #6d28d9 0%, #7c3aed 35%, #8b5cf6 70%, #a78bfa 100%)",
        "shine": "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
        "grid-light": "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-light": "28px 28px"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" }
        },
        ringPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(251,191,36,0.6)" },
          "50%": { boxShadow: "0 0 0 14px rgba(251,191,36,0)" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
        bob: "bob 5s ease-in-out infinite",
        ringPulse: "ringPulse 2.4s ease-out infinite",
        marquee: "marquee 30s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
