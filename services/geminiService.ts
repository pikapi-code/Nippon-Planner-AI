import { GoogleGenAI } from "@google/genai";
import { UserPreferences, GeneratedItinerary } from "../types";

export const generateItinerary = async (prefs: UserPreferences): Promise<GeneratedItinerary> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing from environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a detailed 2-week (14 days) travel itinerary for Japan.
    
    Preferences:
    - Season: ${prefs.season}
    - Pace: ${prefs.pace}
    - Key Interests: ${prefs.interests.join(", ")}

    Requirements:
    1. Structure the response CLEARLY day by day. Use the format "## Day X: [Location] - [Title]" for each day header.
    2. For each day, provide:
       - Morning, Afternoon, Evening activities.
       - Specific restaurant recommendations for at least one meal.
       - Travel tips (train lines, passes).
    3. Include 1-2 "Hidden Gems" that fit the user's interests.
    4. Use Google Search to ensure venue names and transport details are accurate and current.
    5. Do NOT output JSON. Output formatted Markdown.
    6. Keep the tone inspiring but practical.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is not set because we are using googleSearch
        systemInstruction: "You are an expert Japan travel guide. You are knowledgeable about logistics, hidden spots, and cultural etiquette.",
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text: response.text || "No itinerary generated.",
      groundingChunks: groundingChunks.map((c: any) => ({
        web: c.web ? { uri: c.web.uri, title: c.web.title } : undefined
      })).filter((c: any) => c.web !== undefined),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};