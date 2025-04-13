import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { Slide } from "@/app/components/shared/Slide";
// import VideoPlayer from "@/app/components/shared/VideoPlayer";
import Favicon from "@/lib/favicon";
import RefLink from "@/app/components/shared/RefLink";
import Link from "next/link";

const fallbackImage: string =
  "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/projects-og";

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const slug = (await params).project;

  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project - Fiyinfoluwa John Ajala`,
    metadataBase: new URL(
      `https://kodaas-mu.vercel.app/projects/${project.slug}`,
    ),
    description: project.tagline,
    openGraph: {
      images: project.coverImage
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `https://kodaas-mu.vercel.app/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="max-w-6xl mx-auto lg:px-16">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap mb-4">
            <h1 className="font-incognito font-black tracking-tight sm:text-3xl text-2xl mb-4 max-w-md">
              <div className="flex items-center gap-x-4">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    width={40}
                    height={40}
                    alt={project.name}
                    className="dark:bg-primary-bg/50 bg-zinc-50 rounded-lg p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="dark:bg-primary-bg/50 bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl group-hover:scale-105 transition-transform duration-300">
                    🪴
                  </div>
                )}
                {project.name}
              </div>
            </h1>

            <div className="flex items-center gap-x-2">
              <a
                href={project.projectUrl}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? "Live URL" : "No Live URL"}
              </a>

              <a
                href={project.repository}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "Private Repo"}
              </a>
            </div>
          </div>

          <div className="w-full group relative aspect-[15/7.5] mb-4">
            <Image
              className="rounded-xl object-top border dark:border-zinc-800 border-zinc-100 object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          <div className="flex flex-wrap justify-between items-baseline gap-4 mt-6">
            <div className="flex items-center gap-4 text-sm dark:text-zinc-400 text-zinc-600">
              <time dateTime={project._updatedAt}>
                <span className="font-semibold">Updated:</span>{" "}
                {project._updatedAt
                  ? new Date(project._updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Date unavailable"}
              </time>
            </div>

            {project.tools && project.tools.length > 0 && (
              <div className="flex items-center gap-2">
                {/* <span className="text-sm font-semibold dark:text-zinc-300 text-zinc-700">
                  Tools:
                </span> */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <RefLink
                      key={index}
                      href={tool.url}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-1 text-sm transition-colors dark:bg-primary-bg bg-secondary-bg rounded-full dark:hover:bg-zinc-800 hover:bg-zinc-200"
                    >
                      <Favicon domain={tool.url} alt={"🔨"} /> {tool.name}
                    </RefLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>

          <Slide delay={0.1}>
            <div className="mt-12 flex justify-between gap-4 border-t dark:border-zinc-800 border-zinc-200 pt-8">
              {project.previousProject ? (
                <Link
                  href={`/projects/${project.previousProject.slug}`}
                  className="flex items-center gap-2 px-4 py-2 dark:bg-primary-bg bg-secondary-bg rounded-md border dark:border-transparent border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 transition-colors text-primary-color"
                >
                  ← {project.previousProject.name || 'Previous Project'}
                </Link>
              ) : (
                <span />
              )}
              {project.nextProject && (
                <Link
                  href={`/projects/${project.nextProject.slug}`}
                  className="flex items-center gap-2 px-4 py-2 dark:bg-primary-bg bg-secondary-bg rounded-md border dark:border-transparent border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 transition-colors text-primary-color"
                >
                  {project.nextProject.name || 'Next Project'} →
                </Link>
              )}
            </div>
          </Slide>
        </div>
      </Slide>
    </main>
  );
}
