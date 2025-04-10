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
    <>
      <section>
        <Availbility />

        <PageHeading
          title="A glimpse into my craftmanship"
          description="A Showcase of My Projects, Reflecting Years of Learning and Growth. feel free to contribute, and let's learn together."
        />
      </section>

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="flex items-center gap-x-4 dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg"
              >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    width={60}
                    height={60}
                    alt={project.name}
                    className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                  />
                ) : (
                  <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl">
                    🪴
                  </div>
                )}
                <div>
                  <h2 className="text-lg tracking-wide mb-1">{project.name}</h2>
                  <div className="text-sm dark:text-zinc-400 text-zinc-600">
                    {project.tagline}
                  </div>
                </div>
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
    </>
  );
}
