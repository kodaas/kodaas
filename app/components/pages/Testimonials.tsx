import { TestimonialType } from "@/types";
import { AnimatedTestimonials } from "../shared/AnimatedTestimonials";
import { sanityFetch } from "@/lib/sanity.client";
import { testimonialQuery } from "@/lib/sanity.query";

export async function Testimonials() {
  const testimonials: TestimonialType[] = await sanityFetch({
    query: testimonialQuery,
    tags: ["testimonial"],
  });
  
  
  return <AnimatedTestimonials testimonials={testimonials} />;
}
