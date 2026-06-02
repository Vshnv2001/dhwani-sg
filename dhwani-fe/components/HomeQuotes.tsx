import Link from "next/link";
import LotusDivider from "@/components/LotusDivider";
import type { HomeQuote } from "@/lib/home-quotes";

type HomeQuotesProps = {
  quotes: HomeQuote[];
};

export default function HomeQuotes({ quotes }: HomeQuotesProps) {
  return (
    <section className="border-y border-cyan/15 bg-cyan/5 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-navy md:text-3xl">
          What Students <span className="text-red-accent">Say</span>
        </h2>
        <LotusDivider />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-cyan/20 bg-white p-5 shadow-sm lg:p-6"
            >
              <blockquote className="flex-1">
                <span className="font-serif text-3xl leading-none text-cyan/40" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="-mt-2 text-sm leading-relaxed text-neutral-700">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="mt-6 border-t border-cyan/15 pt-4">
                <p className="font-serif font-semibold text-navy">{item.name}</p>
                {item.role && (
                  <p className="mt-0.5 text-xs text-muted">{item.role}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/about/testimonials"
            className="text-sm font-medium text-cyan transition-colors hover:text-navy"
          >
            Read more testimonials &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
