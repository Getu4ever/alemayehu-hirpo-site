"use client";

import Image from "next/image";
import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const { t, bilingual, locale } = useLanguage();
  const streaming = artist.streaming.filter((s) => s.url);

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
        {/* Highland dawn — warm gold through forest into ember */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 72% 18%, rgba(212,180,10,0.22), transparent 60%),
              radial-gradient(ellipse 40% 50% at 8% 70%, rgba(7,137,48,0.18), transparent 55%),
              radial-gradient(ellipse 45% 40% at 90% 85%, rgba(180,40,48,0.16), transparent 50%)
            `,
          }}
          aria-hidden
        />
        {/* Desktop: soft left wash. Mobile: heavier cover so copy clears the jacket. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021208]/95 via-[#021208]/55 to-transparent max-md:via-[#021208]/80 max-md:to-[#021208]/35 lg:via-[#021208]/25 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#021208] via-[#021208]/55 to-transparent md:h-2/5 md:via-[#021208]/3" />
        {/* Extra mobile scrim over the portrait mid-zone */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,18,8,0.35) 0%, rgba(2,18,8,0.55) 42%, rgba(2,18,8,0.88) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Adwa seal — sits right of copy, left of portrait */}
      <div
        className="pointer-events-none absolute left-[62%] top-[26%] z-[5] hidden w-[11rem] -translate-x-1/2 select-none md:block lg:left-[60%] lg:top-[24%] lg:w-[12.5rem] xl:left-[58%] xl:w-[13.5rem]"
        aria-hidden
      >
        <div className="relative opacity-[0.55] lg:opacity-[0.62]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/adwa-shields.svg"
            alt=""
            className="mx-auto w-full"
          />
          <div className="-mt-2 text-center">
            <p className="amharic text-xl leading-none tracking-wide text-brass lg:text-[1.55rem]">
              አድዋ
            </p>
            <p className="mt-1 font-display text-[0.65rem] font-semibold tracking-[0.36em] text-brass/75">
              ADWA
            </p>
            <p className="mt-0.5 text-[0.5rem] uppercase tracking-[0.28em] text-ivory/40">
              The African Victory · 1896
            </p>
          </div>
        </div>
      </div>

      {/* Soft light shafts — highland morning */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-30 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(105deg, transparent 0%, transparent 42%, rgba(252,221,9,0.07) 50%, transparent 58%, transparent 100%),
            linear-gradient(118deg, transparent 0%, transparent 55%, rgba(7,137,48,0.05) 62%, transparent 70%)
          `,
        }}
        aria-hidden
      />

      <div className="relative flex-1 flex items-end min-h-[100svh]">
        <div className="absolute inset-y-0 right-0 w-full sm:w-[75%] lg:w-[62%] xl:w-[58%] z-10 flex items-end justify-end pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/alemayehu03-hero.png"
            alt={`${artist.name.en} — ${artist.name.am}`}
            className="h-[72vh] sm:h-[88vh] lg:h-[100vh] xl:h-[105vh] w-auto max-w-[92%] sm:max-w-none object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] translate-x-6 opacity-90 sm:translate-x-4 sm:opacity-100 lg:translate-x-6 xl:translate-x-8"
          />
        </div>

        <Container className="relative z-20 pb-16 pt-36 md:pb-24 md:pt-44 w-full">
          <div className="relative max-w-lg lg:max-w-xl">
            {/* Soft local backdrop so mobile type stays readable over the suit */}
            <div
              className="pointer-events-none absolute -inset-x-5 -top-8 -bottom-6 -z-10 rounded-sm md:hidden"
              style={{
                background:
                  "radial-gradient(ellipse 90% 80% at 30% 45%, rgba(2,18,8,0.82), rgba(2,18,8,0.45) 55%, transparent 75%)",
              }}
              aria-hidden
            />
            <p className="animate-fade-up mb-5 text-xs uppercase tracking-[0.22em] text-brass [text-shadow:0_1px_12px_rgba(2,18,8,0.9)]">
              {t.heroEyebrow}
            </p>

            <h1 className="animate-fade-up delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.05] font-bold [text-shadow:0_2px_28px_rgba(2,18,8,0.95),0_1px_3px_rgba(0,0,0,0.75)]">
              {locale === "am" ? (
                <span className="amharic" lang="am">
                  {artist.tagline.am}
                </span>
              ) : (
                <>
                  The Sound of
                  <br />
                  <span className="text-brass [text-shadow:0_2px_24px_rgba(2,18,8,0.9)]">
                    Ethiopian
                  </span>{" "}
                  Soul
                </>
              )}
            </h1>

            <p
              className={`animate-fade-up delay-2 mt-6 text-base md:text-lg text-ivory/90 max-w-lg leading-relaxed [text-shadow:0_2px_20px_rgba(2,18,8,0.95),0_1px_2px_rgba(0,0,0,0.8)] ${locale === "am" ? "amharic" : ""}`}
            >
              {bilingual(artist.shortBio)}
            </p>

            <div className="animate-fade-up delay-3 mt-10 flex flex-wrap gap-3">
              <Button href="/music">{t.listenNow}</Button>
              <Button href="/events" variant="secondary">
                {t.liveEvents}
              </Button>
              <Button href="/shop" variant="ghost">
                {t.shop}
              </Button>
            </div>

            {streaming.length ? (
              <p className="animate-fade-up delay-3 mt-8 text-xs uppercase tracking-[0.18em] text-muted">
                {t.availableOn}
                <span className="ml-3 inline-flex flex-wrap gap-x-4 gap-y-2 normal-case tracking-normal text-sm text-ivory/80">
                  {streaming.map((link) => (
                    <a
                      key={link.id}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brass transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </span>
              </p>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
