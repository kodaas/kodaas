import Image from "next/image";
import Link from "next/link";
import { postsQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime } from "react-icons/bi";
import { formatDate, readTime } from "@/app/utils";
import { HiCalendar } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { toPlainText } from "@portabletext/react";

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.webp";

export default async function Posts() {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  return (
    <section>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-y-12 mb-12">
          {posts.map((post) =>
            post.isPublished !== true ? null : (
              <article key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex lg:flex-row flex-col lg:items-center items-start gap-8 dark:bg-[#1c1c21] bg-secondary-bg p-6 rounded-lg border dark:border-zinc-800 border-zinc-200 group hover:border-[#fbbf24] duration-300 transition-colors"
                >
                  <div className="relative lg:w-[450px] lg:h-52 w-full h-56 overflow-hidden rounded-md">
                    <Image
                      src={post.coverImage?.image || fallbackImage}
                      className="object-cover group-hover:scale-105 duration-300"
                      alt={post.coverImage?.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      placeholder={post.coverImage?.lqip ? "blur" : "empty"}
                      blurDataURL={post.coverImage?.lqip || ""}
                    />
                  </div>
                  <div className="max-w-xl flex-1">
                    <h2 className="text-2xl font-semibold tracking-tight mb-4 group-hover:text-primary-color duration-300 font-incognito">
                      {post.title}
                    </h2>
                    <p className="dark:text-zinc-400 text-zinc-600 text-base mb-4 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-x-6 text-sm dark:text-zinc-500 text-zinc-500 font-mono">
                      <div className="flex items-center gap-x-2">
                        <HiCalendar className="text-lg" />
                        <time
                          dateTime={post.date ? post.date : post._createdAt}
                        >
                          {post.date
                            ? formatDate(post.date)
                            : formatDate(post._createdAt)}
                        </time>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <BiSolidTime className="text-lg" />
                        <div className="">
                          {readTime(toPlainText(post.body))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ),
          )}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
