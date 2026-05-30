import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import LotusDivider from "@/components/LotusDivider";

export const metadata: Metadata = {
  title: "About Bharati Murali",
  description:
    "Learn about Bharati Murali — Carnatic vocalist, violinist, founder of Dhwani Music Academy, and creator of Kitchen Kutcheri.",
};

export default function AboutPage() {
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

        <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-cyan/30 shadow-md md:h-56 md:w-56">
            <Image
              src="/assets/bm_violin_1.jpg"
              alt="Bharati Murali"
              fill
              className="object-cover object-top"
              sizes="224px"
              priority
            />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-neutral-800 md:text-lg">
            <p>
              Bharati Murali is a distinguished Carnatic vocalist and violinist, widely
              recognized for her depth of artistry and pedagogical excellence. She began
              her musical journey under the tutelage of her mother, the late Smt. Saroja
              Sampath, a disciple of Sangita Kalanidhi Dr. S. Ramanathan. She is currently
              under the guidance of Sri Veena Parthasarathy, continuing her advanced
              training in Carnatic music.
            </p>
            <p>
              Beyond Carnatic music, Bharati&apos;s repertoire spans Hindustani, Ghazals,
              fusion, and Jugalbandhi. She actively shares her knowledge through the
              composition and orchestration of pallavis and thillanas, and through
              collaborative performances with leading music schools in Singapore. She is
              the founder of Dhwani Music Academy, where she is celebrated for her
              distinctive teaching methodology that seamlessly blends tradition with
              innovation. Her students consistently excel in competitions across Singapore
              and are frequently invited to perform at temples and in orchestral
              ensembles.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-neutral-800 md:text-lg">
          <p>
            Her popular YouTube channel,{" "}
            <strong className="font-semibold text-navy">Kitchen Kutcheri</strong>, offers
            engaging content on advanced musical concepts, raga identification
            techniques, and the use of classical ragas in film music, interwoven with her
            unique culinary creations.
          </p>
          <p>
            Bharati has trained choirs for SIOC productions and is a regular performer at
            premier venues such as Esplanade and SIFAS. She continues to collaborate on
            prestigious musical showcases, contributing richly to Singapore&apos;s vibrant
            cultural landscape.
          </p>
        </div>
      </div>

      <ContactSection />
    </>
  );
}
