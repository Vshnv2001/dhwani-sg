import Image from "next/image";
import LotusDivider from "@/components/LotusDivider";
import type { Testimonial } from "@/lib/testimonials";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  showHeading?: boolean;
  variant?: "grid" | "stack";
};

function TestimonialPhotos({ testimonial }: { testimonial: Testimonial }) {
  const photoList: { src: string; alt: string }[] =
    testimonial.photos ??
    (testimonial.photo ? [{ src: testimonial.photo, alt: testimonial.name }] : []);

  if (photoList.length === 0) return null;

  return (
    <div className="flex shrink-0 -space-x-3">
      {photoList.map(({ src, alt }, index) => (
        <div
          key={src}
          className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-white ring-2 ring-cyan/30 md:h-24 md:w-24"
          style={{ zIndex: photoList.length - index }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="96px"
          />
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
  showHeading = true,
  variant = "grid",
}: TestimonialsSectionProps) {
  return (
    <section
      className={
        showHeading
          ? "border-y border-cyan/15 bg-gradient-to-b from-white via-cyan/5 to-white px-6 py-14"
          : "px-6 pb-14"
      }
    >
      <div className={`mx-auto ${variant === "stack" ? "max-w-3xl" : "max-w-6xl"}`}>
        {showHeading && (
          <>
            <h2 className="text-center font-serif text-2xl font-semibold text-navy md:text-3xl">
              What Students <span className="text-red-accent">Say</span>
            </h2>
            <LotusDivider />
          </>
        )}

        <div className={variant === "stack" ? "flex flex-col gap-10" : "grid gap-8 md:grid-cols-2"}>
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-cyan/20 bg-white p-8 shadow-sm"
            >
              <blockquote className="flex-1">
                <span className="font-serif text-4xl leading-none text-cyan/40" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="-mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-700 md:text-base">
                  {testimonial.quote}
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4 border-t border-cyan/15 pt-6">
                <TestimonialPhotos testimonial={testimonial} />
                <div>
                  <p className="font-serif text-lg font-semibold text-navy">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="mt-0.5 text-sm text-muted">{testimonial.role}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
