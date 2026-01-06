import { Metadata } from "next";
import Posts from "@/app/components/pages/Posts";
import PageHeading from "@/app/components/shared/PageHeading";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export const metadata: Metadata = {
  title: "Blog | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/blog"),
  description: "Read latest stories from Fiyinfoluwa John Ajala's Blog",
  openGraph: {
    title: "Blog | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/blog",
    description: "Read latest stories from Fiyinfoluwa John Ajala's Blog",
    images:
      "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/blog-og",
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 pt- pb-12">
      <PageHeading
        title="Blog"
        description="A collection of technical deep dives, bug fixes, and things I learned the hard way. Basically, my external memory."
      />
      <Posts />

      <Link
        href={"/gallery"}
        className="font-incognito w-full flex items-center justify-center mt-5 gap-2 dark:text-white text-zinc-600 dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base"
      >
        My Gallery <GoArrowRight />
      </Link>
    </main>
  );
}
