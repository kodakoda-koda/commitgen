import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  responseMimeType: "text/plain",
};

export async function callGEMINI(prompt, message) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstructions: prompt,
    history: [],
  });

  const completion = model.startChat({
    generationConfig,
  });

  const result = await completion.sendMessage(message);
  return result.response.text();
}
