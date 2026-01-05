"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-color to-tertiary-color origin-[0%] z-[999]"
            style={{ scaleX }}
        />
    );
}
