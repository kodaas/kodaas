import { Availbility } from "@/app/components/shared/Availability";
import PageHeading from "@/app/components/shared/PageHeading";
import { Slide } from "@/app/components/shared/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import { projectsQuery } from "@/lib/sanity.query";
import { ProjectType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import EmptyState from "@/app/components/shared/EmptyState";
import { GoArrowRight } from "react-icons/go";
import Favicon from "@/lib/favicon";

export const metadata: Metadata = {
  title: "Project | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/projects"),
  description: "Explore projects built by Fiyinfoluwa John Ajala",
  openGraph: {
    title: "Projects | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/projects",
    description: "Explore projects built by Fiyinfoluwa John Ajala",
    images:
      "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/projects-og",
  },
};

export default async function ProjectsPage() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <section className="space-y-20">
      <div>
        <Availbility />

        <PageHeading
          title="A glimpse into my craftmanship"
          description="A Showcase of My Projects, Reflecting Years of Learning and Growth. feel free to contribute, and let's learn together."
        />
      </div>

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="group flex flex-col justify-between gap-3 dark:bg-primary-bg/50 bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-5 rounded-xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-zinc-800/50 hover:shadow-zinc-200"
              >
                <div className="flex items-center gap-4">
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      width={60}
                      height={60}
                      alt={project.name}
                      className="dark:bg-zinc-800/50 bg-zinc-100 rounded-lg p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="dark:bg-primary-bg/50 bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-3 rounded-lg text-3xl group-hover:scale-105 transition-transform duration-300">
                      🪴
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold tracking-wide group-hover:text-primary-color dark:group-hover:text-primary-color transition-colors duration-300">
                      {project.name}
                    </h2>
                    <div className="text-sm dark:text-zinc-400 text-zinc-600 line-clamp-2">
                      {project.tagline}
                    </div>
                  </div>
                </div>
                {project.tools && project.tools.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <div
                        key={tool.url}
                        className="flex items-center gap-2 text-xs dark:bg-zinc-800/50 bg-zinc-100 px-3 py-1.5 rounded-full"
                      >
                        {tool.url ? <Favicon domain={tool.url} alt={""} /> : null } 
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
      <div className="flex mt-20 justify-evenly items-center max-w-3xl mx-auto">
        <Link
          href={"/about"}
          className="font-incognito flex items-center gap-2 dark:text-white text-zinc-600 dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base"
        >
          About Me <GoArrowRight />
        </Link>
      </div>
    </section>
  );
}
