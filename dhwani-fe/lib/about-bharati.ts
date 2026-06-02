import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type BioSection = {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  list?: string[];
  paragraphsAfterList?: string[];
};

type AboutBharatiFile = {
  sections: BioSection[];
};

export function getAboutBharatiSections(): BioSection[] {
  const filePath = path.join(process.cwd(), "content/about-bharati.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as AboutBharatiFile;
  return data.sections;
}
