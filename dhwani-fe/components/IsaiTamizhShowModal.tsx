"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { isaiTamizhShow } from "@/lib/show-event";

export default function IsaiTamizhShowModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(isaiTamizhShow.storageKey) === "1") {
        return;
      }
    } catch {
      /* private browsing */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(isaiTamizhShow.storageKey, "1");
    } catch {
      /* private browsing */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close announcement"
        className="absolute inset-0 bg-navy-dark/60 backdrop-blur-[2px]"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92vh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-md"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm ring-1 ring-cyan/20 transition-colors hover:bg-cyan/10"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>

        <div className="overflow-y-auto overscroll-contain bg-white">
          <div className="flex justify-center bg-white px-6 pb-1 pt-6 sm:px-8 sm:pt-7">
            <Image
              src={isaiTamizhShow.imageSrc}
              alt="Dhwani Music Academy"
              width={440}
              height={320}
              className="h-auto w-full max-w-[240px] object-contain drop-shadow-[0_8px_24px_rgba(26,35,126,0.12)] sm:max-w-[260px]"
              priority
            />
          </div>

          <div className="px-5 pb-6 pt-2 text-center sm:px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              {isaiTamizhShow.presentedBy}
            </p>
            <h2
              id={titleId}
              className="mt-2 font-serif text-2xl font-bold leading-tight text-navy sm:text-[1.65rem]"
            >
              {isaiTamizhShow.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              {isaiTamizhShow.description}
            </p>

            <dl className="mt-5 space-y-2 rounded-xl border border-cyan/25 bg-cyan/5 px-4 py-4 text-left text-sm">
              <div>
                <dt className="font-semibold text-navy">Date</dt>
                <dd className="text-neutral-700">{isaiTamizhShow.date}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Time</dt>
                <dd className="text-neutral-700">{isaiTamizhShow.time}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Venue</dt>
                <dd className="text-neutral-700">{isaiTamizhShow.venue}</dd>
                <dd className="mt-0.5 text-neutral-600">{isaiTamizhShow.address}</dd>
              </div>
            </dl>

            <a
              href={isaiTamizhShow.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-red-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange sm:w-auto"
            >
              RSVP
            </a>
            <p className="mt-3 text-xs text-muted">
              One response per family or guest group. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
