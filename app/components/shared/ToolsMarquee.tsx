"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const logosTop = [
  "netlify-color.svg",
  "nextdotjs-color.svg",
  "nodedotjs-color.svg",
  "puppeteer-color.svg",
  "pwa-color.svg",
  "python-color.svg",
  "react-color.svg",
  "sanity-color.svg",
  "slack-color.svg",
  "spotify-color.svg",
  "tailwindcss-color.svg",
  "threedotjs-color.svg",
  "typescript-color.svg",
  "unsplash-color.svg",
  "vercel-color.svg",
  "webstorm-color.svg",
  "zedindustries-color.svg",
  "zod-color.svg",
];

const logosBottom = [
  "arc-color.svg",
  "bitbucket-color.svg",
  "figma-color.svg",
  "formspree-color.svg",
  "freecodecamp-color.svg",
  "git-color.svg",
  "github-color.svg",
  "githubcopilot-color.svg",
  "gitpod-color.svg",
  "go-color.svg",
  "googlechrome-color.svg",
  "hostinger-color.svg",
  "javascript-color.svg",
  "jira-color.svg",
  "jsonwebtokens-color.svg",
];

const duration = 60;
const size = 35;

export function ToolsMarquee() {
  return (
    <section className="overflow-x-hidden py-10 space-y-16">
      <div className="flex gap-20">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 shrink-0"
        >
          {logosTop.map((url, index) => (
            <Image
              key={`${url}-${index}`}
              src={`/logos/${url}`}
              width={size}
              height={size}
              alt={url}
              className="dark:opacity-75 opacity-85"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 shrink-0"
        >
          {logosTop.map((url, index) => (
            <Image
              key={`${url}-${index}`}
              src={`/logos/${url}`}
              width={size}
              height={size}
              alt={url}
              className="dark:opacity-75 opacity-85"
            />
          ))}
        </motion.div>
      </div>

      <div className="flex gap-20">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 shrink-0"
        >
          {logosBottom.map((url, index) => (
            <Image
              key={`${url}-${index}`}
              src={`/logos/${url}`}
              width={size}
              height={size}
              alt={url}
              className="dark:opacity-75 opacity-85"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 shrink-0"
        >
          {logosBottom.map((url, index) => (
            <Image
              key={`${url}-${index}`}
              src={`/logos/${url}`}
              width={size}
              height={size}
              alt={url}
              className="dark:opacity-75 opacity-85"
            />
          ))}
        </motion.div>
      </div>

      <div className="flex items-end gap-x-5 pl-5 md:pl-20">
        <p className="-rotate-3">
          Most of the tools I&apos;ve used <br /> &quot;vist{" "}
          <Link
            href={"/about"}
            className="text-primary-color italic hover:underline transition-all duration-300"
          >
            about
          </Link>{" "}
          to view all&quot;
        </p>
        <Image
          src="/curved-arrow.svg"
          width={80}
          height={80}
          alt="curved-arrow.svg"
          className="rotate-180 transform scale-x-[-1] fill-red-500 stroke-red-300"
        />
      </div>
    </section>
  );
}
