import type { MetadataRoute } from "next";
import { newsArticles } from "@/data/news";
import { events } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.alemayehu-hirpo.com";
  const staticRoutes = [
    "",
    "/about",
    "/music",
    "/videos",
    "/news",
    "/events",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

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
