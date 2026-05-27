import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import CurriculumList from "@/components/CurriculumList";
import LotusDivider from "@/components/LotusDivider";
import { classFormats, curriculum, teacherIntro } from "@/lib/academy-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bharati Murali, Carnatic vocalist and violinist at Dhwani Music Academy in Singapore.",
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl bg-white px-6 py-12 md:py-16">
        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan">
            About the Academy
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
            Bharati Murali
          </h1>
          <LotusDivider />
          <p className="text-lg text-muted">Founder, Dhwani Music Academy</p>
        </header>

        <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-cyan/30 shadow-md">
            <Image
              src="/assets/bm_violin_1.jpg"
              alt="Bharati Murali"
              fill
              className="object-cover object-top"
              sizes="192px"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg leading-relaxed text-neutral-800">{teacherIntro}</p>
            <div className="mt-4 space-y-1 text-sm text-neutral-700">
              {classFormats.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-navy/90">
          <p>
            <strong className="font-semibold text-navy">Bharati Murali</strong> is a
            violin and vocal teacher based in Singapore, and the founder of Dhwani
            Music Academy. With a deep passion for Indian classical music, she guides
            students of all ages toward technical mastery and expressive performance.
          </p>

          <div className="rounded-xl border-l-4 border-red-accent bg-red-accent/5 px-6 py-5">
            <p>
              Students at Dhwani Music Academy have{" "}
              <strong className="font-semibold text-navy">
                won multiple prizes in competitions
              </strong>{" "}
              and have{" "}
              <strong className="font-semibold text-navy">
                performed regularly across Singapore
              </strong>
              , building confidence and stage presence through dedicated practice
              and mentorship.
            </p>
          </div>

          <p>
            Bharati&apos;s expertise extends beyond the classroom. She served as a{" "}
            <strong className="font-semibold text-navy">guest trainer at SIOC</strong>{" "}
            (Singapore Indian Orchestra &amp; Choir), where she trained an entire
            orchestra to perform alongside the renowned Bollywood composers{" "}
            <strong className="font-semibold text-navy">Salim-Sulaiman</strong>.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-navy">
            Curriculum <span className="text-red-accent">Highlights</span>
          </h2>
          <LotusDivider />
          <CurriculumList items={curriculum} columns={1} />
        </div>
      </div>

      <ContactSection />
    </>
  );
}
