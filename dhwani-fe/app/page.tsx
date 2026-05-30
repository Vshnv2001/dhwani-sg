import Image from "next/image";
import Link from "next/link";
import HomeQuotes from "@/components/HomeQuotes";
import ContactSection from "@/components/ContactSection";
import CurriculumList from "@/components/CurriculumList";
import LotusDivider from "@/components/LotusDivider";
import {
  curriculum,
  teacherIntro,
} from "@/lib/academy-content";
import { getHomeQuotes } from "@/lib/home-quotes";

export default function Home() {
  const homeQuotes = getHomeQuotes();

  return (
    <>
      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <p className="font-serif text-sm italic tracking-wide text-navy/80">
              Discover &amp; Develop your DHWANI
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="text-navy">Carnatic Vocal & Violin</span>{" "}
              <span className="text-red-accent">Classes</span>
            </h1>

            {/* <div className="mt-6 space-y-1 text-base text-neutral-800 md:text-lg">
              {classFormats.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div> */}

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-neutral-700 md:text-base">
              {teacherIntro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="rounded-full bg-navy px-8 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-navy-dark"
              >
                About Bharati Murali
              </Link>
              <Link
                href="/about/performances"
                className="rounded-full border-2 border-cyan px-8 py-3 text-center text-sm font-medium text-navy transition-colors hover:bg-cyan/10"
              >
                Student Performances
              </Link>
            </div>
          </div>

          <div className="mx-auto flex flex-col items-center lg:mx-0">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-cyan/30 shadow-lg md:h-64 md:w-64">
              <Image
                src="/assets/bm_violin_1.jpg"
                alt="Bharati Murali — Carnatic Vocalist & Violinist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 224px, 256px"
                priority
              />
            </div>
            <p className="mt-4 text-center font-serif text-lg font-semibold tracking-wide text-navy">
              Bharati Murali
            </p>
            <p className="text-center text-sm text-muted">Founder, Dhwani Music Academy</p>
            <p className="text-center text-sm text-muted">Guest Instructor, SIOC</p>

          </div>
        </div>
      </section>

      <HomeQuotes quotes={homeQuotes} />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-center font-serif text-2xl font-semibold text-navy md:text-3xl">
          What you will <span className="text-red-accent">Learn</span>
        </h2>
        <LotusDivider />
        <CurriculumList items={curriculum} />
      </section>

      <ContactSection />
    </>
  );
}
