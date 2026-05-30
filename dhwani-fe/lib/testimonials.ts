import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type TestimonialPhoto = {
  src: string;
  alt: string;
};

export type Testimonial = {
  name: string;
  photo?: string;
  photos?: TestimonialPhoto[];
  role?: string;
  quote: string;
};

type TestimonialsFile = {
  testimonials: Testimonial[];
};

export function getTestimonials(): Testimonial[] {
  const filePath = path.join(process.cwd(), "content/testimonials.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = parse(file) as TestimonialsFile;
  return data.testimonials;
}
