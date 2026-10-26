"use client";

import Image from "next/image";
import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const { t, bilingual, locale } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#021208]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/ethio-backdrop.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021208]/90 via-[#021208]/40 to-transparent lg:via-[#021208]/20 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#021208]/75 via-[#021208]/25 to-transparent" />
        <div
          className="absolute right-[5%] top-[10%] h-[75%] w-[50%] rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(252,221,9,0.18) 0%, rgba(7,137,48,0.14) 40%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      {/* Compact emblem accent — top right */}
      <div
        className="absolute top-[5rem] right-5 sm:right-8 lg:right-12 z-20 pointer-events-none"
        aria-hidden
      >
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#0b5fad] shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-2 ring-ethio-yellow/80 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="h-9 w-9 sm:h-10 sm:w-10" fill="none">
            <path
              d="M32 10 L36.5 24 H51 L39.5 33 L44 47 L32 38 L20 47 L24.5 33 L13 24 H27.5 Z"
              fill="#fcdd09"
            />
            <g stroke="#fcdd09" strokeWidth="1.4" opacity="0.9">
              <line x1="32" y1="4" x2="32" y2="8" />
              <line x1="48" y1="12" x2="45.5" y2="15" />
              <line x1="56" y1="28" x2="52" y2="29.5" />
              <line x1="56" y1="40" x2="52" y2="38.5" />
              <line x1="48" y1="52" x2="45.5" y2="49" />
              <line x1="32" y1="60" x2="32" y2="56" />
              <line x1="16" y1="52" x2="18.5" y2="49" />
              <line x1="8" y1="40" x2="12" y2="38.5" />
              <line x1="8" y1="28" x2="12" y2="29.5" />
              <line x1="16" y1="12" x2="18.5" y2="15" />
            </g>
          </svg>
        </div>
        <div className="mx-auto mt-2 flex h-1.5 w-10 overflow-hidden rounded-full">
          <span className="flex-1 bg-ethio-green" />
          <span className="flex-1 bg-ethio-yellow" />
          <span className="flex-1 bg-ethio-red" />
        </div>
      </div>

      <div className="relative flex-1 flex items-end min-h-[100svh]">
        {/* Large high-res cutout from alemayehu03 */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-[75%] lg:w-[62%] xl:w-[58%] z-10 flex items-end justify-end pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/alemayehu03-hero.png"
            alt={`${artist.name.en} — ${artist.name.am}`}
            className="h-[78vh] sm:h-[88vh] lg:h-[100vh] xl:h-[105vh] w-auto max-w-[95%] sm:max-w-none object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] translate-x-2 sm:translate-x-4 lg:translate-x-6 xl:translate-x-8"
          />
        </div>

        <Container className="relative z-20 pb-16 pt-28 md:pb-24 md:pt-36 w-full">
          <div className="max-w-lg lg:max-w-xl">
            <p className="animate-fade-up mb-5 text-xs sm:text-sm text-ivory/75">
              <span className="uppercase tracking-[0.22em] text-ethio-yellow">
                Official Website
              </span>
              <span className="mx-2 text-ethio-green">·</span>
              <span className="amharic">ይፋዊ ድረ-ገጽ</span>
            </p>

            <h1 className="animate-fade-up delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory leading-[0.95]">
              ALEMAYEHU
              <br />
              HIRPO
            </h1>
            <p
              className="animate-fade-up delay-2 amharic text-2xl sm:text-3xl md:text-4xl text-ethio-yellow mt-3"
              lang="am"
            >
              {artist.name.am}
            </p>

            <p
              className={`animate-fade-up delay-3 mt-6 text-lg md:text-xl text-ivory/90 max-w-lg ${locale === "am" ? "amharic" : ""}`}
            >
              {bilingual(artist.tagline)}
            </p>

            <div className="animate-fade-up delay-4 mt-10 flex flex-wrap gap-3">
              <Button href="/music">{t.exploreMusic}</Button>
              <Button href="/videos" variant="secondary">
                {t.watchVideos}
              </Button>
              <Button href="/about" variant="ghost">
                {t.discoverStory}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
