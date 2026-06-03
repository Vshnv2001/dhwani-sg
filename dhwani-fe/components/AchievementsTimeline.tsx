import MediaCarousel from "@/components/MediaCarousel";
import LotusDivider from "@/components/LotusDivider";
import type { AchievementEntry } from "@/lib/media-types";

type AchievementsTimelineProps = {
  entries: AchievementEntry[];
};

export default function AchievementsTimeline({ entries }: AchievementsTimelineProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6">
      {entries.map((entry) => (
        <section key={`${entry.year}-${entry.title}`} aria-labelledby={`achievement-${entry.year}-${entry.title}`}>
          <h2
            id={`achievement-${entry.year}-${entry.title}`}
            className="font-serif text-4xl font-bold text-red-accent md:text-5xl"
          >
            {entry.year}
          </h2>
          <p className="mt-2 font-serif text-xl font-semibold text-navy md:text-2xl">
            {entry.title}
          </p>
          {entry.description && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg">
              {entry.description}
            </p>
          )}
          <LotusDivider />

          <MediaCarousel
            media={entry.media}
            label={`${entry.year} — ${entry.title}`}
          />
        </section>
      ))}

      <p className="border-t border-cyan/15 pt-10 text-center text-sm italic text-muted">
        More student achievements coming soon.
      </p>
    </div>
  );
}
