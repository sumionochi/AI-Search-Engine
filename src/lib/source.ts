import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BraveSearch } from "langchain/tools";
import openai from "./openai";
import { supabase } from "./supa";
import { fetchPageContent } from "./fetchPageContent";
import { command } from "./command";
import { sendPayload } from "./sendPayLoad";
import { getGPTResults } from "./results";
import { generateFollowup } from "./followUpCommand";

export async function searchEngineForSources(message: string): Promise<void> {
  const loader = new BraveSearch({ apiKey: process.env.BRAVE_SEARCH_API_KEY });
  const rephrasedMessage = await command(message);
  const docs = await loader.call(rephrasedMessage);

  function normalizeData(docs: string): { title: string; link: string }[] {
    return JSON.parse(docs)
      .filter((doc: any) => doc.title && doc.link && !doc.link.includes("brave.com"))
      .slice(0, 4)
      .map(({ title, link }: { title: string; link: string }) => ({ title, link }));
  }

  const normalizedData = normalizeData(docs);
  await sendPayload({ type: "Sources", content: normalizedData });

  let vectorCount = 0;

  const fetchAndProcess = async (item: { title: string; link: string }) => {
    try {
      const timer = new Promise<null>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500));
      const fetchPromise = fetchPageContent(item.link);
      const htmlContent = await Promise.race([timer, fetchPromise]);

      if (!htmlContent || htmlContent.length < 250) return null;

      const splitText = await new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 0 }).splitText(htmlContent);
      const vectorStore = await MemoryVectorStore.fromTexts(splitText, { annotationPosition: item.link }, new OpenAIEmbeddings());

      vectorCount++;
      return await vectorStore.similaritySearch(message, 1);
    } catch (error) {
      console.log(`Failed to fetch content for ${item.link}, skipping!`);
      vectorCount++;
      return null;
    }
  };

  const results = await Promise.all(normalizedData.map(fetchAndProcess));

  while (vectorCount < 4) {
    vectorCount++;
  }

  const successfulResults = results.filter((result) => result !== null);
  const topResult = successfulResults.length > 4 ? successfulResults.slice(0, 4) : successfulResults;

  await sendPayload({ type: "VectorCreation", content: `Finished Scanning Sources.` });
  await triggerLLMAndFollowup(`Query: ${message}, Top Results: ${JSON.stringify(topResult)}`);
}

async function triggerLLMAndFollowup(inputString: string): Promise<void> {
  await getGPTResults(inputString);
  const followUpResult = await generateFollowup(inputString);
  await sendPayload({ type: "FollowUp", content: followUpResult });
}
