import fs from "fs";
import path from "path";
import { parse } from "yaml";
import type { PastWorkEntry } from "@/lib/media-types";

type PastWorkFile = {
  pastWork: PastWorkEntry[];
};

export function getPastWork(): PastWorkEntry[] {
  const filePath = path.join(process.cwd(), "content/past-work.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as PastWorkFile;
  return data.pastWork.sort((a, b) => b.year - a.year || a.sortOrder - b.sortOrder);
}
