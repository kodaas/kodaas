import { TestimonialType } from "@/types";
import { AnimatedTestimonials } from "../shared/AnimatedTestimonials";
import { sanityFetch } from "@/lib/sanity.client";
import { testimonialQuery } from "@/lib/sanity.query";
import { Slide } from "../shared/Slide";

export async function Testimonials() {
  const testimonials: TestimonialType[] = await sanityFetch({
    query: testimonialQuery,
    tags: ["testimonial"],
  });

  return (
    <section>
      <Slide delay={0.16}>
        <div className="mb-5">
          <h2 className="font-incognito text-center md:text-left text-4xl mb-4 font-bold tracking-tight">
            What colleagues say
          </h2>
        </div>
      </Slide>

      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
