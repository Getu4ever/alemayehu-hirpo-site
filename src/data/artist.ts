export type SocialLink = {
  id: string;
  label: string;
  url: string | null;
  verified: boolean;
};

export type StreamingLink = {
  id: string;
  label: string;
  url: string | null;
  verified: boolean;
};

export type CareerMilestone = {
  year: string;
  title: { en: string; am: string };
  description: { en: string; am: string };
  verified: boolean;
};

/**
 * Central artist profile.
 * Only fields marked verified:true (or linked to verified sources in docs)
 * should be treated as confirmed public facts.
 */
export const artist = {
  name: {
    en: "Alemayehu Hirpo",
    am: "አለማየሁ ሂርጶ",
  },
  alsoKnownAs: ["Alex Hirpo", "አሌክስ ሂርጶ"],
  tagline: {
    en: "The Sound of Ethiopian Soul.",
    am: "የኢትዮጵያ ነፍስ ድምጽ።",
    provisional: true,
  },
  shortBio: {
    en: "Ethiopian singer and songwriter whose distinctive Amharic voice has moved audiences in Ethiopia and across the diaspora.",
    am: "በኢትዮጵያ እና በስደተኛ ማህበረሰብ ዘንድ በሚያንቀሳቅስ አማርኛ ድምጹ የታወቀ ዘፋኝና የዘፈን ጸሐፊ።",
  },
  biography: {
    introduction: {
      en: "Alemayehu Hirpo — widely known as Alex Hirpo — is an Ethiopian vocalist celebrated for a distinctive singing voice and a catalogue of Amharic songs that have resonated with listeners at home and abroad.",
      am: "አለማየሁ ሂርጶ — በብዙዎች ዘንድ አሌክስ ሂርጶ በመባል የሚታወቅ — በልዩ ድምጹና በአማርኛ ዘፈኖቹ በኢትዮጵያና በውጭ አገር የሚኖሩ አድማጮችን ያነቃቃ ዘፋኝ ነው።",
    },
    beginnings: {
      en: "Public profiles describe his career as beginning in the 1990s, with a run of early album releases that established him among Ethiopian music audiences. Exact birthplace, training details, and early band affiliations remain to be confirmed with official materials.",
      am: "የሕዝብ መገለጫዎች የሙዚቃ ሥራው በ1990ዎቹ እንደጀመረ ይገልጻሉ፤ ቀደምት አልበሞች በኢትዮጵያ ሙዚቃ አድማጮች ዘንድ እንዲታወቅ አድርገውታል። የትውልድ ቦታ፣ የሥልጠና ዝርዝርና ቀደምት ባንድ ግንኙነቶች በይፋዊ መረጃ እስኪረጋገጡ ድረስ ይጠበቃሉ።",
    },
    identity: {
      en: "His work is rooted in Ethiopian popular song traditions, with performances and recordings primarily in Amharic. Listeners often associate him with emotionally expressive vocals and melodies that speak to love, longing, and everyday life.",
      am: "ሥራዎቹ በኢትዮጵያ ዘመናዊ የዘፈን ባህል ላይ የተመሠረቱ ሲሆኑ በዋናነት በአማርኛ ይቀርባሉ። አድማጮች ብዙ ጊዜ ከስሜታዊ ድምጽና ከፍቅር፣ ከናፍቆትና ከዕለት ተዕለት ሕይወት ጋር ከሚገናኙ ዜማዎች ጋር ያገናኙታል።",
    },
    notableWorks: {
      en: "His best-known release in major digital catalogues is the collaborative album Evangadi with Gossaye Tesfaye (originally dated 2004 on Apple Music). Songs associated with that era and catalogue include Bayetware, Yasebshale, Gena Ahune, and others. Additional titles appear across lyric sites and streaming platforms; full discography verification is ongoing.",
      am: "በዋና ዲጂታል ካታሎጎች ውስጥ በብዛት የሚታወቀው ሥራ ከጎሳዬ ተስፋዬ ጋር የተሰራው ኤቫንጋዲ አልበም ነው (በአፕል ሙዚክ 2004 ተብሎ የተመዘገበ)። ከዚያ ዘመን ጋር የሚያያዙ ዘፈኖች ባይተዋር፣ ያስብሻል፣ ገና አሁን እና ሌሎችን ያካትታሉ።",
    },
    connection: {
      en: "Through recordings and performances, Alemayehu Hirpo has remained part of the soundtrack for Ethiopian communities worldwide — a bridge between local musical language and diaspora memory.",
      am: "በቀረጻና በቀጥታ ትርኢቶች አለማየሁ ሂርጶ ለዓለም አቀፍ የኢትዮጵያ ማህበረሰቦች የሙዚቃ ድምጽ ሆኖ ቆይቷል — የአገር ቋንቋንና የስደተኛ ማስታወሻን የሚያገናኝ ድልድይ።",
    },
  },
  images: {
    // High-res cutout from alemayehu03 for homepage hero
    hero: "/images/hero/alemayehu03-hero.png",
    portrait: "/images/artist/alemayehu01.jpeg",
    about: "/images/artist/alemayehu02.jpeg",
    og: "/images/artist/alemayehu05.jpeg",
    gallery: [
      "/images/artist/alemayehu01.jpeg",
      "/images/artist/alemayehu02.jpeg",
      "/images/artist/alemayehu03.jpeg",
      "/images/artist/alemayehu04.jpeg",
      "/images/artist/alemayehu05.jpeg",
      "/images/artist/alemayehu06.jpeg",
      "/images/artist/alemayehu07.jpeg",
      "/images/artist/alemayehu08.jpeg",
    ],
  },
  social: [
    {
      id: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@AlemayehuHirpoET",
      verified: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/alemayehuhirpo2024",
      verified: true,
    },
    {
      id: "soundcloud",
      label: "SoundCloud",
      // Alex Hirpo's artist profile (not a search results page)
      url: "https://soundcloud.com/alemayehu_hirpo",
      verified: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      url: null,
      verified: false,
    },
    {
      id: "tiktok",
      label: "TikTok",
      url: null,
      verified: false,
    },
  ] as SocialLink[],
  streaming: [
    {
      id: "apple-music",
      label: "Apple Music",
      url: "https://music.apple.com/us/artist/alemayehu-hirpo/1449064593",
      verified: true,
    },
    {
      id: "soundcloud",
      label: "SoundCloud",
      url: "https://soundcloud.com/alemayehu_hirpo",
      verified: true,
    },
    {
      id: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@AlemayehuHirpoET",
      verified: true,
    },
    {
      id: "spotify",
      label: "Spotify",
      url: null,
      verified: false,
    },
  ] as StreamingLink[],
  contact: {
    bookingEmail: null as string | null,
    mediaEmail: null as string | null,
    generalEmail: null as string | null,
    phone: null as string | null,
    management: null as string | null,
  },
  milestones: [
    {
      year: "1990s",
      title: {
        en: "Career beginnings",
        am: "የሙዚቃ ሥራ መጀመሪያ",
      },
      description: {
        en: "Public artist profiles place the start of his recording career in the 1990s, with consecutive early album releases. Exact titles and dates for those early albums await official confirmation.",
        am: "የሕዝብ መገለጫዎች የቀረጻ ሥራው በ1990ዎቹ እንደጀመረ ይገልጻሉ። የቀደምት አልበሞች ርዕሶችና ቀኖች በይፋዊ መረጃ ይረጋገጣሉ።",
      },
      verified: false,
    },
    {
      year: "2004",
      title: {
        en: "Evangadi album",
        am: "ኤቫንጋዲ አልበም",
      },
      description: {
        en: "Collaborative album Evangadi with Gossaye Tesfaye listed on Apple Music with a May 1, 2004 release date (13 songs). A later catalogue listing also appears under 2018.",
        am: "ከጎሳዬ ተስፋዬ ጋር የተሰራው ኤቫንጋዲ አልበም በአፕል ሙዚክ ላይ በግንቦት 1፣ 2004 የተለቀቀ ሆኖ ተመዝግቧል (13 ዘፈኖች)።",
      },
      verified: true,
    },
    {
      year: "Ongoing",
      title: {
        en: "Digital catalogue presence",
        am: "ዲጂታል ካታሎግ መኖር",
      },
      description: {
        en: "Tracks and artist pages remain available on Apple Music and SoundCloud, keeping the music accessible to new and longtime listeners.",
        am: "ዘፈኖችና የአርቲስት ገጾች በአፕል ሙዚክና በሳውንድክላውድ ላይ ይገኛሉ።",
      },
      verified: true,
    },
  ] as CareerMilestone[],
} as const;

export type Artist = typeof artist;
