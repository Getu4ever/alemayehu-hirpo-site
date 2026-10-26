"use client";

import type { NewsArticle } from "@/data/news";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArticleCard } from "@/components/news/ArticleCard";

export function NewsPageContent({ articles }: { articles: NewsArticle[] }) {
  const { t } = useLanguage();

  if (!articles.length) {
    return <EmptyState message={t.noNews} />;
  }

  const [featured, ...rest] = articles;

  return (
    <div className="space-y-12">
      {featured ? (
        <div className="max-w-3xl">
          <ArticleCard article={featured} />
        </div>
      ) : null}
      {rest.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
