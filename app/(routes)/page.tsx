import { sanityFetch } from "@/lib/sanity.client";
import { jokesQuery, profileQuery } from "@/lib/sanity.query";
import { ProfileType, JokeType } from "@/types";
import { Slide } from "../components/shared/Slide";
import Social from "../components/shared/Social";
import HeroSvg from "../assets/icons/HeroSvg";
import ContributionGraph from "../components/pages/GithubCalendarComponent";
import Job from "../components/pages/Job";
import { FlipWords } from "../components/shared/FlipWord";
import { shuffleArray } from "../utils";
import { TbJoker } from "react-icons/tb";
import { Marquee } from "../components/shared/Marquee";

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
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <Slide>
                <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                  {data.headline}
                </h1>
                <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  Hi, I&apos;m{" "}
                  <span className="text-primary-color text-lg italic font- font-incognito">
                    Fiyinfoluwa John Ajala
                  </span>{" "}
                  (Fiyin), {data.shortBio}
                </p>
              </Slide>
              <Slide delay={0.1}>
                <Social type="social" />
              </Slide>
            </div>
          ))}
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>

      <Slide className="">
        <Marquee></Marquee>
      </Slide>

      <Job />

      <ContributionGraph />

      <Slide className="">
        <blockquote className="relative z-0 max-w-3xl mx-auto overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md">
          <TbJoker
            className="text-9xl absolute -top-10 -right-8 -rotate-12 dark:text-zinc-800 text-zinc-200"
            aria-hidden="true"
          />
          <FlipWords
            duration={12000}
            className="z-0"
            words={shuffleArray(jokes).map((x) => x?.joke)}
          />{" "}
          😄.
        </blockquote>
      </Slide>
    </>
  );
}
