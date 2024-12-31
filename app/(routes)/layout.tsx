import "../globals.css";

import { incognito } from "../assets/font/font";
import { gitlabmono } from "../assets/font/font";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { NavBar } from "../components/global/Nav";
import { Footer } from "../components/global/Footer";

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
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 motion-reduce:bg-noise-reduced bg-white dark:text-white text-zinc-700`}
      >
        <div className="noise bg-noise"></div>

        <Providers>
          <NavBar />
          <main className="min-h-[50vh] max-w-7xl mx-auto md:px-16 px-6 pt-16 md:pt-44 space-y-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
