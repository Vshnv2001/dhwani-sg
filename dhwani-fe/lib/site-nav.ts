export type NavLink = {
  href: string;
  label: string;
};

export const academyLinks: NavLink[] = [
  { href: "/about/performances", label: "Student Performances" },
  { href: "/about/teaching-methodology", label: "Teaching Methodology" },
  { href: "/about/achievements", label: "Student Achievements" },
  { href: "/about/testimonials", label: "Testimonials" },
];

export const aboutLinks: NavLink[] = [
  { href: "/about", label: "About Bharati Murali" },
  { href: "/about/past-work", label: "Past Work" },
];

export const galleryLink: NavLink = { href: "/gallery", label: "Gallery" };

export function isAcademyPath(pathname: string): boolean {
  return academyLinks.some(({ href }) => pathname === href);
}

export function isAboutPath(pathname: string): boolean {
  return aboutLinks.some(({ href }) => pathname === href);
}
