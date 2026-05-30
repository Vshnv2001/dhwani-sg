import type { Metadata } from "next";
import TestimonialsSection from "@/components/TestimonialsSection";
import LotusDivider from "@/components/LotusDivider";
import { getTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What students and parents say about learning at Dhwani Music Academy with Bharati Murali.",
};

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <div className="bg-white py-12 md:py-16">
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan">
          About the Academy
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy md:text-5xl">
          What Students <span className="text-red-accent">Say</span>
        </h1>
        <LotusDivider />
        <p className="text-muted">
          Hear from students who have learned and grown under Bharati Murali&apos;s
          guidance at Dhwani Music Academy.
        </p>
      </header>

      <div className="mt-10">
        <TestimonialsSection testimonials={testimonials} variant="stack" showHeading={false} />
      </div>
    </div>
  );
}
