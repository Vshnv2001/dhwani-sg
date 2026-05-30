import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import LotusDivider from "@/components/LotusDivider";
import PhotoGrid from "@/components/PhotoGrid";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Dhwani Music Academy — performances, competitions, workshops, and more.",
};

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <>
      <div className="mx-auto max-w-6xl bg-white px-6 py-12 md:py-16">
        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan">
            Dhwani Music Academy
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
            Photo <span className="text-red-accent">Gallery</span>
          </h1>
          <LotusDivider />
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Moments from performances, competitions, workshops, and academy life.
          </p>
        </header>

        <div className="mt-12">
          <PhotoGrid images={images} />
        </div>
      </div>

      <ContactSection />
    </>
  );
}
