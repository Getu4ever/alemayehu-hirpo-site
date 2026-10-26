"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getFeaturedRelease } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedRelease() {
  const release = getFeaturedRelease();
  const { t, bilingual, locale } = useLanguage();

  if (!release) return null;

  const links = Object.entries(release.streaming).filter(
    ([, url]) => Boolean(url),
  ) as [string, string][];

  return (
    <section className="section-pad bg-surface relative ethio-mesh">
      <Container>
        <SectionHeading
          eyebrow={t.featuredRelease}
          title={bilingual(release.title)}
          description={bilingual(release.description)}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] items-start">
          <div className="relative aspect-square overflow-hidden border-2 border-ethio-green/40 bg-forest/30 shadow-[0_0_40px_rgba(7,137,48,0.15)]">
            <Image
              src={release.coverImage}
              alt={`${bilingual(release.title)} artwork placeholder`}
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-6">
              <span className="uppercase tracking-widest text-gold text-xs">
                {release.type}
              </span>
              {release.year ? <span>· {release.year}</span> : null}
              {release.artists ? (
                <span className="w-full sm:w-auto">
                  {release.artists.join(" & ")}
                </span>
              ) : null}
            </div>

            {release.tracks?.length ? (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.22em] text-gold mb-4">
                  {t.tracklist}
                </h3>
                <ol className="divide-y divide-white/5 border border-border">
                  {release.tracks.map((track) => (
                    <li
                      key={track.number}
                      className="flex items-baseline gap-4 px-4 py-3 text-sm"
                    >
                      <span className="text-muted w-6 tabular-nums">
                        {String(track.number).padStart(2, "0")}
                      </span>
                      <span className="text-ivory">
                        {bilingual(track.title)}
                      </span>
                      {locale === "en" && track.title.am ? (
                        <span className="amharic text-muted text-xs ml-auto hidden sm:inline">
                          {track.title.am}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-xs text-muted">
                  Partial tracklist from verified catalogue listings. Full
                  credits forthcoming.
                </p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button href="/music">{t.exploreMusic}</Button>
              {links.map(([key, url]) => (
                <Button key={key} href={url} variant="secondary" external>
                  {key === "appleMusic"
                    ? "Apple Music"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink size={14} aria-hidden />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
