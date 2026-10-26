"use client";

import Link from "next/link";
import { artist } from "@/data/artist";
import { mainNav } from "@/data/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { FlagStripe } from "@/components/ui/FlagStripe";

export function Footer() {
  const { t, bilingual, locale } = useLanguage();
  const year = 2026;

  const socialLinks = artist.social.filter((s) => s.url);
  const streamingLinks = artist.streaming.filter((s) => s.url);

  return (
    <footer className="mt-auto bg-charcoal-elevated">
      <FlagStripe />
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl tracking-wide text-ivory">
              ALEMAYEHU HIRPO
            </p>
            <p className="amharic text-ethio-yellow mt-1 text-sm">
              {artist.name.am}
            </p>
            <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
              {t.footerTagline}
            </p>
            {artist.tagline.provisional ? (
              <p
                className={`mt-3 text-sm text-ivory/70 italic ${locale === "am" ? "amharic" : ""}`}
              >
                {bilingual(artist.tagline)}
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-ethio-yellow mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/75 hover:text-ethio-yellow transition-colors"
                  >
                    {bilingual(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-ethio-yellow mb-4">
              {t.streaming}
            </h3>
            <ul className="space-y-2">
              {streamingLinks.length ? (
                streamingLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ivory/75 hover:text-ethio-yellow transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted">{t.contactPending}</li>
              )}
            </ul>
            {socialLinks.length ? (
              <>
                <h3 className="text-xs uppercase tracking-[0.22em] text-ethio-yellow mb-4 mt-8">
                  {t.social}
                </h3>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ivory/75 hover:text-ethio-yellow transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-ethio-yellow mb-4">
              {t.contactInfo}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.contactPending}
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm text-ethio-yellow hover:text-gold-soft transition-colors"
            >
              {t.getInTouch} →
            </Link>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted">
          <p>
            © {year} {artist.name.en}. {t.copyright}
          </p>
          <p className="amharic text-ethio-green/80">{artist.name.am}</p>
        </div>
      </Container>
      <FlagStripe />
    </footer>
  );
}
