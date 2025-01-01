import "./globals.css";

import type { Metadata } from "next";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { NavBar } from "./components/global/Nav";
import { Footer } from "./components/global/Footer";

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
    "https://res.cloudinary.com/victoreke/image/upload/v1692635746/victoreke/og.png",
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
