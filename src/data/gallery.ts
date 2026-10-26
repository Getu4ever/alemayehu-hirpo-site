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
    | "archival";
  width: number;
  height: number;
  placeholder?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    src: "/images/artist/alemayehu01.jpeg",
    alt: {
      en: "Alemayehu Hirpo in cream waistcoat and black turtleneck",
      am: "አለማየሁ ሂርጶ በክሬም የወገብ ልብስና ጥቁር ቱርትልኔክ",
    },
    category: "portrait",
    width: 1600,
    height: 1066,
  },
  {
    id: "g02",
    src: "/images/artist/alemayehu02.jpeg",
    alt: {
      en: "Alemayehu Hirpo in formal patterned suit with gold ring",
      am: "አለማየሁ ሂርጶ በይፋዊ ልብስ ከወርቅ ቀለበት ጋር",
    },
    category: "portrait",
    width: 1066,
    height: 1600,
  },
  {
    id: "g03",
    src: "/images/artist/alemayehu03.jpeg",
    alt: {
      en: "Portrait of Alemayehu Hirpo",
      am: "የአለማየሁ ሂርጶ ምስል",
    },
    category: "promo",
    width: 1066,
    height: 1600,
  },
  {
    id: "g04",
    src: "/images/artist/alemayehu04.jpeg",
    alt: {
      en: "Studio portrait of Alemayehu Hirpo",
      am: "የስቱዲዮ ምስል አለማየሁ ሂርጶ",
    },
    category: "studio",
    width: 1066,
    height: 1600,
  },
  {
    id: "g05",
    src: "/images/artist/alemayehu05.jpeg",
    alt: {
      en: "Alemayehu Hirpo promotional photograph",
      am: "የአለማየሁ ሂርጶ የማስተዋወቂያ ፎቶ",
    },
    category: "promo",
    width: 1600,
    height: 1066,
  },
  {
    id: "g06",
    src: "/images/artist/alemayehu06.jpeg",
    alt: {
      en: "Alemayehu Hirpo artistic portrait",
      am: "የአለማየሁ ሂርጶ ጥበባዊ ምስል",
    },
    category: "portrait",
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
  { id: "concert", label: { en: "Concert", am: "ኮንሰርት" } },
  { id: "behind-the-scenes", label: { en: "Behind the Scenes", am: "ከትዕይንት በስተጀርባ" } },
  { id: "archival", label: { en: "Archival", am: "መዝገብ" } },
] as const;
