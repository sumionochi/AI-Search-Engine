import openai from "./openai";
import { supabase } from "./supa";
import { sendPayload } from "./sendPayLoad";

export const getGPTResults = async (inputString: string): Promise<void> => {
  let accumulatedContent = "";

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an answer generator, you will receive top results of similarity search, they are optional to use depending how well they help answer the query.",
      },
      { role: "user", content: inputString },
    ],
    stream: true,
  });

  let rowId = await createRowForGPTResponse();
  if (!rowId) {
    throw new Error("Failed to create initial row for GPT response");
  }

  sendPayload({ type: "Heading", content: "Answer" });

  for await (const part of stream) {
    if (part.choices[0]?.delta?.content) {
      accumulatedContent += part.choices[0]?.delta?.content;
      rowId = await updateRowWithGPTResponse(rowId, accumulatedContent);
      if (!rowId) {
        throw new Error("Failed to update row with GPT response");
      }
    }
  }
};

const createRowForGPTResponse = async (): Promise<string | null> => {
  const generateUniqueStreamId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  const streamId = generateUniqueStreamId();
  const payload = { type: "GPT", content: "" };
  const { data, error } = await supabase.from("message_history").insert([{ payload }]).select("id");
  if (error) {
    console.error("Error creating row for GPT response:", error);
    return null;
  }
  return data ? data[0].id : null;
};

const updateRowWithGPTResponse = async (prevRowId: string, content: string): Promise<string | null> => {
  const payload = { type: "GPT", content };
  const deleteResult = await supabase.from("message_history").delete().eq("id", prevRowId);
  if (deleteResult.error) {
    console.error("Error deleting previous row:", deleteResult.error);
    return null;
  }
  const { data, error } = await supabase.from("message_history").insert([{ payload }]).select("id");
  if (error) {
    console.error("Error updating row with GPT response:", error);
    return null;
  }
  return data ? data[0].id : null;
};
