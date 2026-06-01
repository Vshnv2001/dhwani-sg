import type { Metadata } from "next";
import LotusDivider from "@/components/LotusDivider";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getTeachingMethodology } from "@/lib/teaching-methodology";

export const metadata: Metadata = {
  title: "Teaching Methodology",
  description:
    "Bharati Murali's approach to teaching Carnatic music — gamakas, geetham, and student-centred instruction.",
};

export default function TeachingMethodologyPage() {
  const entries = getTeachingMethodology();

  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          About Bharati Murali
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          Teaching <span className="text-red-accent">Methodology</span>
        </h1>
        <LotusDivider />
        <p className="text-muted">
          A glimpse into how Bharati Murali teaches — nurturing each student with
          precision, patience, and confidence in their potential.
        </p>
      </header>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-14 px-6">
        {entries.map((entry) => (
          <article key={entry.youtubeUrl}>
            <YouTubeEmbed youtubeUrl={entry.youtubeUrl} title={entry.title} />
            <h2 className="mt-5 font-serif text-xl font-semibold text-navy md:text-2xl">
              {entry.title}
            </h2>
            {entry.description.trim() && (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-700 md:text-base">
                {entry.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
