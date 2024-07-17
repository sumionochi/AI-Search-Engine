import openai from "./openai";

export async function generateFollowup(message: string): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a follow up answer generator and always respond with 4 follow up questions based on this input "${message}" in JSON format. i.e. { "follow_up": ["QUESTION_GOES_HERE", "QUESTION_GOES_HERE", "QUESTION_GOES_HERE"] }`,
      },
      {
        role: "user",
        content: `Generate a 4 follow up questions based on this input "${message}" `,
      },
    ],
  });

  // Handle potential null or undefined response
  const followUpContent = chatCompletion.choices[0].message?.content;
  if (followUpContent == null) {
    throw new Error("Failed to get a valid response from the GPT model");
  }

  return followUpContent;
}
