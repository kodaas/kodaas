"use client";
import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { MOBILE_SCREEN } from "@/app/constant";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils";

const links = [
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
];

export function NavBar() {
  const { width } = useWindowSize();
  const { scrollY } = useScroll();
  const pathName = usePathname();

  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;

    if (Math.abs(difference) > 10) {
      setHidden(difference > 0);

      lastYRef.current = y;
    }
  });

  const isMobile = width !== null && width <= MOBILE_SCREEN;

  return (
    <motion.div
      animate={hidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={() => setHidden(false)}
      variants={{
        hidden: {
          y: isMobile ? "23%" : "-71%",
        },

        visible: {
          y: "0%",
        },
      }}
      // transition={{ duration: 0.3 }}
      className="fixed bottom-0 md:top-0 md:bottom-auto flex justify-center w-full py-3 px-2 bg-red-3 z-10"
    >
      <nav className="flex backdrop-blur-md dark:bg-primary-bg bg-secondary-bg items-center justify-between w-full md:w-auto md:gap-12 border-2 dark:border-zinc-800 px-3 md:px-5 py-3 rounded-3xl border-zinc-200">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>

        {links.map((link, id) => {
          const isActive = pathName.startsWith(link.href);
          return (
            <Link
              key={id}
              href={link.href}
              className={cn(
                "font-incognito dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base",
                [
                  isActive
                    ? "dark:text-primary-color text-secondary-color"
                    : "dark:text-white text-zinc-600",
                ],
              )}
            >
              {link.title}
            </Link>
          );
        })}

        <Theme />
      </nav>
    </motion.div>
  );
}
