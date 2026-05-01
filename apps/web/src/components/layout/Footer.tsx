import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Zap } from "lucide-react";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Get started",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Tasks in Nepal", href: "/tasks" },
      { label: "Refer & earn", href: "/profile" },
      { label: "Ways to earn", href: "/#ways" }
    ]
  },
  {
    title: "Ways to make money",
    links: [
      { label: "Earn playing games", href: "/tasks" },
      { label: "Surveys for cash", href: "/tasks" },
      { label: "Earn testing apps", href: "/tasks" },
      { label: "Earn watching videos", href: "/tasks" },
      { label: "Earn doing tasks", href: "/tasks" },
      { label: "Free bonus rewards", href: "/wallet" }
    ]
  },
  {
    title: "Help",
    links: [
      { label: "Blog", href: "#" },
      { label: "Support center", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Academy", href: "#" },
      { label: "Contact us", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Platform comparisons", href: "#" },
      { label: "Referral program", href: "/profile" },
      { label: "Careers", href: "#" },
      { label: "Media kit", href: "#" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-zinc-300">
      <div className="container grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            blaster<span className="text-brand-300">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-zinc-400">
            The friendly way to earn from microtasks, surveys, and offerwall in Nepal — pay out via eSewa, Khalti or PayPal.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="mb-4 text-sm font-bold text-white">{c.title}</div>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-zinc-400 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Blaster · Earn rewards in Nepal & worldwide.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
