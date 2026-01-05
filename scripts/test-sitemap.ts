import { sanityFetch } from "../lib/sanity.client";
import { postsQuery, projectsQuery } from "../lib/sanity.query";
import { PostType, ProjectType } from "../types";

// Mock env if needed, but bun should load .env

async function testSitemap() {
    console.log("Testing sitemap generation...");

    try {
        console.log("Fetching projects...");
        const projects: ProjectType[] = await sanityFetch({
            query: projectsQuery,
            tags: ["project"],
        });
        console.log(`Projects found: ${projects.length}`);
    } catch (error) {
        console.error("Failed to fetch projects:", error);
    }

    try {
        console.log("Fetching blogs...");
        const blogs: PostType[] = await sanityFetch({
            query: postsQuery,
            tags: ["post"],
        });
        console.log(`Blogs found: ${blogs.length}`);
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
    }
}

testSitemap();
