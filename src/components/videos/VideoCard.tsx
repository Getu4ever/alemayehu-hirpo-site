"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { Video } from "@/data/videos";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VideoCard({ video }: { video: Video }) {
  const { bilingual } = useLanguage();
  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-forest/20">
        <Image
          src={video.thumbnail}
          alt={bilingual(video.title)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-charcoal/25">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/90 text-charcoal">
            <Play size={20} fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold mb-2">
          {video.category.replace(/-/g, " ")}
        </p>
        <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors flex items-center gap-2">
          {bilingual(video.title)}
          {video.youtubeUrl ? (
            <ExternalLink size={14} className="opacity-60" aria-hidden />
          ) : null}
        </h3>
      </div>
    </>
  );

  if (video.youtubeUrl) {
    return (
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-border hover:border-gold/40 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group block border border-border opacity-90">{content}</div>
  );
}
