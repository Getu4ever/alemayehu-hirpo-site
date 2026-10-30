"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("ready");
  }

  return (
    <section className="relative overflow-hidden section-pad bg-[#140c0e]">
      {/* Warm stage glow */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[120%] w-[70%] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(180,40,48,0.35) 0%, rgba(212,180,10,0.08) 45%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[80%] w-[55%] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(7,137,48,0.22) 0%, transparent 65%)",
        }}
        aria-hidden
      />
      {/* Soft vinyl-groove rings */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, transparent 0 14px, rgba(252,221,9,0.45) 14px 15px)",
        }}
        aria-hidden
      />
      <p
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(4rem,18vw,12rem)] leading-none text-ivory/[0.04] select-none"
        aria-hidden
      >
        አለማየሁ
      </p>

      <Container narrow className="relative text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-brass mb-3">
          Newsletter
        </p>
        <div className="gold-rule mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">
          {t.newsletterTitle}
        </h2>
        <p className="text-ivory/65 mb-8 max-w-md mx-auto">
          {t.newsletterSubtitle}
        </p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t.newsletterPlaceholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletterPlaceholder}
            className="flex-1 min-h-11 px-4 bg-ivory/5 border border-ivory/15 text-ivory placeholder:text-ivory/35 focus:outline-none focus:border-brass/60 backdrop-blur-sm"
          />
          <Button type="submit" className="sm:w-auto">
            {t.newsletterCta}
          </Button>
        </form>

        <p className="mt-4 text-xs text-ivory/40">
          {status === "ready" ? t.formSuccess : t.newsletterNote}
        </p>
      </Container>
    </section>
  );
}
