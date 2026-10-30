"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  titleAm,
  titleAccentAm,
  description,
  descriptionAm,
  image,
  align = "center",
}: {
  eyebrow?: string;
  /** First word(s) — ivory */
  title: string;
  /** Second word(s) — brass/gold */
  titleAccent?: string;
  titleAm?: string;
  titleAccentAm?: string;
  description?: string;
  descriptionAm?: string;
  /** Optional atmospheric image behind the hero */
  image?: string;
  align?: "left" | "center";
}) {
  const { locale } = useLanguage();
  const primary =
    locale === "am" && titleAm ? titleAm : title;
  const accent =
    locale === "am" && titleAccentAm
      ? titleAccentAm
      : titleAccent;
  const displayDesc =
    locale === "am" && descriptionAm ? descriptionAm : description;
  const isPhoto = image ? /\.(jpe?g|png|webp)$/i.test(image) : false;

  return (
    <section className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12 min-h-[220px] md:min-h-[260px] flex items-end">
      <div className="absolute inset-0 bg-[#021208]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn(
              "object-cover object-center",
              isPhoto ? "scale-110 blur-[2px]" : "scale-105",
            )}
            aria-hidden
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-0",
            image ? "bg-[#021208]/45" : "bg-[#021208]/20",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021208]/4 via-[#021208]/55 to-[#021208]/95" />
        <div
          className="absolute inset-0 opacity-70 mix-blend-soft-light pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 15% 35%, rgba(7,137,48,0.45), transparent 55%),
              radial-gradient(ellipse 45% 40% at 88% 20%, rgba(212,180,10,0.35), transparent 50%),
              radial-gradient(ellipse 40% 45% at 75% 85%, rgba(180,40,48,0.28), transparent 55%)
            `,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cpath d='M36 6 L66 36 L36 66 L6 36 Z' fill='none' stroke='%23fcdd09' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "72px 72px",
          }}
          aria-hidden
        />
      </div>

      <Container
        className={cn(
          "relative z-10 w-full",
          align === "center" && "text-center",
        )}
      >
        {eyebrow ? (
          <p className="animate-fade-up text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-brass mb-3">
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            "animate-fade-up-delay font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08]",
            locale === "am" && "amharic",
          )}
        >
          <span className="text-ivory">{primary}</span>
          {accent ? (
            <>
              {" "}
              <span className="text-brass">{accent}</span>
            </>
          ) : null}
        </h1>

        {displayDesc ? (
          <p
            className={cn(
              "animate-fade-up-delay mt-3 sm:mt-4 text-sm sm:text-base text-ivory/65 max-w-xl leading-relaxed",
              align === "center" && "mx-auto",
              locale === "am" && "amharic",
            )}
          >
            {displayDesc}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
