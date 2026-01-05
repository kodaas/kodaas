import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import path from "path";

// 1. Setup Pinecone
const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_DB_INDEX;
const namespace = process.env.PINECONE_DB_NAMESPACE;
const model = process.env.PINECONE_EMBEDDING_MODEL;

if (!apiKey || !indexName || !namespace || !model) {
    console.error("Missing Pinecone environment variables");
    process.exit(1);
}

const pc = new Pinecone({ apiKey });
const index = pc.index(indexName);

// 2. Read File
const filePath = path.join(process.cwd(), "Creating Fiyinfoluwa Ajala's Description.md");
const fileContent = fs.readFileSync(filePath, "utf-8");

// 3. Chunking Function
function chunkMarkdown(markdown: string) {
    const lines = markdown.split("\n");
    const chunks: { id: string; text: string }[] = [];
    let currentChunk: string[] = [];
    let currentHeader = "section";
    let chunkCount = 0;

    for (const line of lines) {
        if (line.startsWith("#")) {
            // If we have accumulated content, push it as a chunk
            if (currentChunk.length > 0) {
                chunks.push({
                    id: `bio-${chunkCount++}`,
                    text: currentChunk.join("\n").trim(),
                });
            }
            // Start new chunk
            currentChunk = [line];
            currentHeader = line.replace(/^#+\s*/, "").substring(0, 50); // simplified ID part
        } else {
            currentChunk.push(line);
        }
    }

    // Push last chunk
    if (currentChunk.length > 0) {
        chunks.push({
            id: `bio-${chunkCount++}`,
            text: currentChunk.join("\n").trim(),
        });
    }

    // Filter out empty chunks
    return chunks.filter(c => c.text.length > 50); // minimum meaningful length
}

async function run() {
    console.log("Starting upload process...");

    // 4. Chunk Data
    const chunks = chunkMarkdown(fileContent);
    console.log(`Generated ${chunks.length} chunks.`);

    // 5. Generate Embeddings & Upsert
    // Process in batches to avoid hitting limits if any
    const BATCH_SIZE = 10;

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE);

        console.log(`Processing batch ${i / BATCH_SIZE + 1}...`);

        // Generate embeddings
        const embeddings = await pc.inference.embed(
            model!,
            batch.map(c => c.text),
            { inputType: "passage" }
        );

        // Prepare records
        const records = batch.map((chunk, idx) => ({
            id: chunk.id,
            values: embeddings[idx].values!,
            metadata: {
                text: chunk.text,
                source: "Creating Fiyinfoluwa Ajala's Description.md",
                type: "bio"
            }
        }));

        // Upsert
        await index.namespace(namespace!).upsert(records);
        console.log(`Upserted ${records.length} records.`);
    }

    console.log("Upload complete!");
}

run().catch(console.error);
