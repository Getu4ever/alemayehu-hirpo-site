import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedRelease } from "@/data/releases";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReleaseGrid } from "@/components/music/ReleaseGrid";
import { TrackList } from "@/components/music/TrackList";
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
            <div
              id={featured.id}
              className="grid gap-10 lg:grid-cols-[320px_1fr] border border-border p-6 md:p-10 bg-surface/50"
            >
              <div className="relative aspect-square overflow-hidden bg-forest/20">
                <Image
                  src={featured.coverImage}
                  alt={`${featured.title.en} artwork`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold mb-3">
                  Featured · {featured.type}
                  {featured.year ? ` · ${featured.year}` : ""}
                </p>
                <h2 className="font-display text-4xl text-ivory mb-2">
                  {featured.title.en}
                </h2>
                {featured.title.am ? (
                  <p className="amharic text-gold mb-4">{featured.title.am}</p>
                ) : null}
                <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
                  The story · ታሪኩ
                </p>
                <p className="text-muted leading-relaxed mb-4 max-w-2xl">
                  {featured.description.en}
                </p>
                {featured.description.am ? (
                  <p className="amharic text-muted/90 leading-relaxed mb-6 max-w-2xl">
                    {featured.description.am}
                  </p>
                ) : null}

                <p className="text-xs uppercase tracking-[0.22em] text-brass mb-3">
                  Listen · ያዳምጡ
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {featured.streaming.appleMusic ? (
                    <a
                      href={featured.streaming.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide bg-brass text-charcoal hover:brightness-110 min-h-11"
                    >
                      Apple Music <ExternalLink size={14} />
                    </a>
                  ) : null}
                  {featured.streaming.soundcloud ? (
                    <a
                      href={featured.streaming.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide border border-gold/50 text-ivory hover:border-gold hover:bg-gold/10 min-h-11"
                    >
                      SoundCloud <ExternalLink size={14} />
                    </a>
                  ) : null}
                  {featured.streaming.youtube ? (
                    <a
                      href={featured.streaming.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-wide border border-border text-muted hover:text-ivory hover:border-brass/40 min-h-11"
                    >
                      YouTube <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>

                {featured.tracks ? (
                  <div className="mb-2">
                    <TrackList
                      tracks={featured.tracks}
                      releaseTitle={featured.title}
                      coverImage={featured.coverImage}
                    />
                  </div>
                ) : null}
              </div>
            </div>
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
