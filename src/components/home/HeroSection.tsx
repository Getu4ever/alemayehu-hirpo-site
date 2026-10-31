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
        {/* Desktop: soft left wash. Mobile: keep face clear up top, darken only the copy band. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021208]/95 via-[#021208]/55 to-transparent max-md:from-[#021208]/70 max-md:via-[#021208]/25 max-md:to-transparent lg:via-[#021208]/25 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#021208] via-[#021208]/55 to-transparent max-md:h-[48%] max-md:via-[#021208]/7 md:h-2/5 md:via-[#021208]/3" />
      </div>

      {/* Adwa seal — mobile: left of portrait in empty space; desktop: between copy and portrait */}
      <div
        className="pointer-events-none absolute z-[5] select-none left-4 top-[7.5rem] w-[7.25rem] max-md:block md:left-[62%] md:top-[26%] md:w-[11rem] md:-translate-x-1/2 lg:left-[60%] lg:top-[24%] lg:w-[12.5rem] xl:left-[58%] xl:w-[13.5rem]"
        aria-hidden
      >
        <div className="relative opacity-[0.7] md:opacity-[0.55] lg:opacity-[0.62]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/adwa-shields.svg"
            alt=""
            className="mx-auto w-full"
          />
          <div className="-mt-1 text-center md:-mt-2">
            <p className="amharic text-base leading-none tracking-wide text-brass md:text-xl lg:text-[1.55rem]">
              አድዋ
            </p>
            <p className="mt-0.5 font-display text-[0.55rem] font-semibold tracking-[0.32em] text-brass/75 md:mt-1 md:text-[0.65rem] md:tracking-[0.36em]">
              ADWA
            </p>
            <p className="mt-0.5 hidden text-[0.5rem] uppercase tracking-[0.28em] text-ivory/40 md:block">
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
        {/* Mobile: face sits upper-right above the copy band. Desktop: full-bleed portrait. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-full items-start justify-end max-md:top-[4.25rem] max-md:bottom-auto sm:w-[75%] sm:items-end lg:w-[62%] xl:w-[58%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/alemayehu03-hero.png"
            alt={`${artist.name.en} — ${artist.name.am}`}
            className="h-[52vh] w-auto max-w-[78%] translate-x-10 object-contain object-top drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:h-[88vh] sm:max-w-none sm:translate-x-4 sm:object-bottom lg:h-[100vh] lg:translate-x-6 xl:h-[105vh] xl:translate-x-8"
          />
        </div>

        <Container className="relative z-20 w-full pb-12 pt-[58vh] sm:pb-16 sm:pt-36 md:pb-24 md:pt-44">
          <div className="relative max-w-lg lg:max-w-xl">
            {/* Local scrim only behind the lower copy — leaves the face clear */}
            <div
              className="pointer-events-none absolute -inset-x-5 -top-6 -bottom-5 -z-10 md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(2,18,8,0.72) 18%, rgba(2,18,8,0.9) 100%)",
              }}
              aria-hidden
            />
            <p className="animate-fade-up mb-3 text-xs uppercase tracking-[0.22em] text-brass [text-shadow:0_1px_12px_rgba(2,18,8,0.9)] sm:mb-5">
              {t.heroEyebrow}
            </p>

            <h1 className="animate-fade-up delay-1 font-display text-[2.15rem] leading-[1.05] font-bold text-ivory [text-shadow:0_2px_28px_rgba(2,18,8,0.95),0_1px_3px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl lg:text-7xl">
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
              className={`animate-fade-up delay-2 mt-4 max-w-lg text-sm leading-relaxed text-ivory/90 [text-shadow:0_2px_20px_rgba(2,18,8,0.95),0_1px_2px_rgba(0,0,0,0.8)] sm:mt-6 sm:text-base md:text-lg ${locale === "am" ? "amharic" : ""}`}
            >
              {bilingual(artist.shortBio)}
            </p>

            <div className="animate-fade-up delay-3 mt-6 flex flex-wrap gap-3 sm:mt-10">
              <Button href="/music">{t.listenNow}</Button>
              <Button href="/events" variant="secondary">
                {t.liveEvents}
              </Button>
              <Button href="/shop" variant="ghost">
                {t.shop}
              </Button>
            </div>

            {streaming.length ? (
              <p className="animate-fade-up delay-3 mt-5 text-xs uppercase tracking-[0.18em] text-muted sm:mt-8">
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
