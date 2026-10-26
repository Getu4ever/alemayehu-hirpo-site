"use client";

import Link from "next/link";
import { releases } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlbumCard } from "@/components/music/AlbumCard";

export function LatestMusic() {
  const { t } = useLanguage();

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
          <SectionHeading
            eyebrow={t.latestMusic}
            title={t.allReleases}
            titleAm="ሁሉም ሥራዎች"
            className="mb-0"
          />
          <Link
            href="/music"
            className="text-sm text-gold hover:text-gold-soft transition-colors shrink-0 mb-10 md:mb-14"
          >
            {t.exploreMusic} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((release) => (
            <AlbumCard key={release.id} release={release} />
          ))}
        </div>
      </Container>
    </section>
  );
}
