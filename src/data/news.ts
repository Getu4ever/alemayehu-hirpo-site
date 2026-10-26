export type NewsArticle = {
  id: string;
  slug: string;
  title: { en: string; am: string };
  excerpt: { en: string; am: string };
  body: { en: string; am: string };
  coverImage: string;
  publishedAt: string | null;
  category: "release" | "tour" | "interview" | "announcement" | "press";
  featured?: boolean;
  verified: boolean;
};

/**
 * No fictional announcements. Empty until official news is supplied.
 * Homepage and /news show an elegant empty state when this array is empty.
 */
export const newsArticles: NewsArticle[] = [];

export function getFeaturedArticle() {
  return newsArticles.find((a) => a.featured) ?? newsArticles[0];
}

export function getArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}
