import FeaturedPosts from "../pages/FeaturedPosts";
import ShareWidget from "../widgets/ShareWidget";
import Image from "next/image";
import { HiHashtag } from "react-icons/hi";

import { PostType } from "@/types";

type Props = {
    slug: string;
    title: string;
    tags?: string[];
    author: {
        name: string;
        photo: {
            image: string;
            alt: string;
        };
        twitterUrl: string;
    };
    relatedPosts?: PostType[];
};

export default function Sidebar({ slug, title, tags, author, relatedPosts }: Props) {
    return (
        <aside className="space-y-12">
            {/* Written By */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider dark:text-zinc-400 text-zinc-600">
                    Written By
                </h3>
                <div className="flex items-center gap-4 dark:bg-primary-bg bg-zinc-100 p-4 rounded-lg border dark:border-zinc-800 border-zinc-200">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border dark:border-zinc-700 border-zinc-200">
                        <Image
                            src={author.photo.image}
                            alt={author.photo.alt || author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">{author.name}</h4>
                        <a
                            href={author.twitterUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary-color hover:underline"
                        >
                            @kodaas
                        </a>
                    </div>
                </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider dark:text-zinc-400 text-zinc-600">
                        Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="bg-zinc-100 dark:bg-[#1c1c21] border dark:border-zinc-800 border-zinc-200 px-3 py-1 rounded-md text-xs dark:text-zinc-400 text-zinc-600 font-mono flex items-center gap-1"
                            >
                                <HiHashtag />
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ShareWidget slug={slug} title={title} />
            <FeaturedPosts params={slug} posts={relatedPosts} />
        </aside>
    );
}
