"use client";

import Image from "next/image";
import Link from "next/link";
import type { Release } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AlbumCard({ release }: { release: Release }) {
  const { bilingual } = useLanguage();

  return (
    <Link
      href={`/music#${release.id}`}
      className="group block border border-border bg-surface/40 hover:border-gold/40 transition-colors"
    >
      <div className="relative aspect-square overflow-hidden bg-forest/20">
        <Image
          src={release.coverImage}
          alt={`${bilingual(release.title)} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold mb-2">
          {release.type}
          {release.year ? ` · ${release.year}` : ""}
        </p>
        <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors">
          {bilingual(release.title)}
        </h3>
        {release.title.am && bilingual(release.title) === release.title.en ? (
          <p className="amharic text-sm text-muted mt-1">{release.title.am}</p>
        ) : null}
      </div>
    </Link>
  );
}
