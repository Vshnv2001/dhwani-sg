import type { Metadata } from "next";
import AchievementsTimeline from "@/components/AchievementsTimeline";
import LotusDivider from "@/components/LotusDivider";
import { getAchievements } from "@/lib/achievements";

export const metadata: Metadata = {
  title: "Student Achievements",
  description:
    "Competition prizes and recognitions earned by Dhwani Music Academy students.",
};

export default function AchievementsPage() {
  const entries = getAchievements();

  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          About the Academy
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          Student <span className="text-red-accent">Achievements</span>
        </h1>
        <LotusDivider />
        <p className="mx-auto max-w-2xl text-muted">
          Celebrating the hard work and success of Dhwani Music Academy students
          at competitions and events across Singapore.
        </p>
      </header>

      <div className="mt-12">
        <AchievementsTimeline entries={entries} />
      </div>
    </div>
  );
}
