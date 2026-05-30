import type { Metadata } from "next";
import LotusDivider from "@/components/LotusDivider";
import PastWorkTimeline from "@/components/PastWorkTimeline";
import { getPastWork } from "@/lib/past-work";

export const metadata: Metadata = {
  title: "Past Work",
  description:
    "Bharati Murali's past work — SIOC collaborations, compositions, workshops, and conducting.",
};

export default function PastWorkPage() {
  const entries = getPastWork();

  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          About Bharati Murali
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          Past <span className="text-red-accent">Work</span>
        </h1>
        <LotusDivider />
        <p className="mx-auto max-w-2xl text-muted">
          Compositions, workshops, and choir training — from Athma Ghanam to
          collaborations with Salim-Sulaiman and SIOC RTP performances.
        </p>
      </header>

      <div className="mt-12">
        <PastWorkTimeline entries={entries} />
      </div>
    </div>
  );
}
