import "./globals.css";

import type { Metadata } from "next";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import { Inter } from "next/font/google";

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
    <html
      lang="en"
      className={`${incognito.variable} ${inter.className} ${gitlabmono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
