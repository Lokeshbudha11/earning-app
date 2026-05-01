import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/anim/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <Navbar />
      <PageTransition>
        <div className="container pt-8">{children}</div>
      </PageTransition>
      <Footer />
    </div>
  );
}
