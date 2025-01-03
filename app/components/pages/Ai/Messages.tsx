"use client";
import Image from "next/image";
import { AnimatedGradientText } from "../../shared/AnimatedGradientText";
import { cn } from "@/app/utils";
import { Slide } from "../../shared/Slide";
import { useUIState } from "ai/rsc";
import { ClientMessage } from "@/app/actions";
import { useAIStore } from "@/app/store/ai";
import { AiRoles } from "@/types";

export function Messages() {
  const [messages] = useUIState();
  const { isLoading } = useAIStore();

  return (
    <div className="bg-blue-30 flex flex-col gap-8 justify-end">
      {messages.map((message: ClientMessage) => {
        return (
          <SingleMessage key={message.id} role={message.role}>
            {message.display}
          </SingleMessage>
        );
      })}

      {isLoading && (
        <Slide className="w-full shrink-0 flex gap-2 items-start justify-start">
          <Image
            src="/gemini-logo.webp"
            alt="User"
            width={20}
            height={20}
            className="rounded-full shrink-0"
          />
          <div className=" flex flex-col gap-4 text-sm rounded-tl-none w-auto">
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-l from-gray-500 dark:via-zinc-700 via-zinc-300 to-gray-500 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                AI is Thinking...
              </span>
            </AnimatedGradientText>
          </div>
        </Slide>
      )}
    </div>
  );
}

function SingleMessage({
  children,
  role,
}: {
  role: AiRoles;
  children: React.ReactNode;
}) {
  switch (role) {
    case "user":
      return (
        <Slide className="w-full shrink-0 flex gap-2 items-start justify-end">
          <div className="py-2 px-3 rounded-2xl text-sm w-auto max-w-[60%] dark:bg-zinc-800 bg-white">
            {children}
          </div>
        </Slide>
      );
      break;

    case "assistant":
      return (
        <Slide className="w-full shrink-0 flex gap-2 items-start justify-start">
          <Image
            src="/gemini-logo.webp"
            alt="User"
            width={20}
            height={20}
            className="rounded-full mt-6 shrink-0"
          />
          <div className="flex flex-col gap-4 text-sm rounded-tl-none w-auto max-w-[80%] leading-6">
            {children}
          </div>
        </Slide>
      );
      break;

    case "error":
      return (
        <Slide className="w-full shrink-0 flex gap-2 items-start justify-center">
          <div className="px-3 py-2 border border-dashed dark:border-red-300 border-red-600 rounded-xl flex flex-col gap-4 text-xs w-auto max-w-[80%] dark:text-red-300 text-red-500 dark:bg-red-300/20 bg-red-100  leading-6">
            {children}
          </div>
        </Slide>
      );
      break;
  }
}
