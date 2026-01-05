import Link from "next/link";
import { Metadata } from "next";
import { singlePostQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { sanityFetch } from "@/lib/sanity.client";
import { formatDate, readTime } from "@/app/utils";
import {
  BiTime,
  BiCalendar,
  BiUser,
  BiChat,
  BiChevronRight,
} from "react-icons/bi";
import { toPlainText } from "@portabletext/react";
import ScrollProgressBar from "@/app/components/shared/ScrollProgressBar";
import Sidebar from "@/app/components/shared/Sidebar";
import Buymeacoffee from "@/app/components/shared/Buymeacoffee";
import Comments from "@/app/components/widgets/Comments";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      images:
        post.coverImage?.image ||
        "https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.webp",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function SinglePost({ params }: Props) {
  const { slug } = await params;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 pb-12">
      <ScrollProgressBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-12">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8 text-sm dark:text-zinc-400 text-zinc-600 font-mono">
              <Link
                href="/blog"
                className="hover:text-primary-color border-b border-transparent hover:border-primary-color transition-colors duration-300 pb-0.5"
              >
                cd ..
              </Link>
              <BiChevronRight size={22} className="text-zinc-500" />
              <span className="truncate max-w-[200px] md:max-w-md">
                {post.title}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-incognito tracking-tight mb-6 dark:text-zinc-100 text-zinc-800">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm dark:text-zinc-400 text-zinc-600 font-mono mb-8 border-b dark:border-zinc-800 border-zinc-200 pb-8">
              <div className="flex items-center gap-x-2">
                <BiCalendar className="text-lg" />
                <time dateTime={post.date || post._createdAt}>
                  {formatDate(post.date || post._createdAt)}
                </time>
              </div>

              <div className="flex items-center gap-x-2">
                <BiChat className="text-lg" />
                <a
                  href="#comments"
                  className="hover:text-primary-color transition-colors"
                >
                  Comments
                </a>
              </div>

              <div className="flex items-center gap-x-2">
                <BiTime className="text-lg" />
                <span>{readTime(toPlainText(post.body))}</span>
              </div>

              <div className="flex items-center gap-x-2">
                <BiUser className="text-lg" />
                <a
                  href={post.author.twitterUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary-color transition-colors"
                >
                  {post.author.name}
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200 bg-zinc-100 dark:bg-zinc-900">
            {post.coverImage && (
              <Image
                src={post.coverImage.image}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                placeholder={post.coverImage.lqip ? "blur" : "empty"}
                blurDataURL={post.coverImage.lqip}
                priority
              />
            )}
          </div>

          <div className="mt-8 dark:text-zinc-300 text-zinc-700 leading-relaxed portable-text">
            <PortableText value={post.body} components={CustomPortableText} />
          </div>

          <div className="mt-12">
            <Buymeacoffee />
          </div>

          <Comments />
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <div className="sticky top-24">
            <Sidebar
              slug={post.slug}
              title={post.title}
              tags={post.tags}
              author={post.author}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
