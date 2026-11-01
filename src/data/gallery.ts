export type GalleryItem = {
  id: string;
  src: string;
  alt: { en: string; am: string };
  category:
    | "portrait"
    | "concert"
    | "studio"
    | "promo"
    | "behind-the-scenes"
    | "archival"
    | "fans";
  width: number;
  height: number;
  placeholder?: boolean;
};

/** Curated official set — fewer frames, stronger presence. */
export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    src: "/images/artist/alemayehu01.jpeg",
    alt: {
      en: "Alemayehu Hirpo in cream waistcoat — studio portrait",
      am: "አለማየሁ ሂርጶ በክሬም የወገብ ልብስ — የስቱዲዮ ምስል",
    },
    category: "portrait",
    width: 1600,
    height: 1066,
  },
  {
    id: "g02",
    src: "/images/artist/alemayehu02.jpeg",
    alt: {
      en: "Alemayehu Hirpo in formal patterned suit",
      am: "አለማየሁ ሂርጶ በይፋዊ ልብስ",
    },
    category: "portrait",
    width: 1066,
    height: 1600,
  },
  {
    id: "g03",
    src: "/images/artist/alemayehu03.jpeg",
    alt: {
      en: "Close portrait of Alemayehu Hirpo",
      am: "የአለማየሁ ሂርጶ ቅርብ ምስል",
    },
    category: "promo",
    width: 1066,
    height: 1600,
  },
  {
    id: "g05",
    src: "/images/artist/alemayehu05.jpeg",
    alt: {
      en: "Alemayehu Hirpo — promotional photograph",
      am: "አለማየሁ ሂርጶ — የማስተዋወቂያ ፎቶ",
    },
    category: "promo",
    width: 1600,
    height: 1066,
  },
  {
    id: "g07",
    src: "/images/artist/alemayehu07.jpeg",
    alt: {
      en: "Alemayehu Hirpo portrait session",
      am: "የአለማየሁ ሂርጶ የፎቶ ክፍለ ጊዜ",
    },
    category: "studio",
    width: 1066,
    height: 1600,
  },
  {
    id: "g08",
    src: "/images/artist/alemayehu08.jpeg",
    alt: {
      en: "Alemayehu Hirpo formal portrait",
      am: "የአለማየሁ ሂርጶ ይፋዊ ምስል",
    },
    category: "portrait",
    width: 1066,
    height: 1600,
  },
];

export const galleryCategories = [
  { id: "all", label: { en: "All", am: "ሁሉም" } },
  { id: "portrait", label: { en: "Portraits", am: "ምስሎች" } },
  { id: "promo", label: { en: "Promotional", am: "ማስተዋወቂያ" } },
  { id: "studio", label: { en: "Studio", am: "ስቱዲዮ" } },
  { id: "fans", label: { en: "From Fans", am: "ከደጋፊዎች" } },
] as const;
