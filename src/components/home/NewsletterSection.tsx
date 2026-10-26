"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FlagStripe } from "@/components/ui/FlagStripe";

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
    <section className="section-pad light-section relative overflow-hidden">
      <FlagStripe className="absolute top-0 inset-x-0" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #078930 0, #078930 2px, transparent 2px, transparent 56px)",
        }}
        aria-hidden
      />
      <Container narrow className="relative text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-ethio-green mb-3">
          {t.newsletterTitle}
        </p>
        <div className="gold-rule mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
          {t.newsletterTitle}
        </h2>
        <p className="text-charcoal/70 mb-8">{t.newsletterSubtitle}</p>

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
            className="flex-1 min-h-11 px-4 bg-ivory border border-ethio-green/25 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-ethio-green"
          />
          <Button type="submit" variant="light" className="sm:w-auto">
            {t.newsletterCta}
          </Button>
        </form>

        <p className="mt-4 text-xs text-charcoal/50">
          {status === "ready" ? t.formSuccess : t.newsletterNote}
        </p>
      </Container>
    </section>
  );
}
