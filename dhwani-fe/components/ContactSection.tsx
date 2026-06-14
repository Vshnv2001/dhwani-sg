import { FacebookIcon, InstagramIcon, MailIcon, YouTubeIcon } from "@/components/ContactIcons";
import { contact } from "@/lib/academy-content";

const linkClass =
  "inline-flex items-center gap-3 text-muted transition-colors hover:text-cyan";

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

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-navy">
                  <MailIcon />
                </span>
                <span>{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-navy">
                  <InstagramIcon />
                </span>
                <span>@{contact.instagram.handle}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-navy">
                  <FacebookIcon />
                </span>
                <span>Bharati Murali</span>
              </a>
            </li>
            {contact.youtube.map((channel) => (
              <li key={channel.url}>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-navy">
                    <YouTubeIcon />
                  </span>
                  <span>{channel.label}</span>
                </a>
              </li>
            ))}
          </ul>
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
            Sample Lesson
          </a>
        </div>
      </div>
    </section>
  );
}
