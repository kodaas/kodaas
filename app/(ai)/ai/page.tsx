import { AIInput } from "@/app/components/pages/Ai/AIInput";
import { AIProfileCard } from "@/app/components/pages/Ai/AIProfileCard";
import { EmptyChat } from "@/app/components/pages/Ai/EmptyChat";
import { Messages } from "@/app/components/pages/Ai/Messages";
import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";

export default async function AIChatBotPage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  const noMessage = true;

  if (!noMessage) {
    return (
      <section className="flex items-center justify-center w-full min-h-[100vh] h-[100dvh]">
        <EmptyChat profile={profile[0]} />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-y-5 overflow-hidden pt-2 pb-24 md:pb-2 w-full min-h-[100vh] h-[100dvh]">
      <AIProfileCard profile={profile[0]} />

      <section className="h-[80dvh] grid items-end overflow-auto px-2">
        <Messages />
      </section>

      <section className="shrink-0">
        <AIInput />
      </section>
    </section>
  );
}
