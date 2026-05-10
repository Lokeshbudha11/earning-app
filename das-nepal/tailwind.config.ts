import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0B3D2E",
          50: "#E6F2EC",
          100: "#C2E0D1",
          200: "#8EC4AB",
          300: "#5BA785",
          400: "#2E8A60",
          500: "#0B3D2E",
          600: "#093226",
          700: "#06281E",
          800: "#041C15",
          900: "#02110D"
        },
        neon: {
          DEFAULT: "#8DFF8A",
          soft: "#B4FFB1",
          deep: "#4FE34C"
        },
        ink: {
          DEFAULT: "#050505",
          900: "#050505",
          800: "#0A0A0A",
          700: "#111111",
          600: "#1A1A1A"
        },
        earth: {
          DEFAULT: "#5E3B28",
          light: "#7A4F37",
          dark: "#3F2718"
        },
        electric: {
          DEFAULT: "#00D1FF",
          soft: "#7CE8FF"
        },
        gold: {
          DEFAULT: "#D9B86C",
          soft: "#EAD49A",
          deep: "#A6873E"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      },
      backgroundImage: {
        "grid-radial":
          "radial-gradient(circle at 50% 0%, rgba(141,255,138,0.12), transparent 50%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(141,255,138,0.18), 0 10px 60px -10px rgba(141,255,138,0.25)",
        "glow-cyan":
          "0 0 0 1px rgba(0,209,255,0.20), 0 10px 60px -10px rgba(0,209,255,0.35)",
        "glass":
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -30px rgba(0,0,0,0.6)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
