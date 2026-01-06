import "./globals.css";
import "./prism-theme.css";
import type { Metadata } from "next";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import { Inter } from "next/font/google";
import ScheduleCallButton from "./components/widgets/ScheduleCallButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Fiyinfoluwa John Ajala | Software Developer & AI Engineer",
  description:
    "Fiyinfoluwa John Ajala (Kodaas) is a Software Developer (Digital Craftsman) and Generative AI Engineer specializing in Full Stack Architecture, LLMOps, and RAG pipelines. He bridges the gap between theoretical computer science and practical, revenue-generating product deployment.",
  url: "https://kodaas-mu.vercel.app/",
  ogImage:
    "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/og",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  keywords: [
    "Fiyinfoluwa John Ajala",
    "Kodaas",
    "Software Developer",
    "Digital Craftsman",
    "Generative AI Engineer",
    "LLMOps Specialist",
    "RAG Pipelines",
    "Full Stack Architect",
    "Software Developer Lagos",
    "Next.js Expert",
    "PineconeDB",
    "LangChain",
    "Google Vertex AI",
    "React Developer",
    "TypeScript",
  ],
  authors: [{ name: "Fiyinfoluwa John Ajala", url: options.url }],
  creator: "Fiyinfoluwa John Ajala",
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "kodaas-mu.vercel.app",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: options.title,
    description: options.description,
    creator: "@_kodaas",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fiyinfoluwa John Ajala",
    alternateName: "Kodaas",
    url: options.url,
    image: options.ogImage,
    sameAs: [
      "https://github.com/kodaas",
      "https://x.com/_kodaas",
      "https://www.linkedin.com/in/kodaas/",
      "https://www.instagram.com/__kodaas",
    ],
    jobTitle: "Generative AI Engineer",
    description:
      "Digital Craftsman specializing in LLMOps and Full Stack Architecture.",
    knowsAbout: [
      "Generative AI",
      "LLMOps",
      "Full Stack Development",
      "Software Developer",
      "React",
      "Next.js",
      "TypeScript",
      "PineconeDB",
      "LangChain",
    ],
    worksFor: {
      "@type": "Organization",
      name: "1808 Foundation",
    },
  };

  return (
    <html
      lang="en"
      className={`${incognito.variable} ${inter.className} ${gitlabmono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="noise bg-noise"></div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ScheduleCallButton />
      </body>
    </html>
  );
}
