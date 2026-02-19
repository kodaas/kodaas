"use client";
import { m } from "motion/react";
import { useRef } from "react";

type props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const Slide = ({ children, className, delay }: props) => {
  const ref = useRef(null);

  return (
    <m.div
      ref={ref}
      variants={{
        start: { opacity: 0, translateY: 10 },
        stop: { opacity: 1, translateY: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: delay,
        stiffness: 0.5,
      }}
      whileInView="stop"
      viewport={{ once: true }}
      initial="start"
      className={className}
    >
      {children}
    </m.div>
  );
};
