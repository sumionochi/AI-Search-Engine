import openai from "./openai";

export async function command(inputString: string): Promise<string> {
  const gptAnswer = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a rephraser and always respond with a rephrased version of the input that is given to a search engine API. Always be succinct and use the same words as the input.",
      },
      { role: "user", content: inputString },
    ],
  });

  // Handle potential null or undefined response
  const rephrasedContent = gptAnswer.choices[0].message?.content;
  if (rephrasedContent == null) {
    throw new Error("Failed to get a valid response from the GPT model");
  }

  return rephrasedContent;
}
