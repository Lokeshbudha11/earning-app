import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a12",
          soft: "#11111b",
          card: "rgba(255,255,255,0.04)"
        },
        brand: {
          50: "#f3eaff",
          100: "#e3ceff",
          200: "#c79dff",
          300: "#aa6cff",
          400: "#8e3bff",
          500: "#7a1fff",
          600: "#6210e6",
          700: "#4a0bb3",
          800: "#330880",
          900: "#1d044d"
        },
        accent: {
          gold: "#ffd166",
          mint: "#06d6a0",
          coral: "#ef476f",
          sky: "#118ab2"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(170,108,255,0.25), 0 10px 40px -10px rgba(122,31,255,0.6)",
        soft: "0 1px 0 rgba(255,255,255,0.05) inset, 0 10px 30px -15px rgba(0,0,0,0.5)"
      },
      backgroundImage: {
        "mesh": "radial-gradient(60% 80% at 20% 10%, rgba(122,31,255,0.45) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 60% at 80% 30%, rgba(6,214,160,0.35) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 80% at 70% 90%, rgba(255,209,102,0.3) 0%, rgba(0,0,0,0) 60%)",
        "grid": "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "shine": "linear-gradient(120deg, transparent 0%, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%, transparent 100%)"
      },
      backgroundSize: {
        "grid": "32px 32px"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(122,31,255,0.6)" },
          "50%": { boxShadow: "0 0 0 18px rgba(122,31,255,0)" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        spinSlow: "spinSlow 12s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-out infinite",
        gradientShift: "gradientShift 12s ease infinite",
        marquee: "marquee 30s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
