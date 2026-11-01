import { ExternalLink } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedRelease } from "@/data/releases";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReleaseGrid } from "@/components/music/ReleaseGrid";
import { FeaturedReleaseBlock } from "@/components/music/FeaturedReleaseBlock";
import { MusicPageClient } from "./MusicPageClient";

export const metadata = createPageMetadata({
  title: "Music",
  description: `Explore the discography of ${artist.name.en}, including Evangadi and other releases.`,
  path: "/music",
});

export default function MusicPage() {
  const featured = getFeaturedRelease();

  return (
    <>
      <PageHero
        eyebrow="Discography"
        title="Music"
        titleAccent="Catalogue"
        titleAm="ሙዚቃ"
        titleAccentAm="ካታሎግ"
        description="Albums, collaborations, and songs from Alemayehu Hirpo’s catalogue."
        descriptionAm="ከአለማየሁ ሂርጶ ካታሎግ የመጡ አልበሞች፣ ትብብሮች እና ዘፈኖች።"
        image="/images/albums/evangadi.jpg"
      />

      {featured ? (
        <section className="pb-16 md:pb-24">
          <Container>
            <FeaturedReleaseBlock release={featured} />
          </Container>
        </section>
      ) : null}

      <section className="section-pad bg-surface">
        <Container>
          <MusicPageClient />
          <div className="mt-4">
            <ReleaseGrid />
          </div>

          <div className="mt-16 border border-border p-6 md:p-8">
            <h3 className="font-display text-2xl text-ivory mb-3">
              Streaming platforms
            </h3>
            <p className="text-muted text-sm mb-4 max-w-2xl">
              Verified listening links. Additional platforms will be added once
              official profiles are confirmed.
            </p>
            <ul className="flex flex-wrap gap-3">
              {artist.streaming
                .filter((s) => s.url)
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft"
                    >
                      {s.label} <ExternalLink size={14} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

        </Container>
      </section>
    </>
  );
}
