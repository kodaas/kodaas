import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import type { Metadata } from "next";
import { NavBar } from "@/app/components/global/Nav";
import { Footer } from "@/app/components/global/Footer";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "@/app/providers";

import { incognito } from "@/app/assets/font/font";
import { gitlabmono } from "@/app/assets/font/font";
import { Inter } from "next/font/google";
import ScheduleCallButton from "../components/widgets/ScheduleCallButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Fiyinfoluwa John Ajala | Software Developer",
  description:
    "Fiyinfoluwa John Ajala is a Software Developer and an experienced frontend developer with a knack for building ideas that makes life a bit easier 🤝, one line of code at a time 💻.",
  url: "https://kodaas-mu.vercel.app/",
  ogImage:
    "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/og",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "kodaas-mu.vercel.app",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} bg-[length:100px_100px] md:bg-[length:200px_200px] dark:bg-zinc-900 bg-noise-reduced bg-white dark:text-white text-zinc-700`}
      >
        <NextTopLoader color="#fbbf24" />
        <SpeedInsights />
        <Analytics />

        <Providers>
          <NavBar />
          <main className="min-h-[50vh] max-w-[85rem] mx-auto md:px-16 px-5 pt-16 md:pt-44 space-y-32">
            {children}
          </main>
          <ScheduleCallButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
