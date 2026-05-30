export type MediaItem = {
  type: "photo" | "video" | "youtube";
  caption: string;
  src?: string;
  url?: string;
};

export type PastWorkEntry = {
  year: number;
  sortOrder: number;
  title: string;
  media: MediaItem[];
};

export type AchievementEntry = {
  year: number;
  sortOrder?: number;
  title: string;
  media: MediaItem[];
};

export type PerformanceEntry = {
  name: string;
  title?: string;
  youtubeUrl?: string;
  videoSrc?: string;
};

export function getYouTubeVideoId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\s?/]+)/,
  );
  return match?.[1] ?? url;
}
