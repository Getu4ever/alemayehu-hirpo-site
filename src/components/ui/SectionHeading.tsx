"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";

export function SectionHeading({
  eyebrow,
  title,
  titleAm,
  description,
  align = "left",
  light,
  className,
}: {
  eyebrow?: string;
  title: string;
  titleAm?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  const { locale } = useLanguage();
  const displayTitle = locale === "am" && titleAm ? titleAm : title;

  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs uppercase tracking-[0.28em]",
            light ? "text-ethio-green" : "text-ethio-yellow",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div
        className={cn(
          "gold-rule mb-5",
          align === "center" && "mx-auto",
        )}
      />
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl",
          light ? "text-charcoal" : "text-ivory",
          locale === "am" && "amharic",
        )}
      >
        {displayTitle}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base md:text-lg max-w-2xl",
            light ? "text-charcoal/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
