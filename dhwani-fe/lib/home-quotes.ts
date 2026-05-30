import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type HomeQuote = {
  name: string;
  role?: string;
  quote: string;
};

type HomeQuotesFile = {
  quotes: HomeQuote[];
};

export function getHomeQuotes(): HomeQuote[] {
  const filePath = path.join(process.cwd(), "content/home-quotes.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as HomeQuotesFile;
  return data.quotes;
}
