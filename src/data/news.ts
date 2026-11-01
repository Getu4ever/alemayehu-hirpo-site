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

export const newsArticles: NewsArticle[] = [
  {
    id: "new-album-2026",
    slug: "alemayehu-hirpo-working-on-new-album-2026",
    title: {
      en: "Alemayehu Hirpo Is Working on a New Album",
      am: "አለማየሁ ሂርጶ አዲስ አልበም ላይ እየሰራ ነው",
    },
    excerpt: {
      en: "Fresh studio work is underway. The new album is expected sometime this year — more details to follow.",
      am: "አዲስ የስቱዲዮ ሥራ በሂደት ላይ ነው። አልበሙ በዚህ ዓመት እንደሚወጣ ይጠበቃል — ተጨማሪ ዝርዝር ይከተላል።",
    },
    body: {
      en: `Alemayehu Hirpo is back in the studio, crafting a new album for fans of Ethiopian soul and diaspora music.

The project is still in progress, with writing and recording sessions underway. While a precise release date has not been announced yet, the album is planned for release sometime this year.

Stay tuned to this site, and to Alemayehu’s official channels, for the first singles, artwork, and tour news as they are confirmed.

Thank you for your patience and continued support — the new music is coming.`,
      am: `አለማየሁ ሂርጶ ወደ ስቱዲዮ ተመልሶ ለኢትዮጵያዊ ነፍስ ሙዚቃ እና ለስደተኛ ማህበረሰብ አድናቂዎች አዲስ አልበም እየሰራ ነው።

ፕሮጀክቱ አሁንም በሂደት ላይ ሲሆን የጽሁፍና የቀረጻ ክፍለ ጊዜያት እየተካሄዱ ናቸው። ትክክለኛ የመውጫ ቀን ገና አልተገለጸም፤ አልበሙ ግን በዚህ ዓመት እንደሚለቀቅ ታቅዷል።

የመጀመሪያ ነጠላ ዘፈኖች፣ የሥዕል ሥራ እና የጉብኝት ዜና ሲረጋገጡ በዚህ ድረ-ገጽ እና በአለማየሁ ይፋዊ ቻናሎች ይከታተሉ።

ለትዕግስትዎ እና ቀጣይ ድጋፍዎ እናመሰግናለን — አዲሱ ሙዚቃ በመንገድ ላይ ነው።`,
    },
    coverImage: "/images/artist/alemayehu03.jpeg",
    publishedAt: "2026-11-01",
    category: "release",
    featured: true,
    verified: true,
  },
];

export function getFeaturedArticle() {
  return newsArticles.find((a) => a.featured) ?? newsArticles[0];
}

export function getArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}
