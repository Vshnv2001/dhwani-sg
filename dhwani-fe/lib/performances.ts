import fs from "fs";
import path from "path";
import { parse } from "yaml";
import type { PerformanceEntry } from "@/lib/media-types";

type PerformancesFile = {
  performances: PerformanceEntry[];
};

export function getPerformances(): PerformanceEntry[] {
  const filePath = path.join(process.cwd(), "content/performances.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as PerformancesFile;
  return data.performances;
}

export { getYouTubeVideoId } from "@/lib/media-types";
