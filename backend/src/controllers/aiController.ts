import type { Request, Response } from 'express';
import { GoogleGenerativeAI, SchemaType, type Schema } from "@google/generative-ai"; 
import prisma from "../lib/prisma.js";
import dotenv from 'dotenv';

dotenv.config();

// 1. Initialize ONCE outside the handler to prevent re-init errors
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const schema: Schema = {
  description: "List of movie titles",
  type: SchemaType.ARRAY,
  items: { type: SchemaType.STRING },
};

// Define the model once
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
    temperature: 0.1, 
  }
});

export const recommendMovies = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // 2. Fetch fresh titles from DB
    const allMovies = await prisma.movie.findMany({ select: { title: true } });
    if (allMovies.length === 0) return res.json([]);

    const movieTitles = allMovies.map(m => m.title).join(", ");

    const aiPrompt = `
      Match the user request: "${prompt}" 
      against this list: [${movieTitles}]. 
      Return exactly 3 titles from the list.
    `;

    // 3. Call AI
    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const text = response.text();

    // 4. Safe JSON Parsing
    let recommendedTitles: string[];
    try {
      recommendedTitles = JSON.parse(text);
    } catch (parseError) {
      console.error("Malformed AI Response:", text);
      return res.status(500).json({ error: "AI returned invalid format" });
    }

    // 5. Database matching
    const movies = await prisma.movie.findMany({
      where: {
        title: {
          in: recommendedTitles,
          mode: 'insensitive' 
        }
      }
    });

    res.json(movies);

  } catch (error: any) {
    // 6. Log the specific error for debugging
    console.error("CRITICAL AI ERROR:", error);
    
    // Check if it's a safety/quota error from Google
    const status = error.status || 500;
    res.status(status).json({ 
      error: "AI Recommendation failed", 
      details: error.message 
    });
  }
};