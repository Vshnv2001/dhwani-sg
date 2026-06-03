"use client";

import { MediaSlide } from "@/components/MediaSlide";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media-types";

type MediaCarouselProps = {
  media: MediaItem[];
  label: string;
  centered?: boolean;
};

export default function MediaCarousel({ media, label, centered = false }: MediaCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const slides = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(containerCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    updateActiveIndex();

    return () => container.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slide = container.children[index] as HTMLElement | undefined;
    if (!slide) return;

    container.scrollTo({
      left: slide.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const showControls = media.length > 1;
  const activeCaption = media[activeIndex]?.caption ?? "";

  return (
    <div className={centered ? "mx-auto max-w-2xl" : undefined}>
      <div
        ref={scrollRef}
        className={`gallery-scroll flex gap-4 overflow-x-auto py-2 ${
          centered && !showControls ? "justify-center" : ""
        }`}
        aria-label={label}
      >
        {media.map((item, index) => (
          <figure
            key={`${item.src ?? item.url}-${index}`}
            className="gallery-slide w-[min(92vw,40rem)] shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-cyan/20"
          >
            <MediaSlide item={item} priority={index === 0} />
          </figure>
        ))}
      </div>

      <p className="mt-3 min-h-[1.25rem] text-center text-sm text-muted">{activeCaption}</p>

      {showControls && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/30 text-navy transition-colors hover:border-cyan hover:bg-cyan/10 disabled:opacity-40"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {media.map((item, index) => (
              <button
                key={`dot-${item.src ?? item.url}-${index}`}
                type="button"
                aria-label={`Slide ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-cyan" : "w-2 bg-cyan/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(media.length - 1, activeIndex + 1))}
            disabled={activeIndex === media.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/30 text-navy transition-colors hover:border-cyan hover:bg-cyan/10 disabled:opacity-40"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
