import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

export async function Availbility() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  const isAvailble = profile[0].availability;

  if (!isAvailble)
    return (
      <Link
        href={
          "https://wa.me/+2347044896263/?text=Hi%20how%20are%20you%20doing%2C%20can%20we%20discuss%20briefly%3F"
        }
        target="_blank"
        className="inline-flex items-center gap-2 mb-2 bg-green-50/10 text-zinc-400 border border-zinc-400 rounded-full px-2 font-incognito"
      >
        Offline 😴, Drop a Msg <BiLinkExternal />
      </Link>
    );

  return (
    <Link
      href={
        "https://wa.me/+2347044896263/?text=Hi%20how%20are%20you%20doing%2C%20can%20we%20discuss%20briefly%3F"
      }
      target="_blank"
      className="inline-flex items-center gap-2 mb-2 bg-green-50/10 text-green-500 border border-green-600 rounded-full px-1 items-center gap-2 font-incognito"
    >
      <div className="size-3 rounded-full animate-pulse bg-green-500"></div>
      Talent: Currently Available! 😎 <BiLinkExternal />
    </Link>
  );
}
