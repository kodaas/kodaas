import PageHeading from "@/app/components/shared/PageHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/photos"),
  description: "Explore photos taken by Fiyinfoluwa John Ajala",
  openGraph: {
    title: "Photos | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/photos",
    description: "Explore photos taken by Fiyinfoluwa John Ajala",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692635149/victoreke/photos.png",
  },
};


export default function GalleryPage() {
  return (
    <>
      <PageHeading
        title="Gallery"
        description="Capturing Life's Moments & Creating Lasting Memories"
      />
    </>
  );
}
