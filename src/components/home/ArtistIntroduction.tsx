"use client";

import Image from "next/image";
import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ArtistIntroduction() {
  const { t, bilingual, locale } = useLanguage();

  return (
    <section className="section-pad light-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={artist.images.about}
              alt={`${artist.name.en} portrait`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={t.aboutTheArtist}
              title={artist.name.en}
              titleAm={artist.name.am}
              light
              className="mb-6"
            />
            <p
              className={`text-lg leading-relaxed text-charcoal/80 mb-6 ${locale === "am" ? "amharic" : ""}`}
            >
              {bilingual(artist.biography.introduction)}
            </p>
            <p
              className={`leading-relaxed text-charcoal/70 mb-8 ${locale === "am" ? "amharic" : ""}`}
            >
              {bilingual(artist.shortBio)}
            </p>
            <Button href="/about" variant="light">
              {t.readFullBio}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
