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
        href={"https://calendar.app.google/GP9Y2EBw4BqjsDSP9"}
        target="_blank"
        className="inline-flex items-center gap-2 mb-2 bg-green-50/10 text-zinc-400 border border-zinc-400 rounded-full px-2 font-incognito"
      >
        Offline 😴, Book a Call <BiLinkExternal />
      </Link>
    );

  return (
    <Link
      href={"https://calendar.app.google/GP9Y2EBw4BqjsDSP9"}
      target="_blank"
      className="inline-flex mb-2 bg-green-50/10 text-green-500 border border-green-600 rounded-full px-1 items-center gap-2 font-incognito"
    >
      <div className="size-3 rounded-full animate-pulse bg-green-500"></div>
      Currently exploring new opportunities. 😎 <BiLinkExternal />
    </Link>
  );
}
