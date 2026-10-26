"use client";

import { Container } from "@/components/ui/Container";
import { FlagStripe } from "@/components/ui/FlagStripe";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  titleAm,
  description,
  descriptionAm,
}: {
  eyebrow?: string;
  title: string;
  titleAm?: string;
  description?: string;
  descriptionAm?: string;
}) {
  const { locale } = useLanguage();
  const displayTitle = locale === "am" && titleAm ? titleAm : title;
  const displayDesc =
    locale === "am" && descriptionAm ? descriptionAm : description;

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden ethio-mesh">
      <div className="absolute inset-0 texture-veil pointer-events-none" />
      <Container className="relative">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.28em] text-ethio-yellow mb-4">
            {eyebrow}
          </p>
        ) : null}
        <div className="gold-rule mb-5" />
        <h1
          className={cn(
            "font-display text-4xl sm:text-5xl md:text-6xl text-ivory max-w-4xl",
            locale === "am" && "amharic",
          )}
        >
          {displayTitle}
        </h1>
        {displayDesc ? (
          <p
            className={cn(
              "mt-5 text-lg text-muted max-w-2xl leading-relaxed",
              locale === "am" && "amharic",
            )}
          >
            {displayDesc}
          </p>
        ) : null}
      </Container>
      <div className="absolute inset-x-0 bottom-0">
        <FlagStripe />
      </div>
    </section>
  );
}
