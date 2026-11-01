"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function TourEmpty() {
  const { t, locale } = useLanguage();

  return (
    <div className="reveal-up mx-auto max-w-xl border border-brass/20 bg-surface/50 px-8 py-16 text-center md:px-12 md:py-20">
      <div className="flag-stripe mx-auto mb-8 max-w-[7rem]" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <p className="text-xs uppercase tracking-[0.28em] text-brass mb-4">
        {t.comingSoon}
      </p>
      <h2
        className={`font-display text-3xl sm:text-4xl text-ivory mb-4 ${locale === "am" ? "amharic" : ""}`}
      >
        {t.tourEmptyTitle}
      </h2>
      <p
        className={`text-muted leading-relaxed ${locale === "am" ? "amharic" : ""}`}
      >
        {t.tourEmptyBody}
      </p>
    </div>
  );
}
