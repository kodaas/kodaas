import { sanityFetch } from "@/lib/sanity.client";
import { jokesQuery, profileQuery } from "@/lib/sanity.query";
import { JokeType, ProfileType } from "@/types";
import { Slide } from "../components/shared/Slide";
import Social from "../components/shared/Social";
import ContributionGraph from "../components/pages/GithubCalendarComponent";
import Job from "../components/pages/Job";
import { FlipWords } from "../components/shared/FlipWord";
import { shuffleArray } from "../utils";
import { TbJoker } from "react-icons/tb";
import { ToolsMarquee } from "../components/shared/ToolsMarquee";
import Image from "next/image";
import { Availbility } from "../components/shared/Availability";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { Testimonials } from "../components/pages/Testimonials";
import ThreeMorph from "../components/ThreeMorph";

export default async function HomePage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  const jokes: JokeType[] = await sanityFetch({
    query: jokesQuery,
    tags: ["joke"],
  });

  return (
    <>
      <section className="relative w-full lg:h-[60vh] flex flex-col lg:flex-row items-center overflow-hidden">
        <div className="container mx-auto pt-12 lg:py-0 lg:h-full flex items-center relative z-0">
          {profile &&
            profile.map((data) => (
              <div key={data._id} className="lg:max-w-2xl max-w-xl">
                <Slide>
                  <Availbility />
                  <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                    {data.headline}
                  </h1>
                  <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    Hi, I&apos;m{" "}
                    <Link
                      href="/ai"
                      className="text-primary-color hover:underline text-lg italic font-incognito"
                    >
                      {data.fullName}
                    </Link>{" "}
                    (Fiyin), {data.shortBio}
                  </p>
                </Slide>
                <Slide delay={0.1}>
                  <Social type="social" />
                </Slide>
              </div>
            ))}
        </div>

        <div className="w-full h-[400px] cursor-grab lg:absolute lg:top-0 lg:right-0 lg:w-[55%] lg:h-full z-10">
          <Slide delay={0.14} className="w-full h-full">
            <ThreeMorph />
          </Slide>
        </div>
      </section>

      <Slide delay={0.16}>
        <ToolsMarquee />
      </Slide>

      <Job />

      <ContributionGraph />

      <Testimonials />

      <Slide delay={0.22}>
        <Slide delay={0.16}>
          <div className="mb-10">
            <h2 className="font-incognito text-center text-4xl mb-4 font-bold tracking-tight">
              Jokes
            </h2>
          </div>
        </Slide>

        <blockquote className="relative z-0 max-w-3xl mx-auto overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md">
          <TbJoker
            className="text-9xl absolute -top-10 -right-8 -rotate-12 dark:text-zinc-800 text-zinc-200"
            aria-hidden="true"
          />
          <Image
            src="/noun-face-with-tears-of-joy-4298638.svg"
            width={100}
            height={100}
            alt="smile"
          />
          <FlipWords
            duration={12000}
            className="z-0"
            words={shuffleArray(jokes).map((x) => x?.joke)}
          />
        </blockquote>

        <div className="flex justify-evenly items-center max-w-3xl mx-auto">
          <Link
            href={"/projects"}
            className="font-incognito flex items-center gap-2 dark:text-white text-zinc-600 dark:focus:text-primary-color focus:text-secondary-color  dark:hover:text-primary-color hover:text-secondary-color duration-300 text-base"
          >
            My Projects <GoArrowRight />
          </Link>
        </div>
      </Slide>
    </>
  );
}
