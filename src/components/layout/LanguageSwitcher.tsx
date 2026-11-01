"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-brass/35 bg-charcoal/40 p-0.5 text-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]",
        className,
      )}
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "min-h-9 px-3 py-1.5 tracking-[0.14em] uppercase transition-colors",
          locale === "en"
            ? "bg-brass/15 text-ethio-yellow"
            : "text-muted hover:text-ivory",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("am")}
        className={cn(
          "amharic min-h-9 px-3 py-1.5 transition-colors",
          locale === "am"
            ? "bg-brass/15 text-ethio-yellow"
            : "text-muted hover:text-ivory",
        )}
        aria-pressed={locale === "am"}
      >
        አማ
      </button>
    </div>
  );
}
