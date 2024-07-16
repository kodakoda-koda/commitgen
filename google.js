const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  presencePenalty: 0,
  frequencyPenalty: 0,
  topP: 1,
};

export async function callGEMINI(prompt, message) {
  const system_prompt = { role: "system", content: prompt };
  const user_prompt = { role: "user", content: message };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstructions: system_prompt,
  });

  const completion = await model.startChat({
    generationConfig,
  });

  const result = await completion.sendMessage(user_prompt);
  return result.response.text();
}
