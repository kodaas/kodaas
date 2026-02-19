
import { ChatPannel } from "@/app/components/pages/Ai/ChatPannel";
import { sanityFetch } from "@/lib/sanity.client";
import { profileQuery } from "@/lib/sanity.query";
import { ProfileType } from "@/types";

export const metadata = {
  title: "AI Chat | Fiyinfoluwa John Ajala",
  description: "Chat with Kodaas's AI assistant to learn about his skills, experience, and projects.",
};

export default async function AIChatBotPage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });


  return <ChatPannel profile={profile[0]} />
}
