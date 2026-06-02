import type { Metadata } from "next";
import Image from "next/image";
import BioSections from "@/components/BioSections";
import ContactSection from "@/components/ContactSection";
import LotusDivider from "@/components/LotusDivider";
import { getAboutBharatiSections } from "@/lib/about-bharati";

export const metadata: Metadata = {
  title: "About Bharati Murali",
  description:
    "Learn about Bharati Murali — Carnatic vocalist, violinist, composer, founder of Dhwani Music Academy, and creator of Kitchen Kutcheri.",
};

export default function AboutPage() {
  const sections = getAboutBharatiSections();

  return (
    <>
      <div className="mx-auto max-w-4xl bg-white px-6 py-12 md:py-16">
        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan">
            About
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
            Bharati Murali
          </h1>
          <LotusDivider />
          <p className="text-lg text-muted">Founder, Dhwani Music Academy</p>
        </header>

        <div className="mt-10 flex justify-center">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-cyan/30 shadow-md md:h-56 md:w-56">
            <Image
              src="/assets/bm_violin_1.jpg"
              alt="Bharati Murali"
              fill
              className="object-cover object-top"
              sizes="224px"
              priority
            />
          </div>
        </div>

        <BioSections sections={sections} />
      </div>

      <ContactSection />
    </>
  );
}
