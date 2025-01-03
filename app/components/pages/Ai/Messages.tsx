"use client";
import Image from "next/image";
// import { motion } from "motion/react";
import { AnimatedGradientText } from "../../shared/AnimatedGradientText";
import { cn } from "@/app/utils";

export function Messages() {
  return (
    <div className="bg-blue-30 flex flex-col gap-8 justify-end">
      {new Array(2).fill(
        <>
          <SingleMessage isUser={true}>Hello World Hello</SingleMessage>
          <SingleMessage isUser={false}>
            Hello World Hello World Hello World Hello World Hello World Hello
            Hello World Hello World Hello World Hello World Hello World Hello
            World
          </SingleMessage>
        </>,
      )}
    </div>
  );
}

function SingleMessage({
  children,
  isUser,
  isLoading = false,
}: {
  isUser: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}) {
  if (isUser)
    return (
      <div className="w-full shrink-0 flex gap-2 items-start justify-end">
        <div className="py-2 px-3 rounded-2xl text-xs w-auto max-w-[60%] dark:bg-zinc-800 bg-white">
          User {children}
        </div>
      </div>
    );

  return (
    <>
      {isLoading ? (
        <div className="w-full shrink-0 flex gap-2 items-start justify-start">
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
        </div>
      ) : (
        <div className="w-full shrink-0 flex gap-2 items-start justify-start">
          <Image
            src="/gemini-logo.webp"
            alt="User"
            width={20}
            height={20}
            className="rounded-full mt-1 shrink-0"
          />
          <div className=" flex flex-col gap-4 text-sm rounded-tl-none w-auto max-w-[80%] leading-6">
            AI {children}
          </div>
        </div>
      )}
    </>
  );
}
