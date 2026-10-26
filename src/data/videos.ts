export type VideoCategory =
  | "music-video"
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

export const videos: Video[] = [
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
    youtubeId: "lXQHgR2qqpo",
    thumbnail: "https://i.ytimg.com/vi/lXQHgR2qqpo/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=lXQHgR2qqpo",
    releaseDate: null,
    featured: true,
    verified: true,
  },
];

export const videoCategories: {
  id: VideoCategory | "all";
  label: { en: string; am: string };
}[] = [
  { id: "all", label: { en: "All", am: "ሁሉም" } },
  { id: "music-video", label: { en: "Music Videos", am: "ሙዚቃ ቪዲዮዎች" } },
  { id: "lyric", label: { en: "Lyric Videos", am: "የግጥም ቪዲዮዎች" } },
  { id: "live", label: { en: "Live", am: "ቀጥታ" } },
  { id: "interview", label: { en: "Interviews", am: "ቃለ መጠይቆች" } },
  {
    id: "behind-the-scenes",
    label: { en: "Behind the Scenes", am: "ከትዕይንት በስተጀርባ" },
  },
];

export function getFeaturedVideo() {
  return videos.find((v) => v.featured) ?? videos[0];
}
