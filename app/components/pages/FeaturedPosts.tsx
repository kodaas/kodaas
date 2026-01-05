import Link from "next/link";
import Image from "next/image";
import { postsQuery } from "@/lib/sanity.query";
import type { PostType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";

export default async function FeaturedPosts({ params }: { params?: string }) {
  const featuredPosts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-bold uppercase tracking-wider dark:text-zinc-400 text-zinc-600">
        Featured Posts
      </h3>
      <div className="flex flex-col gap-6">
        {featuredPosts.slice(0, 3).map((post) =>
          post.featured !== true || post.isPublished !== true ? null : (
            <article
              key={post._id}
              className={`${post.slug === params ? "hidden" : "flex flex-col"
                }`}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-4 items-start"
              >
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={post.coverImage?.image}
                    className="object-cover group-hover:scale-105 duration-300"
                    alt={post.coverImage?.alt || post.title}
                    fill
                    sizes="96px"
                    placeholder={post.coverImage?.lqip ? "blur" : "empty"}
                    blurDataURL={post.coverImage?.lqip || ""}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm leading-snug group-hover:text-primary-color transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="dark:text-zinc-400 text-zinc-600 text-xs line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            </article>
          )
        )}
      </div>
    </div>
  );
}
