export type Track = {
  number: number;
  title: { en: string; am?: string };
  duration?: string;
  /** SoundCloud permalink — preferred playable source */
  soundcloudUrl?: string;
  /** YouTube video id — fallback when SoundCloud is unavailable */
  youtubeId?: string;
};

export type Release = {
  id: string;
  title: { en: string; am?: string };
  type: "album" | "single" | "ep" | "collaboration";
  year: number | null;
  releaseDate?: string;
  coverImage: string;
  description: { en: string; am: string };
  artists?: string[];
  tracks?: Track[];
  streaming: {
    appleMusic?: string | null;
    spotify?: string | null;
    soundcloud?: string | null;
    youtube?: string | null;
  };
  featured?: boolean;
  verified: boolean;
};

export const releases: Release[] = [
  {
    id: "evangadi",
    title: { en: "Evangadi", am: "ኤቫንጋዲ" },
    type: "collaboration",
    year: 2004,
    releaseDate: "2004-05-01",
    coverImage: "/images/albums/evangadi.jpg",
    description: {
      en: "A cornerstone of Alemayehu Hirpo’s catalogue — the collaborative album with Gossaye Tesfaye that carried Amharic soul into living rooms across Ethiopia and the diaspora. Thirteen songs of longing, celebration, and unmistakable voice. Start with Bayetware, then let the record unfold.",
      am: "የአለማየሁ ሂርጶ ካታሎግ ዋና ምሰሶ — ከጎሳዬ ተስፋዬ ጋር የተሰራው አልበም አማርኛ ነፍስን ወደ ኢትዮጵያና ስደተኛ መኖሪያ ቤቶች አደረሰ። አሥራ ሦስት የናፍቆት፣ የበዓል እና የማይረሳ ድምጽ ዘፈኖች። በባይተዋር ጀምረው አልበሙን ይከተሉ።",
    },
    artists: ["Gossaye Tesfaye", "Alemayehu Hirpo"],
    tracks: [
      {
        number: 1,
        title: { en: "Bayetware", am: "ባይተዋር" },
        duration: "5:39",
        soundcloudUrl: "https://soundcloud.com/alemayehu_hirpo/baytewar",
        youtubeId: "lXQHgR2qqpo",
      },
      {
        number: 2,
        title: { en: "Yasebshale", am: "ያስብሻል" },
        duration: "6:44",
        soundcloudUrl: "https://soundcloud.com/alemayehu_hirpo/yasbeshal",
        youtubeId: "J4C3v79dwiQ",
      },
      {
        number: 3,
        title: { en: "Ataker Keri", am: "አታቀርቅሪ" },
        duration: "5:16",
        youtubeId: "g86Lg26G5E0",
      },
      {
        number: 4,
        title: { en: "Gena Ahune", am: "ገና አሁን" },
        duration: "5:13",
        youtubeId: "_2w7D5FtJhs",
      },
    ],
    streaming: {
      appleMusic: "https://music.apple.com/us/album/evangadi/1449995177",
      spotify: null,
      soundcloud: "https://soundcloud.com/alemayehu_hirpo/sets/alemayehu-hirpo",
      youtube: "https://www.youtube.com/@AlemayehuHirpoET",
    },
    featured: true,
    verified: true,
  },
  {
    id: "tarik-tesera",
    title: { en: "Tarik Tesera", am: "ታሪክ ተሠራ" },
    type: "album",
    year: null,
    coverImage: "/images/placeholders/album-cover.svg",
    description: {
      en: "Referenced on Ethio Zeima in connection with the song Temechesh Woy. Full tracklist, year, and official artwork require confirmation before treating this as a complete discography entry.",
      am: "በኢትዮ ዜማ ላይ ከተመጨሽ ወይ ዘፈን ጋር ተጠቅሷል። ሙሉ የዘፈን ዝርዝር፣ ዓመትና ሽፋን ጥበብ ማረጋገጫ ይጠይቃል።",
    },
    tracks: [
      {
        number: 1,
        title: { en: "Temechesh Woy", am: "ተመጨሽ ወይ" },
      },
    ],
    streaming: {
      appleMusic: null,
      spotify: null,
      soundcloud: null,
      youtube: null,
    },
    featured: false,
    verified: false,
  },
];

/** Individual tracks surfaced from SoundCloud / Apple Music listings */
export const highlightedTracks = [
  {
    id: "bayetware",
    title: { en: "Bayetware", am: "ባይተዋር" },
    releaseId: "evangadi",
    year: 2004,
    verified: true,
  },
  {
    id: "yasebshale",
    title: { en: "Yasebshale", am: "ያስብሻል" },
    releaseId: "evangadi",
    year: 2004,
    verified: true,
  },
  {
    id: "gena-ahune",
    title: { en: "Gena Ahune", am: "ገና አሁን" },
    releaseId: "evangadi",
    year: 2004,
    verified: true,
  },
  {
    id: "yasbeshal-sc",
    title: { en: "Yasbeshal", am: "ያስብሻል" },
    releaseId: null,
    year: null,
    soundcloud: true,
    verified: true,
  },
] as const;

export function getFeaturedRelease() {
  return releases.find((r) => r.featured) ?? releases[0];
}

export function getReleaseById(id: string) {
  return releases.find((r) => r.id === id);
}
