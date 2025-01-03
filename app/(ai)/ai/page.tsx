
import { ChatPannel } from "@/app/components/pages/Ai/ChatPannel";
import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";

export default async function AIChatBotPage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });


  return <ChatPannel profile={profile[0]} />
}
