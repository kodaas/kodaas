"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <span className="inline-block animate-pulse w-[40px] h-[40px] p-2 rounded-full dark:bg-zinc-800 bg-zinc-200 border dark:border-zinc-700 border-zinc-300"></span>
    );

  return (
    <button
      onClick={toggleTheme}
      className={`dark:bg-primary-bg bg-zinc-100 dark:text-primary-color text-zinc-500 border dark:border-zinc-800 border-zinc-200 rounded-full p-2 duration-300 transition-transform group: ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
