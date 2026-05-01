import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-bg/50 backdrop-blur-md">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600">
            <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </span>
          <span>© {new Date().getFullYear()} Blaster · Earn rewards in Nepal & worldwide</span>
        </div>
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
