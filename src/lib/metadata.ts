import type { Metadata } from "next";
import { artist } from "@/data/artist";

const siteName = "Alemayehu Hirpo";

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const isHome = title === siteName;
  const shareTitle = isHome
    ? `${artist.name.en} | ${artist.name.am}`
    : `${title} | ${siteName}`;

  return {
    // Root layout applies `template: "%s | Alemayehu Hirpo"` for inner pages.
    title: isHome
      ? { absolute: shareTitle }
      : title,
    description,
    openGraph: {
      title: shareTitle,
      description,
      siteName,
      locale: "en_US",
      alternateLocale: ["am_ET"],
      type: "website",
      images: [
        {
          url: artist.images.og,
          width: 1200,
          height: 630,
          alt: `${artist.name.en} — ${artist.name.am}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [artist.images.og],
    },
    alternates: {
      canonical: path || "/",
    },
  };
}
