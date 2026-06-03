"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  isAboutPath,
  isAcademyPath,
  type NavLink,
} from "@/lib/site-nav";

function NavDropdown({
  label,
  links,
  isActive,
  pathname,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  isActive: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center gap-1 font-medium transition-colors ${
          isActive
            ? "text-cyan border-b-2 border-cyan pb-0.5"
            : "text-navy hover:text-cyan"
        }`}
        aria-haspopup="true"
        aria-expanded={isActive}
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-xl border border-cyan/20 bg-white py-2 shadow-lg">
          {links.map(({ href, label: linkLabel }) => (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cyan/10 hover:text-cyan ${
                pathname === href ? "font-medium text-cyan" : "text-navy"
              }`}
            >
              {linkLabel}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavSection({
  label,
  links,
  isActive,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  isActive: boolean;
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between text-lg font-medium ${
          isActive ? "text-cyan" : "text-navy"
        }`}
        aria-expanded={expanded}
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {expanded && (
        <div className="mt-2 flex flex-col gap-2 border-l-2 border-cyan/30 pl-4">
          {links.map(({ href, label: linkLabel }) => (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`text-base ${
                pathname === href ? "font-medium text-cyan" : "text-navy/80 hover:text-cyan"
              }`}
            >
              {linkLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

type HeaderProps = {
  academyLinks: NavLink[];
  aboutLinks: NavLink[];
};

export default function Header({ academyLinks, aboutLinks }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [academyExpanded, setAcademyExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setAcademyExpanded(false);
    setAboutExpanded(false);
  };

  const brandImageHeight = "h-[7.5rem] sm:h-[8.5rem] md:h-[9.5rem] lg:h-[10.75rem]";

  return (
    <header className="navbar-mandala sticky top-0 z-50 border-b border-cyan/20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5">
        <Link
          href="/"
          className={`flex items-center justify-self-start ${brandImageHeight}`}
          onClick={closeMenu}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/dhwani_logo_original.png"
            alt="Dhwani Music Academy"
            className="max-h-full w-auto"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:gap-8 md:flex">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              pathname === "/"
                ? "text-cyan border-b-2 border-cyan pb-0.5"
                : "text-navy hover:text-cyan"
            }`}
          >
            Home
          </Link>

          <NavDropdown
            label="Academy"
            links={academyLinks}
            isActive={isAcademyPath(pathname)}
            pathname={pathname}
          />

          <NavDropdown
            label="About"
            links={aboutLinks}
            isActive={isAboutPath(pathname)}
            pathname={pathname}
          />

          <Link
            href="/gallery"
            className={`font-medium transition-colors ${
              pathname === "/gallery"
                ? "text-cyan border-b-2 border-cyan pb-0.5"
                : "text-navy hover:text-cyan"
            }`}
          >
            Gallery
          </Link>
        </nav>

        <div className={`flex items-center justify-self-end gap-2 ${brandImageHeight}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kamakshi_amman.jpg"
            alt="Kamakshi Amman"
            className="hidden max-h-full w-auto rounded-md object-contain md:block"
          />

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-cyan/20 bg-white/60 px-6 py-4 backdrop-blur-sm md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-lg font-medium ${
                pathname === "/" ? "text-cyan" : "text-navy hover:text-cyan"
              }`}
            >
              Home
            </Link>

            <MobileNavSection
              label="Academy"
              links={academyLinks}
              isActive={isAcademyPath(pathname)}
              pathname={pathname}
              expanded={academyExpanded}
              onToggle={() => {
                setAcademyExpanded((open) => !open);
                setAboutExpanded(false);
              }}
              onNavigate={closeMenu}
            />

            <MobileNavSection
              label="About"
              links={aboutLinks}
              isActive={isAboutPath(pathname)}
              pathname={pathname}
              expanded={aboutExpanded}
              onToggle={() => {
                setAboutExpanded((open) => !open);
                setAcademyExpanded(false);
              }}
              onNavigate={closeMenu}
            />

            <Link
              href="/gallery"
              onClick={closeMenu}
              className={`text-lg font-medium ${
                pathname === "/gallery" ? "text-cyan" : "text-navy hover:text-cyan"
              }`}
            >
              Gallery
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
