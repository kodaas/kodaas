import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";

const AvaliableMessages = ["Talent: Currently Available! 😎"];
const NotAvaliableMessages = ["Not Avalible 😴"];

export async function Availbility() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  const isAvailble = profile[0].availability;

  const randomText = isAvailble ? AvaliableMessages : NotAvaliableMessages;

  if (!isAvailble)
    <div className="inline-flex mb-2 bg-green-50/10 text-green-500 border border-green-600 rounded-full px-1 items-center gap-2 font-incognito">
      <div className="size-3 rounded-full animate-pulse bg-green-500"></div> Not
      Avalible 😴 {randomText}
    </div>;

  return (
    <div className="inline-flex mb-2 bg-green-50/10 text-green-500 border border-green-600 rounded-full px-1 items-center gap-2 font-incognito">
      <div className="size-3 rounded-full animate-pulse bg-green-500"></div>{" "}
      Talent: Currently Available! 😎
    </div>
  );
}
