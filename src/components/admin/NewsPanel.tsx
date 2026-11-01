"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  NEWS_CATEGORIES,
  NEWS_COVER_OPTIONS,
  type NewsArticle,
  type NewsCategory,
} from "@/data/news";

const field =
  "w-full min-h-11 px-4 py-3 bg-background border border-border text-ivory placeholder:text-muted focus:outline-none focus:border-brass";

export function NewsPanel({ secret }: { secret: string }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [storedIds, setStoredIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [titleEn, setTitleEn] = useState("");
  const [titleAm, setTitleAm] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptAm, setExcerptAm] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [bodyAm, setBodyAm] = useState("");
  const [category, setCategory] = useState<NewsCategory>("announcement");
  const [coverImage, setCoverImage] = useState<string>(NEWS_COVER_OPTIONS[2].value);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [publishedAt, setPublishedAt] = useState(
    () => new Date().toISOString().slice(0, 10),
  );

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch(
      `/api/news/admin?secret=${encodeURIComponent(secret)}`,
      { headers: { "x-admin-secret": secret } },
    );
    const data = (await res.json()) as {
      articles?: NewsArticle[];
      storedIds?: string[];
      error?: string;
    };
    if (!res.ok) {
      setError(data.error || "Unable to load news.");
      return;
    }
    setArticles(data.articles ?? []);
    setStoredIds(data.storedIds ?? []);
  }, [secret]);

  useEffect(() => {
    void load();
  }, [load]);

  function resetForm() {
    setTitleEn("");
    setTitleAm("");
    setExcerptEn("");
    setExcerptAm("");
    setBodyEn("");
    setBodyAm("");
    setCategory("announcement");
    setCoverImage(NEWS_COVER_OPTIONS[2].value);
    setCoverFile(null);
    setFeatured(false);
    setPublishedAt(new Date().toISOString().slice(0, 10));
  }

  async function onPublish(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const body = new FormData();
      body.set("action", "create");
      body.set("titleEn", titleEn);
      body.set("titleAm", titleAm);
      body.set("excerptEn", excerptEn);
      body.set("excerptAm", excerptAm);
      body.set("bodyEn", bodyEn);
      body.set("bodyAm", bodyAm);
      body.set("category", category);
      body.set("coverImage", coverImage);
      body.set("featured", featured ? "true" : "false");
      body.set("publishedAt", publishedAt);
      if (coverFile) body.set("coverFile", coverFile);

      const res = await fetch("/api/news/admin", {
        method: "POST",
        headers: { "x-admin-secret": secret },
        body,
      });
      const data = (await res.json()) as {
        error?: string;
        article?: NewsArticle;
      };
      if (!res.ok) {
        setError(data.error || "Publish failed.");
        return;
      }
      setSuccess(
        data.article
          ? `Published “${data.article.title.en}”.`
          : "News post published.",
      );
      resetForm();
      await load();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string, title: string) {
    if (!window.confirm(`Delete “${title}” permanently?`)) return;
    setBusyId(id);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/news/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Delete failed.");
        return;
      }
      setSuccess("Article deleted.");
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
          News desk
        </p>
        <h2 className="font-display text-2xl text-ivory sm:text-3xl">
          Post news
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Publish announcements straight to the public News page. English is
          required; Amharic is optional and falls back to English when blank.
        </p>
      </div>

      <form
        onSubmit={onPublish}
        className="space-y-5 border border-border bg-surface/40 p-5 sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Title (English) *
            </span>
            <input
              className={field}
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Title (Amharic)
            </span>
            <input
              className={`${field} amharic`}
              value={titleAm}
              onChange={(e) => setTitleAm(e.target.value)}
              lang="am"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Category
            </span>
            <select
              className={field}
              value={category}
              onChange={(e) => setCategory(e.target.value as NewsCategory)}
            >
              {NEWS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Publish date
            </span>
            <input
              type="date"
              className={field}
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Excerpt (English) *
            </span>
            <textarea
              className={`${field} min-h-[5rem] resize-y`}
              value={excerptEn}
              onChange={(e) => setExcerptEn(e.target.value)}
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Body (English) *
            </span>
            <textarea
              className={`${field} min-h-[10rem] resize-y`}
              value={bodyEn}
              onChange={(e) => setBodyEn(e.target.value)}
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Excerpt (Amharic)
            </span>
            <textarea
              className={`${field} amharic min-h-[5rem] resize-y`}
              value={excerptAm}
              onChange={(e) => setExcerptAm(e.target.value)}
              lang="am"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Body (Amharic)
            </span>
            <textarea
              className={`${field} amharic min-h-[8rem] resize-y`}
              value={bodyAm}
              onChange={(e) => setBodyAm(e.target.value)}
              lang="am"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Cover from library
            </span>
            <select
              className={field}
              value={coverFile ? "" : coverImage}
              onChange={(e) => {
                setCoverFile(null);
                setCoverImage(e.target.value);
              }}
              disabled={Boolean(coverFile)}
            >
              {NEWS_COVER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Or upload cover
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className={`${field} file:mr-3 file:border-0 file:bg-brass file:px-3 file:py-1 file:text-charcoal`}
              onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-muted sm:col-span-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Feature this post at the top of News
          </label>
        </div>

        {error ? <p className="text-sm text-ethio-red">{error}</p> : null}
        {success ? <p className="text-sm text-brass">{success}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="min-h-11 px-6 bg-brass text-charcoal uppercase text-sm tracking-[0.16em] disabled:opacity-60"
        >
          {busy ? "Publishing…" : "Publish news"}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ivory">Published posts</h3>
        {!articles.length ? (
          <p className="text-muted text-sm">No news posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => {
              const canDelete = storedIds.includes(article.id);
              return (
                <li
                  key={article.id}
                  className="flex flex-col gap-3 border border-border bg-surface/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-display text-lg text-ivory">
                      {article.title.en}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brass">
                      {article.category}
                      {article.publishedAt ? ` · ${article.publishedAt}` : ""}
                      {article.featured ? " · featured" : ""}
                      {!canDelete ? " · seed" : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/news/${article.slug}`}
                      className="min-h-10 border border-border px-4 text-xs uppercase tracking-[0.16em] text-muted hover:text-ivory inline-flex items-center"
                    >
                      View
                    </Link>
                    {canDelete ? (
                      <button
                        type="button"
                        disabled={busyId === article.id}
                        onClick={() =>
                          void onDelete(article.id, article.title.en)
                        }
                        className="min-h-10 border border-ethio-red/50 px-4 text-xs uppercase tracking-[0.16em] text-ethio-red disabled:opacity-60"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
