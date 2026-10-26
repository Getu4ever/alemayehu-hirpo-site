"use client";

import type { Video } from "@/data/videos";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ExternalLink } from "lucide-react";

export function FeaturedVideoEmbed({ video }: { video: Video }) {
  const { bilingual } = useLanguage();

  if (!video.youtubeId) return null;

  return (
    <div className="border border-border bg-surface/40 overflow-hidden">
      <div className="relative aspect-video bg-charcoal">
        <iframe
          title={bilingual(video.title)}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ethio-yellow mb-2">
            Featured · {video.category.replace(/-/g, " ")}
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-ivory">
            {bilingual(video.title)}
          </h2>
          <p className="mt-2 text-sm text-muted max-w-2xl">
            {bilingual(video.description)}
          </p>
        </div>
        {video.youtubeUrl ? (
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ethio-yellow hover:text-gold-soft shrink-0"
          >
            Open on YouTube <ExternalLink size={14} />
          </a>
        ) : null}
      </div>
    </div>
  );
}
