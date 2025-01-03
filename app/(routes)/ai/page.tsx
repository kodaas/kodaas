import { EmptyChat } from "@/app/components/pages/Ai/EmptyChat";
import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";

export default async function AIChatBotPage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  const noMessage = true;

  if (noMessage) {
    return (
      <section className="bg-red-10 flex items-center justify-center w-full min-h-[75vh] md:min-h-[60vh]">
        <EmptyChat profile={profile[0]} />
      </section>
    );
  }

  return <section className="bg-red-300 w-full min-h-[60vh]"></section>;
}
