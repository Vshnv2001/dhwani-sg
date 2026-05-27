"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

type GalleryCarouselProps = {
  images: GalleryImage[];
};

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
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

  const goToPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goToNext = () => scrollToIndex(Math.min(images.length - 1, activeIndex + 1));

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="gallery-scroll flex gap-6 overflow-x-auto px-[max(1.5rem,calc(50%-min(42rem,85vw)/2))] py-4"
        aria-label="Photo gallery"
      >
        {images.map((image, index) => (
          <figure
            key={image.src}
            className="gallery-slide relative flex w-[min(85vw,42rem)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-cyan/20"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 42rem"
                priority={index === 0}
              />
            </div>
            <figcaption className="border-t border-cyan/15 px-6 py-4">
              <p className="font-serif text-lg text-navy">{image.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goToPrev}
          disabled={activeIndex === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/30 bg-white text-navy transition-colors hover:border-cyan hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Gallery slides">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to photo ${index + 1}: ${image.caption}`}
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-cyan"
                  : "w-2.5 bg-cyan/30 hover:bg-cyan/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={activeIndex === images.length - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/30 bg-white text-navy transition-colors hover:border-cyan hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Swipe or scroll horizontally to browse photos
      </p>
    </div>
  );
}
