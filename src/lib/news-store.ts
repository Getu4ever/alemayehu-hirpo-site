import { randomUUID } from "crypto";
import { put, list, del } from "@vercel/blob";
import {
  seedNewsArticles,
  slugifyNewsTitle,
  type NewsArticle,
  type NewsCategory,
} from "@/data/news";

const INDEX_PATH = "news/articles.json";

function blobConfigured() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.BLOB_STORE_ID?.trim(),
  );
}

function assertBlobConfigured() {
  if (!blobConfigured()) {
    throw new Error(
      "Blob storage is not configured. Link a Vercel Blob store to publish news from admin.",
    );
  }
}

async function readJsonBlob<T>(pathname: string, fallback: T): Promise<T> {
  assertBlobConfigured();
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  const match = blobs.find((b) => b.pathname === pathname);
  if (!match) return fallback;
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return fallback;
  try {
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonBlob(pathname: string, data: unknown) {
  assertBlobConfigured();
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readStoredArticles(): Promise<NewsArticle[]> {
  if (!blobConfigured()) return [];
  try {
    return await readJsonBlob<NewsArticle[]>(INDEX_PATH, []);
  } catch {
    return [];
  }
}

async function writeStoredArticles(items: NewsArticle[]) {
  await writeJsonBlob(INDEX_PATH, items);
}

function sortArticles(items: NewsArticle[]) {
  return [...items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return db - da;
  });
}

/** Seed posts + admin-published posts (admin wins on same slug). */
export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  const stored = await readStoredArticles();
  const bySlug = new Map<string, NewsArticle>();
  for (const article of seedNewsArticles) bySlug.set(article.slug, article);
  for (const article of stored) bySlug.set(article.slug, article);
  return sortArticles([...bySlug.values()]);
}

export async function getArticleBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  const all = await getAllNewsArticles();
  return all.find((article) => article.slug === slug) ?? null;
}

export async function listAdminNewsArticles(): Promise<{
  articles: NewsArticle[];
  storedIds: string[];
}> {
  const stored = await readStoredArticles();
  const articles = await getAllNewsArticles();
  return {
    articles,
    storedIds: stored.map((a) => a.id),
  };
}

export type CreateNewsInput = {
  titleEn: string;
  titleAm?: string;
  excerptEn: string;
  excerptAm?: string;
  bodyEn: string;
  bodyAm?: string;
  category: NewsCategory;
  coverImage: string;
  featured?: boolean;
  publishedAt?: string | null;
};

export async function createNewsArticle(
  input: CreateNewsInput,
): Promise<NewsArticle> {
  const titleEn = input.titleEn.trim();
  const excerptEn = input.excerptEn.trim();
  const bodyEn = input.bodyEn.trim();
  if (!titleEn || !excerptEn || !bodyEn) {
    throw new Error("English title, excerpt, and body are required.");
  }
  if (!input.coverImage.trim()) {
    throw new Error("Choose a cover image.");
  }

  let slug = slugifyNewsTitle(titleEn);
  if (!slug) slug = `news-${Date.now()}`;

  const existing = await getAllNewsArticles();
  if (existing.some((a) => a.slug === slug)) {
    slug = `${slug}-${randomUUID().slice(0, 8)}`;
  }

  const article: NewsArticle = {
    id: randomUUID(),
    slug,
    title: {
      en: titleEn,
      am: input.titleAm?.trim() || titleEn,
    },
    excerpt: {
      en: excerptEn,
      am: input.excerptAm?.trim() || excerptEn,
    },
    body: {
      en: bodyEn,
      am: input.bodyAm?.trim() || bodyEn,
    },
    coverImage: input.coverImage.trim(),
    publishedAt: input.publishedAt?.trim() || new Date().toISOString().slice(0, 10),
    category: input.category,
    featured: Boolean(input.featured),
    verified: true,
  };

  const stored = await readStoredArticles();
  if (article.featured) {
    for (const item of stored) item.featured = false;
  }
  stored.unshift(article);
  await writeStoredArticles(stored);
  return article;
}

export async function deleteNewsArticle(id: string) {
  const stored = await readStoredArticles();
  const next = stored.filter((item) => item.id !== id);
  if (next.length === stored.length) {
    // Seed articles live in code — cannot delete from admin.
    if (seedNewsArticles.some((a) => a.id === id)) {
      throw new Error(
        "This built-in seed article can’t be deleted from admin. Un-feature it by publishing a new featured post, or edit the codebase.",
      );
    }
    throw new Error("Article not found.");
  }
  await writeStoredArticles(next);

  // Best-effort: remove uploaded cover if it lived in our news blob folder.
  const removed = stored.find((item) => item.id === id);
  if (removed?.coverImage.includes("news/covers/")) {
    try {
      await del(removed.coverImage);
    } catch {
      // ignore
    }
  }

  return { ok: true as const, id };
}

export async function uploadNewsCover(file: File) {
  assertBlobConfigured();
  if (!file.type.startsWith("image/")) {
    throw new Error("Cover must be an image file.");
  }
  if (file.size > 6 * 1024 * 1024) {
    throw new Error("Cover image must be 6MB or smaller.");
  }
  const ext =
    file.type === "image/png"
      ? ".png"
      : file.type === "image/webp"
        ? ".webp"
        : file.type === "image/gif"
          ? ".gif"
          : ".jpg";
  const pathname = `news/covers/${randomUUID()}${ext}`;
  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return blob.url;
}
