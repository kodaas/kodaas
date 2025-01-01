import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import Image from "next/image";
import { Slide } from "@/app/components/shared/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import RefLink from "@/app/components/shared/RefLink";
import Heroes from "@/app/components/pages/Heroes";
import Usage from "@/app/components/pages/Usage";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export const metadata: Metadata = {
  title: "About | Fiyinfoluw John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Fiyinfoluw John Ajala",
    url: "https://kodaas-mu.vercel.app/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/og",
  },
};

export default async function AboutPage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <>
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <Slide>
                  <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                    Live 🛑 in {data.location}, {data.fullName} is building the
                    future.
                  </h1>

                  <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    <PortableText
                      value={data.fullBio}
                      components={CustomPortableText}
                    />
                  </div>
                </Slide>
              </div>

              <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                <Slide delay={0.1}>
                  <div className="sticky top-10">
                    <Image
                      className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                      src={data.profileImage.image}
                      width={400}
                      height={400}
                      quality={100}
                      alt={data.profileImage.alt}
                      placeholder="blur"
                      blurDataURL={data.profileImage.lqip}
                      priority
                    />

                    <div className="flex flex-col text-center gap-y-4">
                      <div className="flex items-center gap-x-3">
                        <RefLink
                          href={data.resumeURL}
                          className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                        >
                          View Résumé <BiLinkExternal className="text-base" />
                        </RefLink>
                        <a
                          href={`${data.resumeURL}?dl=${data.fullName}-resume.pdf`}
                          className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                          title="Download Resume"
                        >
                          <BiSolidDownload
                            className="text-lg"
                            aria-label="Download Resume"
                          />
                        </a>
                      </div>

                      <a
                        href={`mailto:${data.email}`}
                        className="flex items-center gap-x-2 hover:text-primary-color"
                      >
                        <BiEnvelope className="text-lg" />
                        {data.email}
                      </a>
                    </div>
                  </div>
                </Slide>
              </aside>
            </section>
            <Slide delay={0.14}>
              <Usage />
            </Slide>
            <Heroes />
            <div className="flex mt-20 justify-evenly items-center max-w-3xl mx-auto">
              <Link
                href={"/blog"}
                className="font-incognito flex items-center gap-2 dark:text-white text-zinc-600 dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base"
              >
                My Blogs <GoArrowRight />
              </Link>
            </div>
          </div>
        ))}
    </>
  );
}
