import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type TeachingMethodologyEntry = {
  title: string;
  youtubeUrl: string;
  description: string;
};

type TeachingMethodologyFile = {
  teachingMethodology: TeachingMethodologyEntry[];
};

export function getTeachingMethodology(): TeachingMethodologyEntry[] {
  const filePath = path.join(process.cwd(), "content/teaching-methodology.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as TeachingMethodologyFile;
  return data.teachingMethodology;
}
