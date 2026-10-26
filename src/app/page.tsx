import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { LatestMusic } from "@/components/home/LatestMusic";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { ArtistIntroduction } from "@/components/home/ArtistIntroduction";
import { EventsPreview } from "@/components/home/EventsPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";

export const metadata = createPageMetadata({
  title: artist.name.en,
  description: `${artist.tagline.en} Official website of Ethiopian singer and songwriter ${artist.name.en} (${artist.name.am}).`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRelease />
      <LatestMusic />
      <FeaturedVideo />
      <ArtistIntroduction />
      <EventsPreview />
      <NewsPreview />
      <GalleryPreview />
      <NewsletterSection />
    </>
  );
}
