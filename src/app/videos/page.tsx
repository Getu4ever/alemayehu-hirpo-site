import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { getFeaturedVideo } from "@/data/videos";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VideoGrid } from "@/components/videos/VideoGrid";
import { FeaturedVideoEmbed } from "./FeaturedVideoEmbed";

export const metadata = createPageMetadata({
  title: "Videos",
  description: `Official music videos, lyric videos, and interviews from ${artist.name.en}.`,
  path: "/videos",
});

export default function VideosPage() {
  const featured = getFeaturedVideo();

  return (
    <>
      <PageHero
        eyebrow="Film & Song"
        title="Video"
        titleAccent="Archive"
        titleAm="ቪዲዮ"
        titleAccentAm="ማህደር"
        description="Music videos, new singles, lyric videos, and interviews."
        descriptionAm="ሙዚቃ ቪዲዮዎች፣ አዲስ ሲንግሎች፣ የግጥም ቪዲዮዎች እና ቃለ መጠይቆች።"
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
