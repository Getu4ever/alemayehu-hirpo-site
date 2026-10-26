"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { getFeaturedVideo, videos } from "@/data/videos";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export function FeaturedVideo() {
  const { t, bilingual } = useLanguage();
  const featured = getFeaturedVideo();

  return (
    <section className="section-pad bg-surface">
      <Container>
        <SectionHeading
          eyebrow={t.latestVideos}
          title={t.watchVideos}
          titleAm="ቪዲዮዎችን ይመልከቱ"
        />

        {!videos.length || !featured ? (
          <EmptyState message={t.noVideos} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <a
              href={featured.youtubeUrl ?? "/videos"}
              target={featured.youtubeUrl ? "_blank" : undefined}
              rel={featured.youtubeUrl ? "noopener noreferrer" : undefined}
              className="group relative aspect-video overflow-hidden border border-border block"
            >
              <Image
                src={featured.thumbnail}
                alt={bilingual(featured.title)}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/35 group-hover:bg-charcoal/25 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ethio-red text-ivory shadow-[0_0_0_4px_rgba(252,221,9,0.35)]">
                  <Play size={28} fill="currentColor" />
                </span>
              </span>
            </a>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-ethio-yellow mb-3">
                {featured.category.replace("-", " ")}
              </p>
              <h3 className="font-display text-3xl text-ivory mb-4">
                {bilingual(featured.title)}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {bilingual(featured.description)}
              </p>
              <div className="flex flex-wrap gap-3">
                {featured.youtubeUrl ? (
                  <Button href={featured.youtubeUrl} variant="primary" external>
                    Watch on YouTube
                    <ExternalLink size={14} aria-hidden />
                  </Button>
                ) : null}
                <Button href="/videos" variant="secondary">
                  {t.watchVideos}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
