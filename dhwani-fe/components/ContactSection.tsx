import { contact } from "@/lib/academy-content";

export default function ContactSection() {
  return (
    <section className="border-t border-cyan/20 bg-white px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-navy">Get in Touch</h2>
          <p className="mt-2 text-sm text-muted">
            In-person classes at{" "}
            <span className="font-semibold uppercase tracking-wide text-navy underline decoration-cyan/50 underline-offset-4">
              {contact.location}
            </span>
          </p>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-navy">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted transition-colors hover:text-cyan"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm leading-relaxed text-neutral-700">
            Ready to begin your musical journey? Book a lesson demo and discover how
            Dhwani Music Academy can help you develop your Dhwani.
          </p>
          <a
            href={contact.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center rounded-full bg-red-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange"
          >
            Book a Lesson Demo
          </a>
        </div>
      </div>
    </section>
  );
}
