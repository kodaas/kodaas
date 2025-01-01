import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Fiyinfoluw John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Fiyinfoluw John Ajala",
    url: "https://kodaas-mu.vercel.app/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692635746/victoreke/og.png",
  },
};

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
