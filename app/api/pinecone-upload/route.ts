// import { MY_INFO } from "@/app/constant";
import { Pinecone } from "@pinecone-database/pinecone";
import { nanoid } from "nanoid";

type RawData = {
  id: string;
  text: string;
};

const {
  PINECONE_API_KEY,
  PINECONE_EMBEDDING_MODEL,
  // PINECONE_EMBEDDING_MODEL_INPUT_LIMIT,
  PINECONE_DB_INDEX,
  PINECONE_DB_NAMESPACE,
} = process.env;

const pc = new Pinecone({ apiKey: PINECONE_API_KEY! });
const index = pc.index(PINECONE_DB_INDEX!);
// const LIMIT_PER_REQUEST = parseInt(PINECONE_EMBEDDING_MODEL_INPUT_LIMIT!) || 10;

const data: Array<RawData> = [];

export async function GET() {
  // formatData(MY_INFO.replaceAll("\n", "")).forEach((item) => data.push(item));

  const dataParts = data.slice(40, 50);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const embeddings: Array<any> = await getEmbeddings(dataParts);

  const records = dataParts.map((d, i) => ({
    id: d.id,
    values: embeddings[i].values,
    metadata: { text: d.text },
  }));

  await index.namespace(PINECONE_DB_NAMESPACE!).upsert(records);

  return Response.json({
    message: "Data inserted successfully!",
    data: dataParts,
  });
}

function formatData(content: string): Array<RawData> {
  const data: Array<RawData> = [];
  const numChars = 300;

  const contentArray: string[] = [];

  for (let i = 0; i < content.length; i += numChars) {
    contentArray.push(content.substring(i, i + numChars));
  }

  contentArray.forEach((text) => {
    const item: RawData = {
      id: nanoid(12),
      text,
    };

    data.push(item);
  });

  return data;
}

async function getEmbeddings(data: Array<RawData>) {
  return await pc.inference.embed(
    PINECONE_EMBEDDING_MODEL!,
    data.map((d) => d.text),
    { inputType: "passage", truncate: "END" },
  );
}
