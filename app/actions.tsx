"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { nanoid } from "nanoid";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(input: string) {
  const history = getMutableAIState();

  const result = await streamUI({
    model: google("gemini-1.5-pro"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <p>{content}</p>;
    },
  });

  console.log("continueConversation", input);

  return {
    id: nanoid(10),
    role: "assistant",
    display: result.value,
  };
}
