"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Release } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { TrackList } from "@/components/music/TrackList";
import { cn } from "@/lib/utils";

export function FeaturedReleaseBlock({ release }: { release: Release }) {
  const { t, bilingual, locale } = useLanguage();
  const am = locale === "am";

  return (
    <div
      id={release.id}
      className="grid gap-10 lg:grid-cols-[320px_1fr] border border-border p-6 md:p-10 bg-surface/50"
    >
      <div className="relative aspect-square overflow-hidden bg-forest/20">
        <Image
          src={release.coverImage}
          alt={`${bilingual(release.title)} artwork`}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold mb-3">
          {t.featured} · {release.type}
          {release.year ? ` · ${release.year}` : ""}
        </p>
        <h2
          className={cn(
            "font-display text-4xl text-ivory mb-4",
            am && "amharic",
          )}
        >
          {bilingual(release.title)}
        </h2>

        <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
          {t.releaseStory}
        </p>
        <p
          className={cn(
            "text-muted leading-relaxed mb-6 max-w-2xl",
            am && "amharic",
          )}
        >
          {bilingual(release.description)}
        </p>

        <p className="text-xs uppercase tracking-[0.22em] text-brass mb-3">
          {t.listenPrimary}
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {release.streaming.appleMusic ? (
            <a
              href={release.streaming.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide bg-brass text-charcoal hover:brightness-110 min-h-11"
            >
              Apple Music <ExternalLink size={14} />
            </a>
          ) : null}
          {release.streaming.soundcloud ? (
            <a
              href={release.streaming.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide border border-gold/50 text-ivory hover:border-gold hover:bg-gold/10 min-h-11"
            >
              SoundCloud <ExternalLink size={14} />
            </a>
          ) : null}
          {release.streaming.youtube ? (
            <a
              href={release.streaming.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide border border-border text-muted hover:text-ivory hover:border-brass/40 min-h-11"
            >
              YouTube <ExternalLink size={14} />
            </a>
          ) : null}
        </div>

        {release.tracks ? (
          <div className="mb-2">
            <TrackList
              tracks={release.tracks}
              releaseTitle={release.title}
              coverImage={release.coverImage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
