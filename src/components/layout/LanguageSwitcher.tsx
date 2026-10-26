"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={cn("inline-flex items-center gap-1 text-xs", className)}
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1.5 min-h-9 tracking-wider uppercase transition-colors",
          locale === "en"
            ? "text-ethio-yellow"
            : "text-muted hover:text-ivory",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span className="text-ethio-green/50" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => setLocale("am")}
        className={cn(
          "px-2.5 py-1.5 min-h-9 tracking-wider transition-colors amharic",
          locale === "am"
            ? "text-ethio-yellow"
            : "text-muted hover:text-ivory",
        )}
        aria-pressed={locale === "am"}
      >
        አማ
      </button>
    </div>
  );
}
