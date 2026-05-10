import Link from "next/link";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Intelligence", href: "#intelligence" },
      { label: "National Dashboard", href: "#dashboard" },
      { label: "Interactive Map", href: "#map" },
      { label: "Programs", href: "#programs" }
    ]
  },
  {
    heading: "Mission",
    links: [
      { label: "Smart Farming", href: "#programs" },
      { label: "Sustainability", href: "#programs" },
      { label: "Research", href: "#intelligence" },
      { label: "Climate Innovation", href: "#programs" }
    ]
  },
  {
    heading: "Engage",
    links: [
      { label: "Media Library", href: "#media" },
      { label: "Leadership", href: "#team" },
      { label: "Contact", href: "#contact" },
      { label: "Press", href: "#media" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 pb-12 pt-20">
      <div className="container-cine">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-10 w-10 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-neon via-electric to-gold opacity-70 blur-lg" />
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-ink-900/80 text-xs font-bold tracking-widest text-neon">
                  DN
                </span>
              </span>
              <div>
                <div className="font-display text-lg font-semibold">DAS Nepal</div>
                <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Digital Agriculture Systems
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm text-white/60">
              An intelligent national platform connecting farmers, researchers,
              and innovators — building Nepal&apos;s sustainable agricultural future
              with AI, satellite intelligence and decentralized digital
              infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Three.js",
                "AI Ecosystem",
                "Drone Network",
                "Satellite Intelligence",
                "Climate Models"
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                  {col.heading}
                </div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 transition hover:text-neon"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} DAS Nepal · Department of Agricultural Systems.
          </div>
          <div className="flex items-center gap-5">
            <span className="text-mono uppercase tracking-[0.24em]">
              Built in Kathmandu · 27.7172°N 85.3240°E
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Network online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
