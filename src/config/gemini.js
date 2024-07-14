import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDr7Ed8hXMSOcrhEQQiPCcRFMhP6iW91z0";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text(); // Return the response text directly
  } catch (error) {
    console.error("Error in run function:", error);
    throw error;
  }
}

export default run;
