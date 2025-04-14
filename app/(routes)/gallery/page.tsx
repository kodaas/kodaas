import { GalleryImageGrid } from "@/app/components/pages/GalleryImageGrid";
import PageHeading from "@/app/components/shared/PageHeading";
import { sanityFetch } from "@/lib/sanity.client";
import { galleryItemsQuery } from "@/lib/sanity.query";
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

import { GalleryItemType } from "@/types";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { Slide } from "@/app/components/shared/Slide";

export default async function GalleryPage() {
  const galleryItems: GalleryItemType[] = await sanityFetch({
    query: galleryItemsQuery,
    tags: ["galleryItem"],
  });

  return (
    <>
      <Slide>
        <div className="mb-12">
          <h1 className="max-w-3xl font-incognito font-semibold tracking-tight sm:text-5xl text-3xl mb-2 lg:leading-[3.7rem]">
            Gallery
          </h1>
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            Capturing Life&apos;s Moments & Creating Lasting Memories
          </p>
        </div>

        <GalleryImageGrid items={galleryItems} />
      </Slide>
      <div className="flex mt-20 justify-evenly items-center max-w-3xl mx-auto">
        <Link
          href={"/ai"}
          className="font-incognito flex items-center gap-2 dark:text-white text-zinc-600 dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base"
        >
          My Personal AI <GoArrowRight />
        </Link>
      </div>
    </>
  );
}
