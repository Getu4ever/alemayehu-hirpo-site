"use client";

import type { Track } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";

export function TrackList({ tracks }: { tracks: Track[] }) {
  const { bilingual, locale } = useLanguage();

  return (
    <ol className="divide-y divide-white/5 border border-border">
      {tracks.map((track) => (
        <li
          key={track.number}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 text-sm"
        >
          <span className="text-muted w-6 tabular-nums">
            {String(track.number).padStart(2, "0")}
          </span>
          <span className="text-ivory">{bilingual(track.title)}</span>
          {locale === "en" && track.title.am ? (
            <span className="amharic text-muted text-xs sm:ml-auto">
              {track.title.am}
            </span>
          ) : null}
          {track.duration ? (
            <span className="text-muted tabular-nums ml-auto sm:ml-0">
              {track.duration}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
