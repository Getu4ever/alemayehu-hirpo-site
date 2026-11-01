import { Suspense } from "react";
import { connection } from "next/server";
import { getAllNewsArticles } from "@/lib/news-store";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/news/ArticleCard";
import { NewsPreviewClientChrome } from "./NewsPreviewClientChrome";

async function NewsPreviewArticles() {
  await connection();
  const articles = (await getAllNewsArticles()).slice(0, 3);

  if (!articles.length) {
    return <NewsPreviewClientChrome mode="empty" />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export function NewsPreview() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <NewsPreviewClientChrome mode="heading" />
        <Suspense fallback={<NewsPreviewClientChrome mode="empty" />}>
          <NewsPreviewArticles />
        </Suspense>
      </Container>
    </section>
  );
}
