import { AI_SAMPLE_QUESTIONS } from "@/app/constant";
import { FiSend } from "react-icons/fi";

export function AIInput() {
  return (
    <section className="space-y-1 w-full">
      <div className="flex w-full py-2 gap-3 overflow-auto no-scrollbar">
        {AI_SAMPLE_QUESTIONS.map((question, index) => (
          <button
            key={index}
            className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed border dark:border-zinc-400 border-zinc-600 px-2 rounded-full shrink-0"
          >
            {question}
          </button>
        ))}
      </div>

      <form className="flex items-center justify-center gap-3">
        <input
          type="text"
          className="w-full flex-1 py-3 px-3 md:px-4 text-base border dark:border-zinc-400 border-zinc-600 rounded-full"
          placeholder="Ask a question"
        />

        <button
          type="submit"
          className="p-4 rounded-full bg-zinc-700 dark:bg-white text-white dark:text-zinc-700  shrink-0 text-base border dark:border-zinc-400 border-zinc-600 flex items-center justify-center"
        >
          <FiSend />
        </button>
      </form>
    </section>
  );
}
