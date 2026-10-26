import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { newsArticles } from "@/data/news";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { NewsPageContent } from "./NewsPageContent";

export const metadata = createPageMetadata({
  title: "News",
  description: `Official news and announcements from ${artist.name.en}.`,
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="News"
        titleAm="ዜና"
        description="Music announcements, interviews, and official statements."
        descriptionAm="የሙዚቃ ማስታወቂያዎች፣ ቃለ መጠይቆች እና ይፋዊ መግለጫዎች።"
      />
      <section className="section-pad pt-0">
        <Container>
          <NewsPageContent articles={newsArticles} />
        </Container>
      </section>
    </>
  );
}
