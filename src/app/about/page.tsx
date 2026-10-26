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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={artist.images.about}
          alt={`${artist.name.en} portrait`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ethio-green/25 via-transparent to-ethio-red/15 mix-blend-soft-light" />
        <div className="relative z-10 w-full px-5 sm:px-8 pb-16 pt-40 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-ethio-yellow mb-3">
            About · ስለ እኔ
          </p>
          <div className="gold-rule mb-5" />
          <h1 className="font-display text-5xl md:text-7xl text-ivory drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
            {artist.name.en}
          </h1>
          <p
            className="amharic text-2xl md:text-3xl text-ethio-yellow mt-2"
            lang="am"
          >
            {artist.name.am}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 flex">
          <span className="flex-1 bg-ethio-green" />
          <span className="flex-1 bg-ethio-yellow" />
          <span className="flex-1 bg-ethio-red" />
        </div>
      </section>
      <AboutContent />
    </>
  );
}
