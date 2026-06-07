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

export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public/assets");
  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .filter((file) => !isExcluded(file));

  return files.map((file) => ({
    src: `/assets/${file.split("/").map(encodeURIComponent).join("/")}`,
    alt: humanizeFilename(file),
  }));
}
