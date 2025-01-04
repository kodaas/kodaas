import { Pinecone } from "@pinecone-database/pinecone";

const {
  PINECONE_API_KEY,
  PINECONE_EMBEDDING_MODEL,
  // PINECONE_EMBEDDING_MODEL_INPUT_LIMIT,
  PINECONE_DB_INDEX,
  PINECONE_DB_NAMESPACE,
} = process.env;

const pc = new Pinecone({ apiKey: PINECONE_API_KEY! });
const index = pc.index(PINECONE_DB_INDEX!);

export async function queryPinecone(data: string) {
  try {
    const query = [data];
    const queryEmbedding = await pc.inference.embed(
      PINECONE_EMBEDDING_MODEL!,
      query,
      { inputType: "query" },
    );

    const queryResponse = await index.namespace(PINECONE_DB_NAMESPACE!).query({
      topK: 15,
      vector: queryEmbedding[0].values!,
      includeValues: false,
      includeMetadata: true,
    });

    return queryResponse.matches.map((match) => match?.metadata?.text);
  } catch (err) {
    throw new Error(`Error querying Pinecone: ${err}`);
  }
}
