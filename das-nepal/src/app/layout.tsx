import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CursorAura } from "@/components/ui/CursorAura";
import { Preloader } from "@/components/ui/Preloader";

// Use Inter as a stand-in for Satoshi/Clash Display through CSS variables.
// (We expose two variables so designers can swap in real Satoshi/Clash later.)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://das-nepal.vercel.app"),
  title: {
    default: "DAS Nepal — Transforming Agriculture Through Technology",
    template: "%s · DAS Nepal"
  },
  description:
    "An intelligent agricultural ecosystem connecting farmers, innovation, sustainability, research, and national development across Nepal.",
  keywords: [
    "DAS Nepal",
    "agriculture",
    "Nepal",
    "smart farming",
    "AI agriculture",
    "agri-tech",
    "national agriculture",
    "drone farming",
    "crop intelligence"
  ],
  openGraph: {
    title: "DAS Nepal — Transforming Agriculture Through Technology",
    description:
      "Building an intelligent agricultural ecosystem connecting farmers, innovation, sustainability, research, and national development.",
    type: "website",
    url: "/",
    siteName: "DAS Nepal"
  },
  twitter: {
    card: "summary_large_image",
    title: "DAS Nepal",
    description: "Cinematic, intelligent agricultural ecosystem for Nepal."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink text-white antialiased">
        <Preloader />
        <CursorAura />
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
