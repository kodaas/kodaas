import { Pinecone } from "@pinecone-database/pinecone";
import { z } from "zod";

const EnvSchema = z.object({
  PINECONE_API_KEY: z.string().min(1, "PINECONE_API_KEY is missing"),
  PINECONE_EMBEDDING_MODEL: z.string().min(1, "PINECONE_EMBEDDING_MODEL is missing"),
  PINECONE_DB_INDEX: z.string().min(1, "PINECONE_DB_INDEX is missing"),
  PINECONE_DB_NAMESPACE: z.string().min(1, "PINECONE_DB_NAMESPACE is missing"),
});

// Validate environment variables safely
const processEnv = {
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_EMBEDDING_MODEL: process.env.PINECONE_EMBEDDING_MODEL,
  PINECONE_DB_INDEX: process.env.PINECONE_DB_INDEX,
  PINECONE_DB_NAMESPACE: process.env.PINECONE_DB_NAMESPACE,
};

const env = EnvSchema.parse(processEnv);

const pc = new Pinecone({ apiKey: env.PINECONE_API_KEY });
const index = pc.index(env.PINECONE_DB_INDEX);

export async function queryPinecone(data: string): Promise<string[]> {
  try {
    const query = [data];
    const queryEmbedding = await pc.inference.embed(
      env.PINECONE_EMBEDDING_MODEL,
      query,
      { inputType: "query" },
    );

    const queryResponse = await index.namespace(env.PINECONE_DB_NAMESPACE).query({
      topK: 10,
      vector: queryEmbedding[0].values!,
      includeValues: false,
      includeMetadata: true,
    });

    return queryResponse.matches
      .map((match) => match?.metadata?.text as string | undefined)
      .filter((text): text is string => typeof text === "string");
  } catch (err) {
    console.error("Error querying Pinecone:", err);
    // Return empty array to allow the application to proceed without context
    // rather than injecting error messages into the LLM context.
    return [];
  }
}
