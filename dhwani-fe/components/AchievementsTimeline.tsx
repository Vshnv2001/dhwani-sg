import FramedPhoto from "@/components/FramedPhoto";
import MediaCarousel from "@/components/MediaCarousel";
import LotusDivider from "@/components/LotusDivider";
import type { AchievementEntry } from "@/lib/media-types";

type AchievementsTimelineProps = {
  entries: AchievementEntry[];
};

function FeaturedAchievement({ entry }: { entry: AchievementEntry }) {
  const singlePhoto =
    entry.media.length === 1 && entry.media[0].type === "photo" && entry.media[0].src;

  return (
    <section
      className="mx-auto max-w-3xl text-center"
      aria-labelledby={`achievement-${entry.year}-${entry.title}`}
    >
      <h2
        id={`achievement-${entry.year}-${entry.title}`}
        className="font-serif text-4xl font-bold text-red-accent md:text-5xl"
      >
        {entry.year}
      </h2>
      <p className="mt-2 font-serif text-xl font-semibold text-navy md:text-2xl">
        {entry.title}
      </p>
      <LotusDivider />

      {singlePhoto ? (
        <figure className="mx-auto mt-2 max-w-md">
          <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-cyan/20">
            <FramedPhoto
              src={singlePhoto}
              alt={entry.title}
              sizes="(max-width: 768px) 92vw, 28rem"
              priority
            />
          </div>
        </figure>
      ) : (
        <MediaCarousel media={entry.media} label={`${entry.year} — ${entry.title}`} centered />
      )}

      {entry.description && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
          {entry.description}
        </p>
      )}
    </section>
  );
}

function StandardAchievement({ entry }: { entry: AchievementEntry }) {
  return (
    <section aria-labelledby={`achievement-${entry.year}-${entry.title}`}>
      <h2
        id={`achievement-${entry.year}-${entry.title}`}
        className="font-serif text-4xl font-bold text-red-accent md:text-5xl"
      >
        {entry.year}
      </h2>
      <p className="mt-2 font-serif text-xl font-semibold text-navy md:text-2xl">
        {entry.title}
      </p>
      <LotusDivider />

      <MediaCarousel media={entry.media} label={`${entry.year} — ${entry.title}`} />
    </section>
  );
}

export default function AchievementsTimeline({ entries }: AchievementsTimelineProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6">
      {entries.map((entry) =>
        entry.description ? (
          <FeaturedAchievement key={`${entry.year}-${entry.title}`} entry={entry} />
        ) : (
          <StandardAchievement key={`${entry.year}-${entry.title}`} entry={entry} />
        ),
      )}

      <p className="border-t border-cyan/15 pt-10 text-center text-sm italic text-muted">
        More student achievements coming soon.
      </p>
    </div>
  );
}
