"use client";
import { TestimonialType } from "@/types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RefLink from "./RefLink";
import { MILI_SEC_FOR_A_WORD } from "@/app/constant";
import Favicon from "@/lib/favicon";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: TestimonialType[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const duration = () =>
    MILI_SEC_FOR_A_WORD * testimonials[active].quotet.split(" ").length;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, duration());
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, duration]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 28) - 15;
  };
  return (
    <div className="max-w-sm md:max-w-7xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 mx-auto md:grid-cols-3 gap-20 md:gap-28">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute z-0 inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.profileImage.image}
                    alt={testimonial.profileImage.alt}
                    width={500}
                    height={500}
                    quality={100}
                    draggable={false}
                    placeholder="blur"
                    blurDataURL={testimonial.profileImage.lqip}
                    priority
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col md:col-span-2 md:w-[85%]  py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-3xl font-bold dark:text-white text-black">
              {testimonials[active].name}
            </h3>
            <p className="text-base mb-1 text-gray-500 dark:text-zinc-200">
              {testimonials[active].role}
            </p>
            <RefLink
              className="font-medium inline-flex items-center justify-start gap-x-2 dark:text-blue-400 text-blue-500 hover:underline"
              href={testimonials[active].url}
            >
              <Favicon domain={testimonials[active].url} alt={"🔗"} />
              {testimonials[active].handle}
            </RefLink>

            <motion.p className="text-lg text-gray-700 mt-8 mb-4 dark:text-neutral-300">
              {testimonials[active].quotet.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-zinc-100 shadow-line-light dark:shadow-line-dark dark:bg-zinc-700 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-zinc-200 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-zinc-100 shadow-line-light dark:shadow-line-dark dark:bg-zinc-700 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-zinc-200 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
