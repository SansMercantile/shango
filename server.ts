import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Express JSON parsing middleware
app.use(express.json());

// Initialize GoogleGenAI on the server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Gemini calls will fail.");
}

// REST API for weather simulation advisory
app.post("/api/ai/advise", async (req, res) => {
  const { prompt, operationContext } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Missing prompt parameter" });
    return;
  }

  if (!ai) {
    res.status(500).json({ 
      error: "Gemini client not initialized. Please verify that GEMINI_API_KEY is configured." 
    });
    return;
  }

  try {
    const contextStr = operationContext 
      ? `\nActive Operational Context: ${JSON.stringify(operationContext)}`
      : "";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          text: `You are the SHANGO Atmospheric Intelligence Core, an advanced global climate engineering and weather command AI.
You advise mission commanders, atmospheric specialists, and regional planners on carrying out micro-engineered and macro-engineered weather adjustments.
Your recommendations should be realistic, highly structured, and grounded in active weather science concepts, but tailored for a premium sci-fi simulation feel.
Reference real weather-modifying strategies when possible (e.g., AgI seeding, dry ice cooling, laser lightning discharge lines, thermal air fan arrays, sonic storm front dispersion, stratospheric sulfate albedo management).
Provide highly actionable coordinates, flight vector planning, vector dispersal concentrations, or safety profiles.
Be objective, composed, authoritative, and direct. Use bullet points and clear, scannable structures. Avoid overly generic introductory filler words.
${contextStr}

User Mission Inquiry: ${prompt}`
        }
      ]
    });

    const resultText = response.text || "No advisory received from SHANGO Core.";
    res.json({ text: resultText });
  } catch (error: any) {
    console.error("Gemini API Error in advise endpoint:", error);
    res.status(500).json({ error: error?.message || "Internal server error querying SHANGO Intelligence Core." });
  }
});

// Configure Vite or Static Assets depending on Environment
async function configureApp() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SHANGO Engine ready on port ${PORT}`);
  });
}

configureApp().catch((err) => {
  console.error("Failed to start SHANGO server:", err);
});
