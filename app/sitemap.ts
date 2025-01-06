import { sanityFetch } from "@/lib/sanity.client";
import { postsQuery, projectsQuery } from "@/lib/sanity.query";
import { PostType, ProjectType } from "@/types";
import { MetadataRoute } from "next";

const { NEXT_PUBLIC_BASE_URL } = process.env;

function formatDate(today: Date) {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const getAllProjects = async (): Promise<MetadataRoute.Sitemap> => {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return projects.map(({ _id, _updatedAt }) => ({
    url: `${NEXT_PUBLIC_BASE_URL}/projects/${_id}`,
    changeFrequency: "yearly",
    priority: 0.6,
    lastModified: new Date(_updatedAt),
  }));
};

const getAllBlogs = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["post"],
  });

  return blogs.map(({ _id, _updatedAt }) => ({
    url: `${NEXT_PUBLIC_BASE_URL}/blog/${_id}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: new Date(_updatedAt!),
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const blogs = await getAllBlogs();

  return [
    {
      url: `${NEXT_PUBLIC_BASE_URL}/`,
      changeFrequency: "monthly",
      lastModified: "2025-01-01",
      priority: 1,
    },

    {
      url: `${NEXT_PUBLIC_BASE_URL}/about`,
      changeFrequency: "monthly",
      lastModified: "2025-01-01",
      priority: 1,
    },

    {
      url: `${NEXT_PUBLIC_BASE_URL}/ai`,
      changeFrequency: "monthly",
      lastModified: formatDate(new Date()),
      priority: 1,
    },

    {
      url: `${NEXT_PUBLIC_BASE_URL}/blog`,
      changeFrequency: "weekly",
      lastModified: "2025-01-01",
      priority: 0.8,
    },

    ...blogs,

    {
      url: `${NEXT_PUBLIC_BASE_URL}/projects`,
      changeFrequency: "monthly",
      lastModified: "2025-01-01",
      priority: 0.9,
    },

    ...projects,

    {
      url: `${NEXT_PUBLIC_BASE_URL}/gallery`,
      changeFrequency: "monthly",
      lastModified: "2025-01-01",
      priority: 0.7,
    },
  ];
}
