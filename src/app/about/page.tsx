import Image from "next/image";
import { artist } from "@/data/artist";
import { createPageMetadata } from "@/lib/metadata";
import { AboutContent } from "./AboutContent";

export const metadata = createPageMetadata({
  title: "About",
  description: `Biography of Ethiopian singer and songwriter ${artist.name.en} (${artist.name.am}).`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[62svh] md:min-h-[70svh] flex items-end overflow-hidden bg-background">
        <div className="absolute inset-y-0 left-0 w-full md:left-[-8%] md:w-[125%]">
          <Image
            src={artist.images.about}
            alt={`${artist.name.en} portrait`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_24%] md:object-[center_22%]"
          />
        </div>
        {/* Same site color as the page — kills the studio grey so the hero is one field */}
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-background from-35% via-background/95 to-transparent" />
        <div className="relative z-10 w-full px-5 sm:px-8 pb-10 pt-28 md:pb-14 md:pt-32 max-w-7xl mx-auto text-center md:text-left">
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-brass mb-3">
            About · ስለ እኔ
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08]">
            <span className="text-ivory">Alemayehu</span>{" "}
            <span className="text-brass">Hirpo</span>
          </h1>
          <p className="amharic text-xl md:text-2xl text-brass/90 mt-2" lang="am">
            {artist.name.am}
          </p>
        </div>
      </section>
      <AboutContent />
    </>
  );
}
