"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { nanoid } from "nanoid";
import showdown from "showdown";
import ReactHtmlParser from "react-html-parser";

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
  const converter = new showdown.Converter();

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

      const htmlString = converter.makeHtml(content);
      // console.log(htmlString);
      // console.log("");
      // console.log("");
      // console.log("END");
      // console.log("***** END *****");
      const reactNodeFormat = ReactHtmlParser(htmlString);

      return <div className="ai-text-response">{reactNodeFormat}</div>;
    },
  });

  console.log("continueConversation", input);

  return {
    id: nanoid(10),
    role: "assistant",
    display: result.value,
  };
}
