"use client";
import { AI_SAMPLE_QUESTIONS } from "@/app/constant";
import { FiSend } from "react-icons/fi";
import { Slide } from "../../shared/Slide";
import { FormEvent, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { ClientMessage } from "@/app/actions";
import { nanoid } from "nanoid";
import { useAIStore } from "@/app/store/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

export function AIInput() {
  const [input, setInput] = useState("");
  const { isLoading, setLoading } = useAIStore();
  const { continueConversation } = useActions();
  const [, setConversations] = useUIState();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    setConversations((prev: ClientMessage[]) => [
      ...prev,
      { id: nanoid(10), display: input, role: "user" },
    ]);
    setInput("");
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

    // console.log(input);

    setInput("");
    const response = await continueConversation(input);

    // console.log("response: ", response);

    setConversations((prev: ClientMessage[]) => [...prev, response]);
    setLoading(false);
  }

  return (
    <Slide delay={0.2} className="space-y-1 w-full">
      <div className="flex w-full py-2 gap-3 overflow-auto no-scrollbar">
        {AI_SAMPLE_QUESTIONS.map((question, index) => (
          <button
            key={index}
            disabled={isLoading}
            onClick={() => handleSugestedPrompt(question)}
            className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed border dark:border-zinc-400 border-zinc-600 px-2 rounded-full shrink-0"
          >
            {question}
          </button>
        ))}
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
          className="w-full flex-1 py-3 px-3 md:px-4 text-base border dark:border-zinc-400 border-zinc-600 rounded-full"
          placeholder="Ask a question"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || input.length === 0}
          className="p-4 rounded-full bg-zinc-700 dark:bg-white text-white dark:text-zinc-700  shrink-0 text-base border dark:border-zinc-400 border-zinc-600 flex items-center justify-center"
        >
          <FiSend />
        </button>
      </form>

      <div className="w-full text-center text-xs dark:text-zinc-400 text-zinc-600 pt-1">
        This AI can make mistakes. Check important info.
      </div>
    </Slide>
  );
}
