import { Hero } from "@/components/sections/Hero";
import { Intelligence } from "@/components/sections/Intelligence";
import { Dashboard } from "@/components/sections/Dashboard";
import { Story } from "@/components/sections/Story";
import { NepalMap } from "@/components/sections/NepalMap";
import { Programs } from "@/components/sections/Programs";
import { Media } from "@/components/sections/Media";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intelligence />
      <Dashboard />
      <Story />
      <NepalMap />
      <Programs />
      <Media />
      <Team />
      <Contact />
    </>
  );
}
