"use client";

import { ExternalLink } from "lucide-react";
import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ContactAside() {
  const { t } = useLanguage();
  const social = artist.social.filter((s) => s.url);
  const streaming = artist.streaming.filter((s) => s.url);

  return (
    <aside className="space-y-10">
      <div>
        <h2 className="font-display text-2xl text-ivory mb-3">
          {t.bookingCta}
        </h2>
        <p className="text-muted leading-relaxed">{t.bookingSubtitle}</p>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-[0.22em] text-gold mb-3">
          {t.contactInfo}
        </h3>
        <p className="text-sm text-muted">{t.contactPending}</p>
      </div>

      {streaming.length ? (
        <div>
          <h3 className="text-xs uppercase tracking-[0.22em] text-gold mb-3">
            {t.streaming}
          </h3>
          <ul className="space-y-2">
            {streaming.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-gold"
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {social.length ? (
        <div>
          <h3 className="text-xs uppercase tracking-[0.22em] text-gold mb-3">
            {t.social}
          </h3>
          <ul className="space-y-2">
            {social.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-gold"
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
