"use client";

import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/data/news";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: NewsArticle }) {
  const { bilingual, locale } = useLanguage();

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block border border-border hover:border-gold/40 transition-colors bg-surface/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-forest/20">
        <Image
          src={article.coverImage}
          alt={bilingual(article.title)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold mb-2">
          {article.category}
          {article.publishedAt
            ? ` · ${formatDate(article.publishedAt, locale)}`
            : ""}
        </p>
        <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors mb-2">
          {bilingual(article.title)}
        </h3>
        <p className="text-sm text-muted line-clamp-3">
          {bilingual(article.excerpt)}
        </p>
      </div>
    </Link>
  );
}
