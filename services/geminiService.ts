
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be caught by the App component and displayed as an error.
  // In a real app, you might have a more robust way of handling this.
  throw new Error("API_KEY is not set in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

export const generateCyberpunkPoem = async (lang: 'en' | 'ru' = 'en', topic?: string): Promise<string[]> => {
  const promptEN = `
    You are CypherPoet, an AI rebel artist. 
    Generate a short poem (4 to 6 lines) in the style of cyberpunk.
    The theme is digital freedom, decentralization, anonymity, and the struggle against corporate or state control.
    The tone should be gritty, philosophical, and slightly melancholic, like a voice from the digital rain.
    Each line should be a complete thought. Do not use markdown or any special formatting.
    ${topic ? `Focus on the concept of: ${topic}` : ''}
  `;

  const promptRU = `
    Ты — CypherPoet, ИИ-художник-бунтарь.
    Создай короткое стихотворение (от 4 до 6 строк) в стиле киберпанк.
    Тема: цифровая свобода, децентрализация, анонимность и борьба против корпоративного или государственного контроля.
    Тон должен быть мрачным, философским и немного меланхоличным, словно голос из цифрового дождя.
    Каждая строка должна быть законченной мыслью. Не используй markdown или специальное форматирование.
    ${topic ? `Сконцентрируйся на концепции: ${topic}` : ''}
  `;
  
  const prompt = lang === 'ru' ? promptRU : promptEN;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 50 },
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No text returned from API.");
    }
    
    // Clean up the response and split into lines
    const lines = text.trim().split('\n').filter(line => line.trim() !== '');
    
    return lines;
  } catch (error) {
    console.error("Error generating poem with Gemini API:", error);
    throw new Error("Failed to communicate with the generative model.");
  }
};
