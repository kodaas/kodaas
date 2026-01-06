"use client";

import NextLink from "next/link";
import { PhoneCall } from "lucide-react";
import { motion } from "motion/react";

export default function ScheduleCallButton() {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.5, // Delay explicitly to not compete with initial page load animations
            }}
            className="fixed right-4 top-4 z-50 text-white md:bottom-6 md:right-6 md:top-auto"
        >
            <NextLink
                href="https://calendar.app.google/GP9Y2EBw4BqjsDSP9"
                target="_blank"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-4 py-3 text-white shadow-xl transition-all hover:scale-105 hover:bg-zinc-800 hover:shadow-2xl dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                aria-label="Book a call"
            >
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                    }}
                >
                    <PhoneCall className="h-5 w-5" />
                </motion.div>

                <span className="font-incognito text-sm font-semibold">
                    Book a Call
                </span>
            </NextLink>
        </motion.div>
    );
}
