import MediaCarousel from "@/components/MediaCarousel";
import type { PastWorkEntry } from "@/lib/media-types";

type PastWorkTimelineProps = {
  entries: PastWorkEntry[];
};

export default function PastWorkTimeline({ entries }: PastWorkTimelineProps) {
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="absolute bottom-0 left-[1.65rem] top-0 w-px bg-cyan/30 md:left-[2.15rem]" aria-hidden="true" />

      <ol className="space-y-12">
        {entries.map((entry) => (
          <li key={entry.sortOrder} className="relative pl-12 md:pl-16">
            <div
              className="absolute left-3 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-cyan bg-white md:left-4 md:h-8 md:w-8"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-cyan" />
            </div>

            <time
              dateTime={String(entry.year)}
              className="font-serif text-2xl font-bold text-red-accent md:text-3xl"
            >
              {entry.year}
            </time>

            <h2 className="mt-1 font-serif text-lg font-semibold leading-snug text-navy md:text-xl">
              {entry.title}
            </h2>

            <div className="mt-4">
              <MediaCarousel media={entry.media} label={entry.title} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
