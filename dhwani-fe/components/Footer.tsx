import Link from "next/link";
import { contact } from "@/lib/academy-content";

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C10.5 4 8 6 8 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2.5-5-4-7zm0 14c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan/25 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="lotus-divider mb-6 text-cyan">
          <LotusIcon className="h-5 w-5 shrink-0" />
        </div>

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-serif text-xl italic tracking-wide text-navy">DHWANI</p>
            <p className="mt-1 text-sm text-cyan">Music Academy</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">
              Discover &amp; Develop your DHWANI
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-navy/70">
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cyan">
              {contact.email}
            </a>
            <span className="text-xs uppercase tracking-wide">{contact.location}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm sm:justify-end">
          <Link href="/" className="text-navy/70 transition-colors hover:text-cyan">
            Home
          </Link>
          <Link href="/about" className="text-navy/70 transition-colors hover:text-cyan">
            About
          </Link>
          <Link href="/gallery" className="text-navy/70 transition-colors hover:text-cyan">
            Gallery
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-muted/70">
          &copy; {new Date().getFullYear()} Dhwani Music Academy &mdash; Bharati Murali, Singapore
        </p>
      </div>
    </footer>
  );
}
