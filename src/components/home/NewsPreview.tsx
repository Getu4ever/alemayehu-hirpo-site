"use client";

import Link from "next/link";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArticleCard } from "@/components/news/ArticleCard";

export function NewsPreview() {
  const { t } = useLanguage();
  const articles = newsArticles.slice(0, 3);

  return (
    <section className="section-pad bg-surface">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow={t.newsUpdates}
            title={t.newsUpdates}
            titleAm="ዜናና ማሻሻያዎች"
            className="mb-0"
          />
          <Link
            href="/news"
            className="text-sm text-gold hover:text-gold-soft mb-10 md:mb-14"
          >
            {t.viewAllNews} →
          </Link>
        </div>

        {articles.length === 0 ? (
          <EmptyState message={t.noNews} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
