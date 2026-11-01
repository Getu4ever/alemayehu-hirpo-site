import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { seedNewsArticles } from "@/data/news";
import { getArticleBySlug } from "@/lib/news-store";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  // Seed slugs for build; admin-published posts resolve at request time.
  if (seedNewsArticles.length === 0) return [{ slug: "_" }];
  return seedNewsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connection();
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title.en,
    description: article.excerpt.en,
    path: `/news/${article.slug}`,
  });
}

async function ArticleBody({ slug }: { slug: string }) {
  await connection();
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="pt-32 pb-20">
      <Container narrow>
        <Link
          href="/news"
          className="text-sm text-gold hover:text-gold-soft mb-8 inline-block"
        >
          ← News
        </Link>
        <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">
          {article.category}
          {article.publishedAt ? ` · ${article.publishedAt}` : ""}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4">
          {article.title.en}
        </h1>
        {article.title.am ? (
          <p className="amharic text-xl text-gold mb-8">{article.title.am}</p>
        ) : null}
        <div className="relative aspect-[16/9] mb-10 overflow-hidden border border-border">
          <Image
            src={article.coverImage}
            alt={article.title.en}
            fill
            sizes="800px"
            className="object-cover"
            priority
          />
        </div>
        <div className="prose-invert space-y-4 text-cream/85 leading-relaxed whitespace-pre-line">
          {article.body.en}
        </div>
        {article.body.am && article.body.am !== article.body.en ? (
          <div className="amharic mt-10 space-y-4 border-t border-border pt-8 text-cream/85 leading-relaxed whitespace-pre-line">
            {article.body.am}
          </div>
        ) : null}
      </Container>
    </article>
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={null}>
      <ArticleBody slug={slug} />
    </Suspense>
  );
}
