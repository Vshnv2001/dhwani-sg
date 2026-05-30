import type { Metadata } from "next";
import LocalVideo from "@/components/LocalVideo";
import LotusDivider from "@/components/LotusDivider";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getPerformances } from "@/lib/performances";

export const metadata: Metadata = {
  title: "Student Performances",
  description:
    "Watch Dhwani Music Academy students perform — Carnatic vocal and violin recordings.",
};

function performanceKey(name: string, title?: string, index?: number) {
  return `${name}-${title ?? index}`;
}

export default function PerformancesPage() {
  const performances = getPerformances();

  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          About the Academy
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          Student <span className="text-red-accent">Performances</span>
        </h1>
        <LotusDivider />
        <p className="mx-auto max-w-2xl text-muted">
          Recordings of Dhwani Music Academy students — celebrating their progress
          and love for Carnatic music.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 px-6 md:grid-cols-2">
        {performances.map((performance, index) => (
          <article key={performanceKey(performance.name, performance.title, index)}>
            {performance.youtubeUrl ? (
              <YouTubeEmbed
                youtubeUrl={performance.youtubeUrl}
                title={
                  performance.title
                    ? `${performance.title} — ${performance.name}`
                    : `Performance by ${performance.name}`
                }
              />
            ) : performance.videoSrc ? (
              <LocalVideo
                src={performance.videoSrc}
                title={
                  performance.title
                    ? `${performance.title} — ${performance.name}`
                    : `Performance by ${performance.name}`
                }
              />
            ) : null}
            <h2 className="mt-4 font-serif text-xl font-semibold text-navy">
              {performance.name}
            </h2>
            {performance.title && (
              <p className="mt-1 text-sm text-muted">{performance.title}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
