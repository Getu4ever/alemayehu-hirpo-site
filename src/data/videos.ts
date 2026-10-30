export type VideoCategory =
  | "music-video"
  | "new-single"
  | "lyric"
  | "live"
  | "interview"
  | "behind-the-scenes"
  | "other";

export type Video = {
  id: string;
  title: { en: string; am?: string };
  description: { en: string; am: string };
  category: VideoCategory;
  thumbnail: string;
  youtubeUrl: string | null;
  youtubeId?: string;
  releaseDate: string | null;
  featured?: boolean;
  verified: boolean;
};

function yt(id: string) {
  return {
    youtubeId: id,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
  };
}

export const videos: Video[] = [
  {
    id: "temechesh-wey-mv",
    title: {
      en: "Temechesh Wey (Official Video)",
      am: "ተመቸሽ ወይ (ኦፊሴላዊ ቪዲዮ)",
    },
    description: {
      en: "Fan-favourite official music video for Temechesh Wey — one of Alemayehu Hirpo’s most loved visual performances.",
      am: "ተመቸሽ ወይ ኦፊሴላዊ ሙዚቃ ቪዲዮ — በደጋፊዎች በጣም የተወደደው የአለማየሁ ሂርጶ ምስላዊ ሥራ።",
    },
    category: "music-video",
    ...yt("acslEFdNMZw"),
    releaseDate: null,
    featured: true,
    verified: true,
  },
  {
    id: "ye-ethiopia-enatoch",
    title: {
      en: "Ye'Ethiopia Enatoch (Official Music Video)",
      am: "የኢትዮጵያ እናቶች (ኦፊሴላዊ ሙዚቃ ቪዲዮ)",
    },
    description: {
      en: "New single — official music video for Ye'Ethiopia Enatoch.",
      am: "አዲስ ሲንግል — የኢትዮጵያ እናቶች ኦፊሴላዊ ሙዚቃ ቪዲዮ።",
    },
    category: "new-single",
    ...yt("bN7EOD56wAQ"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "des-yilal",
    title: {
      en: "Des Yilal (Official Lyrics Video)",
      am: "ደስ ይላል (የግጥም ቪዲዮ)",
    },
    description: {
      en: "New single — official lyrics video for Des Yilal.",
      am: "አዲስ ሲንግል — ደስ ይላል ኦፊሴላዊ የግጥም ቪዲዮ።",
    },
    category: "new-single",
    ...yt("dktByHuKcrs"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "atmaylegn",
    title: {
      en: "Atmaylegn (Official Lyrics Video)",
      am: "አትማይልኝ (የግጥም ቪዲዮ)",
    },
    description: {
      en: "New single — official lyrics video for Atmaylegn.",
      am: "አዲስ ሲንግል — አትማይልኝ ኦፊሴላዊ የግጥም ቪዲዮ።",
    },
    category: "new-single",
    ...yt("dk9N-zCxSIE"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "atmechim-woy",
    title: {
      en: "Atmechim Woy (Official Lyrics Video)",
      am: "አትመጪም ወይ (የግጥም ቪዲዮ)",
    },
    description: {
      en: "New single — official lyrics video for Atmechim Woy.",
      am: "አዲስ ሲንግል — አትመጪም ወይ ኦፊሴላዊ የግጥም ቪዲዮ።",
    },
    category: "new-single",
    ...yt("AAljb-FgtOs"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "baytewar-lyrics",
    title: {
      en: "Baytewar (with Lyrics)",
      am: "ባይተዋር (ከግጥም ጋር)",
    },
    description: {
      en: "Official lyric video for Baytewar — one of Alemayehu Hirpo’s signature songs from the Evangadi era.",
      am: "ባይተዋር የግጥም ቪዲዮ — ከኤቫንጋዲ ዘመን የአለማየሁ ሂርጶ ታዋቂ ዘፈኖች አንዱ።",
    },
    category: "lyric",
    ...yt("lXQHgR2qqpo"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "kifushen-alefelegem-lyrics",
    title: {
      en: "Kifushen Alefelegem (Official Lyrics Video)",
      am: "ክፉሽን አልፈልግም (የግጥም ቪዲዮ)",
    },
    description: {
      en: "Official lyrics video for Kifushen Alefelegem.",
      am: "ክፉሽን አልፈልግም ኦፊሴላዊ የግጥም ቪዲዮ።",
    },
    category: "lyric",
    ...yt("0KqXYLFvu6o"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "bemelkesh-ayedelem-lyrics",
    title: {
      en: "Bemelkesh Ayedelem (Official Lyrics Video)",
      am: "በመልክሽ አይደለም (የግጥም ቪዲዮ)",
    },
    description: {
      en: "Official lyrics video for Bemelkesh Ayedelem.",
      am: "በመልክሽ አይደለም ኦፊሴላዊ የግጥም ቪዲዮ።",
    },
    category: "lyric",
    ...yt("ECSHdoUfYwU"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "interview-seifu-baytewar",
    title: {
      en: "Interview on Seifu — Baytewar & Exile Years",
      am: "ከሰይፉ ጋር ቃለ መጠይቅ — ባይተዋርና የስደት ዓመታት",
    },
    description: {
      en: "Alemayehu Hirpo speaks with Seifu about Baytewar and nearly two decades in exile.",
      am: "አለማየሁ ሂርጶ ከሰይፉ ጋር ስለ ባይተዋርና በስደት ስለተገኙ ዓመታት ይናገራል።",
    },
    category: "interview",
    ...yt("_AJGebIsf1U"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "interview-shai-seat",
    title: {
      en: "Tea Time Interview — Artist Alemayehu Hirpo",
      am: "የሻይ ሰዓት ቃለ መጠይቅ — አርቲስት አለማየሁ ሂርጶ",
    },
    description: {
      en: "Saturday afternoon conversation on life, music, and moments that tested him.",
      am: "በቅዳሜ ከሰዓት ስለ ሕይወት፣ ሙዚቃ እና ስላሳለፈባቸው ጊዜያት የተደረገ ውይይት።",
    },
    category: "interview",
    ...yt("6AudwDV1TfU"),
    releaseDate: null,
    verified: true,
  },
  {
    id: "interview-ethiopikalink",
    title: {
      en: "Ethiopikalink Interview — Alemayehu Hirpo",
      am: "የኢትዮጲካሊንክ ቃለ ምልልስ — ዓለማየሁ ሂርጶ",
    },
    description: {
      en: "In-depth Ethiopikalink interview on survival, music, and resilience.",
      am: "በኢትዮጲካሊንክ የተደረገ ጥልቅ ቃለ ምልልስ ስለ ሕይወት፣ ሙዚቃና ጽናት።",
    },
    category: "interview",
    ...yt("_486xH5AqOY"),
    releaseDate: null,
    verified: true,
  },
];

/** Live performance clips — shown on /events under Past Performances */
export const pastPerformanceVideos: Video[] = [
  {
    id: "baytewar-live-2025",
    title: {
      en: "Baytewar — Live Performance",
      am: "ባይተዋር — ቀጥታ ትርኢት",
    },
    description: {
      en: "Live performance of Baytewar (2025).",
      am: "ባይተዋር ቀጥታ ትርኢት (2025)።",
    },
    category: "live",
    ...yt("r7KtO1G0J0g"),
    releaseDate: "2025",
    verified: true,
  },
  {
    id: "temechesh-wey-live-2025",
    title: {
      en: "Temechesh Wey — Live Performance",
      am: "ተመቸሽ ወይ — ቀጥታ ትርኢት",
    },
    description: {
      en: "Live performance of Temechesh Wey (2025).",
      am: "ተመቸሽ ወይ ቀጥታ ትርኢት (2025)።",
    },
    category: "live",
    ...yt("Z6u9choU3dA"),
    releaseDate: "2025",
    verified: true,
  },
  {
    id: "shalala-live-2025",
    title: {
      en: "Shalala — Live Performance",
      am: "ሻላላ — ቀጥታ ትርኢት",
    },
    description: {
      en: "Live performance of Shalala (2025).",
      am: "ሻላላ ቀጥታ ትርኢት (2025)።",
    },
    category: "live",
    ...yt("qVZNiNtVuFg"),
    releaseDate: "2025",
    verified: true,
  },
  {
    id: "yasebeshal-live-2025",
    title: {
      en: "Yasebeshal — Live Performance",
      am: "ያስብሻል — ቀጥታ ትርኢት",
    },
    description: {
      en: "Live performance of Yasebeshal (2025).",
      am: "ያስብሻል ቀጥታ ትርኢት (2025)።",
    },
    category: "live",
    ...yt("4l7yULsiBOQ"),
    releaseDate: "2025",
    verified: true,
  },
  {
    id: "lebego-new-live-2025",
    title: {
      en: "Lebego New — Live Performance",
      am: "ለበጎ ነው — ቀጥታ ትርኢት",
    },
    description: {
      en: "Live performance of Lebego New (2025).",
      am: "ለበጎ ነው ቀጥታ ትርኢት (2025)።",
    },
    category: "live",
    ...yt("8tBE4V8MqkA"),
    releaseDate: "2025",
    verified: true,
  },
  {
    id: "man-biye-litrash-tv",
    title: {
      en: "Man Biye Litrash — TV Studio Live",
      am: "ማን ብዬ ልጥራሽ — የቴሌቪዥን ስቱዲዮ ቀጥታ",
    },
    description: {
      en: "Television studio live performance of Man Biye Litrash.",
      am: "ማን ብዬ ልጥራሽ በቴሌቪዥን ስቱዲዮ የተደረገ ቀጥታ ትርኢት።",
    },
    category: "live",
    ...yt("XehisqSYny0"),
    releaseDate: null,
    verified: true,
  },
];

export const videoCategories: {
  id: VideoCategory | "all";
  label: { en: string; am: string };
}[] = [
  { id: "all", label: { en: "All", am: "ሁሉም" } },
  { id: "new-single", label: { en: "New Singles", am: "አዲስ ሲንግሎች" } },
  { id: "music-video", label: { en: "Music Videos", am: "ሙዚቃ ቪዲዮዎች" } },
  { id: "lyric", label: { en: "Lyric Videos", am: "የግጥም ቪዲዮዎች" } },
  { id: "interview", label: { en: "Interviews", am: "ቃለ መጠይቆች" } },
  {
    id: "behind-the-scenes",
    label: { en: "Behind the Scenes", am: "ከትዕይንት በስተጀርባ" },
  },
];

export function getFeaturedVideo() {
  return videos.find((v) => v.featured) ?? videos[0];
}
