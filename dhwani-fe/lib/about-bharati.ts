import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type BioSubsection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type BioSection = {
  title: string;
  subtitle?: string;
  link?: { label: string; url: string };
  paragraphs?: string[];
  list?: string[];
  paragraphsAfterList?: string[];
  subsections?: BioSubsection[];
};

type AboutBharatiFile = {
  titleLine: string;
  intro: string;
  sections: BioSection[];
};

export function getAboutBharati() {
  const filePath = path.join(process.cwd(), "content/about-bharati.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as AboutBharatiFile;
  return data;
}

export function getAboutBharatiSections(): BioSection[] {
  return getAboutBharati().sections;
}
