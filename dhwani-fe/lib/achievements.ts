import fs from "fs";
import path from "path";
import { parse } from "yaml";
import type { AchievementEntry } from "@/lib/media-types";

type AchievementsFile = {
  achievements: AchievementEntry[];
};

export function getAchievements(): AchievementEntry[] {
  const filePath = path.join(process.cwd(), "content/achievements.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as AchievementsFile;
  return data.achievements.sort(
    (a, b) => b.year - a.year || (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
}
