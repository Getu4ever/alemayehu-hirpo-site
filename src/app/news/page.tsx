import { Suspense } from "react";
import { connection } from "next/server";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { getAllNewsArticles } from "@/lib/news-store";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { NewsPageContent } from "./NewsPageContent";

export const metadata = createPageMetadata({
  title: "News",
  description: `Official news and announcements from ${artist.name.en}.`,
  path: "/news",
});

async function LiveNewsList() {
  await connection();
  const articles = await getAllNewsArticles();
  return <NewsPageContent articles={articles} />;
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="News"
        titleAccent="Updates"
        titleAm="ዜና"
        titleAccentAm="ማሻሻያ"
        description="Music announcements, interviews, and official statements."
        descriptionAm="የሙዚቃ ማስታወቂያዎች፣ ቃለ መጠይቆች እና ይፋዊ መግለጫዎች።"
        image="/images/page-heroes/news.svg"
      />
      <section className="section-pad pt-0">
        <Container>
          <Suspense fallback={<NewsPageContent articles={[]} />}>
            <LiveNewsList />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
