"use client";
import { SAMPLE_PROMPTS } from "@/app/constant";
import { FiSend } from "react-icons/fi";
import { Slide } from "../../shared/Slide";
import { FormEvent, useEffect, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { ClientMessage } from "@/app/actions";
import { nanoid } from "nanoid";
import { useAIStore } from "@/app/store/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

export function AIInput() {
  const [input, setInput] = useState("");
  const { isLoading, setLoading } = useAIStore();
  const { continueConversation } = useActions();
  const [, setConversations] = useUIState();
  const [samplePrompts, setSamplePrompts] = useState<string[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  function getRandomPrompts() {
    const categories = Array.from(
      new Set(SAMPLE_PROMPTS.map((p) => p.category)),
    );
    const selected = categories.map((category) => {
      const categoryPrompts = SAMPLE_PROMPTS.filter(
        (p) => p.category === category,
      );
      return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)]
        .text;
    });
    return selected;
  }

  useEffect(() => {
    setSamplePrompts(getRandomPrompts());
  }, []);

  function refreshPrompts() {
    setSamplePrompts(getRandomPrompts());
    setAnimationKey((prev) => prev + 1);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    setConversations((prev: ClientMessage[]) => [
      ...prev,
      { id: nanoid(10), display: input, role: "user" },
    ]);
    setInput("");
    refreshPrompts(); // Randomize prompts on submit
    const response = await continueConversation(input);
    setConversations((prev: ClientMessage[]) => [...prev, response]);
    setLoading(false);
  }

  async function handleSugestedPrompt(input: string) {
    if (isLoading) return;
    setLoading(true);
    setConversations((prev: ClientMessage[]) => [
      ...prev,
      { id: nanoid(10), display: input, role: "user" },
    ]);

    setInput("");
    refreshPrompts(); // Randomize prompts on click
    const response = await continueConversation(input);

    setConversations((prev: ClientMessage[]) => [...prev, response]);
    setLoading(false);
  }

  return (
    <Slide delay={0.2} className="space-y-1 w-full">
      <div className="flex w-full py-2 gap-3 overflow-auto no-scrollbar min-h-[40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 min-w-max"
          >
            {samplePrompts.map((question, index) => (
              <button
                key={index}
                disabled={isLoading}
                onClick={() => handleSugestedPrompt(question)}
                className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed border dark:border-zinc-400 border-zinc-600 px-2 rounded-full shrink-0"
              >
                {question}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-2"
      >
        <button
          type="button"
          disabled={isLoading}
          onClick={() => window.location.reload()}
          className="p-3
          rounded-full bg-zinc-700 dark:bg-white text-white dark:text-zinc-700  shrink-0 text-base border dark:border-zinc-400 border-zinc-600 flex items-center justify-center"
        >
          <IoIosAddCircleOutline />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full flex-1 py-2 px-3 md:px-4 text-sm border dark:border-zinc-400 border-zinc-600 rounded-full"
          placeholder="Ask a question"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || input.length === 0}
          className="p-3 rounded-full bg-zinc-700 dark:bg-white text-white dark:text-zinc-700  shrink-0 text-base border dark:border-zinc-400 border-zinc-600 flex items-center justify-center"
        >
          <FiSend />
        </button>
      </form>

      <div className="w-full text-center text-[0.7rem] dark:text-zinc-400 text-zinc-600 pt-1">
        This AI can make mistakes. Check important info @ johnajala204@gmail.com
      </div>
    </Slide>
  );
}
