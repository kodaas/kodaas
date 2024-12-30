import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        incognito: ["var(--incognito)"],
        inter: ["var(--inter)"],
      },
      colors: {
        "primary-color": "#fbbf24",
        "secondary-color": "#f59e0b",
        "tertiary-color": "#ea580c",
        "primary-bg": "rgba(39, 39, 43, 0.4)",
        "secondary-bg": "rgba(250, 250, 250, 0.4)",
      },
      boxShadow: {
        "line-light": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        "line-dark": "rgb(29, 29, 32) 0px 1px 0px",
      },
      gridTemplateColumns: {
        custom: "1.2fr 1fr",
      },
      gridTemplateRows: {
        fit: "min-content 0fr",
        full: "min-content 1fr",
      },
      backgroundImage: {
        noise: "url('/noise.png')",
        "noise-reduced": "url('/noise-reduced.png')",
      },
      backgroundPosition: {
        zero: "0 0",
      },
    },
  },
  variants: {
    // @ts-expect-error - Tailwind CSS types are incomplete
    // eslint-disable-next-line
    animation: ({ after: any }) => after(["motion-safe", "motion-reduce"]),
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
