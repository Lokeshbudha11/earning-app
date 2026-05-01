import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Blaster — Earn rewards by completing tasks",
  description:
    "Blaster is an online reward platform — earn points and cash by completing microtasks, watching videos, completing offerwall deals, and taking on freelance jobs.",
  applicationName: "Blaster",
  openGraph: {
    title: "Blaster — Earn rewards by completing tasks",
    description:
      "Earn points and cash by completing microtasks, watching videos, and more. Withdraw via eSewa, Khalti, or PayPal.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
