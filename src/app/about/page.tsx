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
      <section className="relative min-h-[280px] md:min-h-[340px] flex items-end overflow-hidden">
        <Image
          src={artist.images.about}
          alt={`${artist.name.en} portrait`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-[#021208]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021208] via-[#021208]/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-50 mix-blend-soft-light pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 15% 40%, rgba(7,137,48,0.4), transparent 55%),
              radial-gradient(ellipse 40% 35% at 80% 25%, rgba(212,180,10,0.3), transparent 50%)
            `,
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full px-5 sm:px-8 pb-10 pt-28 md:pb-12 md:pt-32 max-w-7xl mx-auto text-center md:text-left">
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-brass mb-3">
            About · ስለ እኔ
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
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
