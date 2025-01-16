"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { nanoid } from "nanoid";
import { AiRoles } from "@/types";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { CustomMarkdownComponent } from "./components/shared/CustomPortableText";
import { SYSTEM_PROMPT } from "./constant";
import { queryPinecone } from "./pinecone";

export type ServerMessage = {
  role: AiRoles;
  content: string;
};

export interface ClientMessage {
  id: string;
  role: AiRoles;
  display: ReactNode;
}

export async function continueConversation(input: string) {
  const history = getMutableAIState();
  // const converter = new showdown.Converter();

  try {
    const context = await queryPinecone(input);

    const result = await streamUI({
      model: google("gemini-2.0-flash-exp"),
      temperature: 0.5,
      system: `${SYSTEM_PROMPT} ${context.join("\n")}`,
      messages: [...history.get(), { role: "user", content: input }],
      text: ({ content, done }) => {
        if (done) {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            { role: "assistant", content },
          ]);
        }

        // return <div>{content}</div>;
        return (
          <Markdown
            rehypePlugins={[rehypeHighlight]}
            components={CustomMarkdownComponent}
            skipHtml={false}
          >
            {content}
          </Markdown>
        );
      },
    });

    return {
      id: nanoid(10),
      role: "assistant",
      display: result.value,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      id: nanoid(10),
      role: "error",
      display: (
        <div>
          😢 Sorry An Error Occured: {err["lastError"].name} -{" "}
          {err["lastError"].data.error.message}
        </div>
      ),
    };
  }
}
