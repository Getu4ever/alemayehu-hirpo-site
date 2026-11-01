"use client";

import Link from "next/link";
import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useMusicPlayerOptional } from "@/components/music/MusicPlayerProvider";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

function IconYoutube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7L16 12l-6.2 3.5z" />
    </svg>
  );
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.2h2.6V5H14c-2.3 0-3.9 1.5-3.9 4v1.7H8V14h2.1v7h3.3v-7H16l.5-3.3h-3.1V9.2c0-.7.3-1 1-1z" />
    </svg>
  );
}

function IconSoundCloud({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 10c-.3 0-.6 0-.9.1A4.5 4.5 0 0 0 8 9.5c0 .1 0 .2 0 .3A3.5 3.5 0 0 0 5.5 16h12a3 3 0 0 0 0-6h-.1z" />
    </svg>
  );
}

const columns = [
  {
    title: { en: "Music", am: "ሙዚቃ" },
    links: [
      { href: "/music", label: { en: "Albums", am: "አልበሞች" } },
      { href: "/music#evangadi", label: { en: "Latest Release", am: "አዲስ ሥራ" } },
      { href: "/videos", label: { en: "Music Videos", am: "ሙዚቃ ቪዲዮዎች" } },
    ],
  },
  {
    title: { en: "Live", am: "ቀጥታ" },
    links: [
      { href: "/events", label: { en: "Live Events", am: "ቀጥታ ዝግጅቶች" } },
      { href: "/tour", label: { en: "Tour", am: "ጉብኝት" } },
    ],
  },
  {
    title: { en: "Shop", am: "ሱቅ" },
    links: [
      { href: "/shop", label: { en: "All Products", am: "ሁሉም ምርቶች" } },
      { href: "/shop", label: { en: "Clothing", am: "ልብስ" } },
      { href: "/shop", label: { en: "Accessories", am: "መለዋወጫዎች" } },
    ],
  },
  {
    title: { en: "Info", am: "መረጃ" },
    links: [
      { href: "/about", label: { en: "About", am: "ስለ እኔ" } },
      { href: "/news", label: { en: "News", am: "ዜና" } },
      { href: "/gallery", label: { en: "Gallery", am: "ጋለሪ" } },
      { href: "/videos", label: { en: "Videos", am: "ቪዲዮዎች" } },
      { href: "/privacy", label: { en: "Privacy", am: "ግላዊነት" } },
      { href: "/contact", label: { en: "Contact", am: "ያግኙን" } },
    ],
  },
] as const;

export function Footer() {
  const { t, bilingual } = useLanguage();
  const year = 2026;

  const social = [
    {
      id: "youtube",
      label: "YouTube",
      url: artist.social.find((s) => s.id === "youtube")?.url,
      Icon: IconYoutube,
    },
    {
      id: "facebook",
      label: "Facebook",
      url: artist.social.find((s) => s.id === "facebook")?.url,
      Icon: IconFacebook,
    },
    {
      id: "soundcloud",
      label: "SoundCloud",
      url: artist.social.find((s) => s.id === "soundcloud")?.url,
      Icon: IconSoundCloud,
    },
  ].filter((s) => s.url);

  const player = useMusicPlayerOptional();
  const playerOpen = Boolean(player?.current);

  return (
    <footer
      className={cn(
        "mt-auto border-t border-white/5 bg-[#070d09]",
        playerOpen && "pb-24 sm:pb-28",
      )}
    >
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-10">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <div>
              <p className="font-display text-lg tracking-[0.06em] text-brass">
                ALEMAYEHU HIRPO
              </p>
              <p className="amharic text-ivory/60 text-xs mt-0.5">
                {artist.name.am}
              </p>
            </div>
            <p className="mt-5 text-sm text-muted leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title.en}>
              <h3 className="font-display text-sm tracking-[0.14em] uppercase text-brass mb-4">
                {bilingual(col.title)}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title.en}-${link.label.en}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/55 hover:text-ivory transition-colors"
                    >
                      {bilingual(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-4">
            {social.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory/60 hover:border-brass/50 hover:text-brass transition-colors"
                >
                  <item.Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            © {year} {artist.name.en}. {t.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
