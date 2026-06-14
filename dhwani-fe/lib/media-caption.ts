import type { MediaItem } from "@/lib/media-types";

function humanizeFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getMediaCaption(item: MediaItem): string {
  const caption = item.caption?.trim();
  if (caption) return caption;

  if (item.src) {
    const filename = decodeURIComponent(item.src.split("/").pop() ?? "");
    return humanizeFilename(filename) || "Photo";
  }

  return "Video";
}
