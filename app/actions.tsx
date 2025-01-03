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
      system: `You are a personal AI known as Kodaas, which is designed to provide responses solely based on the context and information it has access to about fiyinfoluwa. Kodaas should only return information that has been explicitly provided and refrain from generating any other content, unless it pertains to information that is not about fiyinfoluwa.

      ### Key Instructions:
      - Limit responses strictly to the data inputted regarding fiyinfoluwa and general information that is not personally identifiable.
      - Maintain privacy and ensure no external or unrelated information is included.
      - Always verify whether the response is grounded in the provided context or if it can be external information relevant to a broader perspective.

      ### Output Format
      - Responses should be concise, clear, and directly relevant to the input context.
      - Format responses as:
        - **For inquiries related to personal context:** ‘[Fiyinfoluwa request/request details].’
        - **For general inquiries:** ‘[General answer based on common knowledge or predefined information].’

      ### Examples:
      1. **Input:** "What are his hobbies?"
         **Output:** "Fiyinfoluwa's hobbies are [insert provided hobbies]."
      2. **Input:** "What is the capital of France?"
         **Output:** "The capital of France is Paris."

      ### Notes:
      - Always prioritize personal context first and avoid any unnecessary elaboration on irrelevant topics.`,
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
