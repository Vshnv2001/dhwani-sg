import fs from "fs";
import path from "path";

export type GalleryImage = {
  src: string;
  alt: string;
};

const EXCLUDED = new Set(["dhwani_logo.png", "Kamakshi Amman.jpg"]);

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
    .filter((file) => !EXCLUDED.has(file));

  return files.map((file) => ({
    src: `/assets/${file.split("/").map(encodeURIComponent).join("/")}`,
    alt: humanizeFilename(file),
  }));
}
