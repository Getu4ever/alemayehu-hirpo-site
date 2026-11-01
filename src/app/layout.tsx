import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Ethiopic } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { artist } from "@/data/artist";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ethiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alemayehuhirpo.com"),
  title: {
    default: `${artist.name.en} | ${artist.name.am}`,
    template: `%s | ${artist.name.en}`,
  },
  description: artist.shortBio.en,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: `${artist.name.en} | ${artist.name.am}`,
    description: artist.shortBio.en,
    siteName: artist.name.en,
    type: "website",
    images: [
      {
        url: artist.images.og,
        width: 1600,
        height: 1066,
        alt: `${artist.name.en} — ${artist.name.am}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${artist.name.en} | ${artist.name.am}`,
    description: artist.shortBio.en,
    images: [artist.images.og],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${ethiopic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
