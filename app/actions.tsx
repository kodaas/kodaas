"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { nanoid } from "nanoid";
import showdown from "showdown";
import ReactHtmlParser from "react-html-parser";
import { AiRoles } from "@/types";

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
  const converter = new showdown.Converter();

  try {
    const result = await streamUI({
      model: google("gemini-1.5-flash"),
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
