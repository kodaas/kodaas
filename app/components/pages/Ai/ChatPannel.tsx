"use client";
import { AIInput } from "@/app/components/pages/Ai/AIInput";
import { AIProfileCard } from "@/app/components/pages/Ai/AIProfileCard";
import { EmptyChat } from "@/app/components/pages/Ai/EmptyChat";
import { Messages } from "@/app/components/pages/Ai/Messages";
import { ProfileType } from "@/types";
import { useUIState } from "ai/rsc";
import ScrollToBottom from "react-scroll-to-bottom";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  profile: ProfileType;
};

export function ChatPannel({ profile }: Props) {
  const [messages] = useUIState();

  const noMessage = messages && messages.length === 0;

  return (
    <AnimatePresence>
      {noMessage ? (
        <motion.section
          exit={{ opacity: 0 }}
          className="flex items-center justify-center w-full min-h-[100vh] h-[100dvh]"
        >
          <EmptyChat profile={profile} />
        </motion.section>
      ) : (
        <section className="flex flex-col gap-y-5 overflow-hidden pt-2 pb-24 md:pb-2 w-full min-h-[100vh] h-[100dvh]">
          <AIProfileCard profile={profile} />

          <ScrollToBottom
            debounce={3}
            className="h-[80dvh] grid items-end overflow-x-hidden overflow-y-auto px-2"
          >
            <Messages />
          </ScrollToBottom>

          <section className="shrink-0">
            <AIInput />
          </section>
        </section>
      )}
    </AnimatePresence>
  );
}
