import "./globals.css";

import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-noise bg-white dark:text-white text-zinc-700`}
      >
        {children}
      </body>
    </html>
  );
}
