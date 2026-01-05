"use client";

import { useState } from "react";
import {
    RiTwitterXFill,
    RiLinkedinFill,
    RiFacebookCircleFill,
    RiWhatsappLine,
    RiFileCopyLine,
    RiCheckLine,
} from "react-icons/ri";
import RefLink from "../shared/RefLink";

type Props = {
    slug: string;
    title: string;
};

export default function ShareWidget({ slug, title }: Props) {
    const [copied, setCopied] = useState(false);
    const url = `https://kodaas-mu.vercel.app/blog/${slug}`;
    const text = `Check out this article: ${title}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            icon: RiTwitterXFill,
            url: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            name: "Twitter",
        },
        {
            icon: RiLinkedinFill,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
            name: "LinkedIn",
        },
        {
            icon: RiFacebookCircleFill,
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            name: "Facebook",
        },
        {
            icon: RiWhatsappLine,
            url: `https://wa.me/?text=${text} ${url}`,
            name: "WhatsApp",
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider dark:text-zinc-400 text-zinc-600">
                Share Post
            </h3>
            <div className="flex flex-wrap gap-2">
                {shareLinks.map((link) => (
                    <RefLink
                        key={link.name}
                        href={link.url}
                        className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors dark:text-zinc-200 text-zinc-700"
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon className="h-5 w-5" />
                    </RefLink>
                ))}
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors dark:text-zinc-200 text-zinc-700"
                    aria-label="Copy Link"
                >
                    {copied ? (
                        <RiCheckLine className="h-5 w-5 text-green-500" />
                    ) : (
                        <RiFileCopyLine className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
