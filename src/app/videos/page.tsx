import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { getFeaturedVideo } from "@/data/videos";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VideoGrid } from "@/components/videos/VideoGrid";
import { FeaturedVideoEmbed } from "./FeaturedVideoEmbed";

export const metadata = createPageMetadata({
  title: "Videos",
  description: `Official music videos, lyric videos, and performances from ${artist.name.en}.`,
  path: "/videos",
});

export default function VideosPage() {
  const featured = getFeaturedVideo();

  return (
    <>
      <PageHero
        eyebrow="Film & Performance"
        title="Videos"
        titleAm="ቪዲዮዎች"
        description="Music videos, lyric videos, live performances, and interviews."
        descriptionAm="ሙዚቃ ቪዲዮዎች፣ የግጥም ቪዲዮዎች፣ ቀጥታ ትርኢቶች እና ቃለ መጠይቆች።"
      />
      <section className="section-pad pt-0">
        <Container>
          {featured?.youtubeId ? (
            <div className="mb-14">
              <FeaturedVideoEmbed video={featured} />
            </div>
          ) : null}
          <VideoGrid />
        </Container>
      </section>
    </>
  );
}
