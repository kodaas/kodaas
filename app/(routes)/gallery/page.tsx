import PageHeading from "@/app/components/shared/PageHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/gallery"),
  description: "Explore photos taken by Fiyinfoluwa John Ajala",
  openGraph: {
    title: "Gallery | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/gallery",
    description: "Capturing Life's Moments & Creating Lasting Memories",
    images:
      "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/gallery-og",
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
