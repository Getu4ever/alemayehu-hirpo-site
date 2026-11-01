import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { events } from "@/data/events";
import { getAllNewsArticles } from "@/lib/news-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = "https://www.alemayehu-hirpo.com";
  const staticRoutes = [
    "",
    "/about",
    "/music",
    "/tour",
    "/videos",
    "/news",
    "/events",
    "/shop",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const newsArticles = await getAllNewsArticles();
  const newsRoutes = newsArticles.map((article) => ({
    url: `${base}/news/${article.slug}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${base}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
