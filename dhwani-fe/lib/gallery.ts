import fs from "fs";
import path from "path";

export type GalleryImage = {
  src: string;
  alt: string;
};

const EXCLUDED = new Set([
  "dhwani_logo.png",
  "dhwani_logo_original.png",
  "2D Logo without name.png.png",
  "Kamakshi Amman.jpg",
  "kamakshi_amman.jpg",
  "Pravarthika.png",
  "bm_violin_1.jpg",
]);

function isExcluded(filename: string): boolean {
  if (EXCLUDED.has(filename)) return true;
  if (/dhwani.*logo/i.test(filename)) return true;
  return false;
}

function humanizeFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectGalleryImages(dir: string, relativeDir = ""): GalleryImage[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const images: GalleryImage[] = [];

  for (const entry of entries) {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      images.push(...collectGalleryImages(path.join(dir, entry.name), relativePath));
      continue;
    }

    if (!/\.(jpe?g|png)$/i.test(entry.name) || isExcluded(entry.name)) {
      continue;
    }

    images.push({
      src: `/assets/${relativePath.split("/").map(encodeURIComponent).join("/")}`,
      alt: humanizeFilename(entry.name),
    });
  }

  return images;
}

export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public/assets");
  return collectGalleryImages(dir);
}
