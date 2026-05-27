import type { Metadata } from "next";
import GalleryCarousel, { type GalleryImage } from "@/components/GalleryCarousel";
import LotusDivider from "@/components/LotusDivider";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Dhwani Music Academy performances, competitions, and events.",
};

const galleryImages: GalleryImage[] = [
  {
    src: "/assets/bm_violin_1.jpg",
    alt: "Violin performance at Dhwani Music Academy",
    caption: "Violin in performance",
  },
  {
    src: "/assets/bm_students_prizes_1.jpg",
    alt: "Students with competition prizes",
    caption: "Students celebrating competition success",
  },
  {
    src: "/assets/sioc_trainer_1.jpg",
    alt: "SIOC orchestra training with Bharati Murali",
    caption: "Guest trainer at SIOC — orchestra with Salim-Sulaiman",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          Moments &amp; Milestones
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          Gallery
        </h1>
        <LotusDivider />
        <p className="mx-auto max-w-2xl text-muted">
          Performances, competitions, and special collaborations — a glimpse into
          the journey at Dhwani Music Academy.
        </p>
      </header>

      <div className="mt-10">
        <GalleryCarousel images={galleryImages} />
      </div>
    </div>
  );
}
