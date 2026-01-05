"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div id="comments" className="mt-16 pt-8 border-t dark:border-zinc-800 border-zinc-200">
            <h2 className="text-2xl font-bold font-incognito mb-8 dark:text-zinc-100 text-zinc-800">
                Comments
            </h2>
            <Giscus
                repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`) || "kodaas/kodaas"}
                repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
                category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || ""}
                categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === "dark" ? "transparent_dark" : "light"}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
