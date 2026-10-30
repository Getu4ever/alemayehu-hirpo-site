"use client";

import { getFeaturedRelease } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedAlbumPlayer } from "@/components/music/FeaturedAlbumPlayer";

export function LatestMusic() {
  const release = getFeaturedRelease();
  const { t } = useLanguage();

  if (!release) return null;

  return (
    <section className="section-pad relative">
      <Container>
        <SectionHeading
          eyebrow={t.featured}
          title={t.latestMusic}
          titleAm="አዲስ ሙዚቃ"
        />
        <FeaturedAlbumPlayer release={release} />
      </Container>
    </section>
  );
}
