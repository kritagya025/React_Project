import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { fileURLToPath } from "url";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ideaRoutes from "./routes/ideaRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ── Load environment ──────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// ── Connect to MongoDB ───────────────────────────────────────────────────
connectDB();

// ── Express app ───────────────────────────────────────────────────────────
const app = express();
const port = Number(process.env.PORT) || 3001;

// ── Gemini AI ─────────────────────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// ── Middleware ─────────────────────────────────────────────────────────────
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// ── API Routes ────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/collaboration", collaborationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);

// ── Health check ──────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    configured: Boolean(apiKey),
    provider: "google-ai-studio",
  });
});

// ── Root ──────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "IdeaForge Backend is running!" });
});

// ── Gemini AI Report Generation ───────────────────────────────────────────
function extractJsonPayload(text) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1] : text;
  return JSON.parse(candidate.trim());
}

function normalizeReport(data) {
  const summary = String(data.summary ?? "").trim();
  const analysis = String(data.analysis ?? "").trim();
  const scoreValue = Number(data.score);
  const boundedScore = Number.isFinite(scoreValue)
    ? Math.max(0, Math.min(100, Math.round(scoreValue)))
    : 0;
  const requestedVerdict = String(data.verdict ?? "").trim();
  const allowedVerdicts = new Set(["Real Problem", "Niche", "Time Waste"]);
  const verdict = allowedVerdicts.has(requestedVerdict)
    ? requestedVerdict
    : boundedScore >= 70
      ? "Real Problem"
      : boundedScore >= 45
        ? "Niche"
        : "Time Waste";

  if (!summary || !analysis) {
    throw new Error("The AI response did not include a complete report.");
  }

  return { summary, analysis, score: boundedScore, verdict };
}

app.post("/api/generate-report", async (req, res) => {
  const idea = String(req.body?.idea ?? "").trim();

  if (!idea) {
    return res.status(400).json({ error: "Please provide an idea to evaluate." });
  }

  if (!ai) {
    return res.status(500).json({
      error:
        "Missing Gemini API key. Add GEMINI_API_KEY or GOOGLE_API_KEY to your .env file.",
    });
  }

  const prompt = `
You are a strict startup idea validation expert.

Evaluate the idea below and return only valid JSON with this exact structure:
{
  "summary": "Section 1 only, formatted in markdown with heading '1. Idea Summary' and 3-5 specific bullet points",
  "analysis": "Sections 2-8 only, formatted in markdown with separate numbered headings and 3-5 specific bullet points per section",
  "score": 0,
  "verdict": "Real Problem" or "Niche" or "Time Waste"
}

Rules:
- The score must be an integer from 0 to 100.
- The verdict must be exactly one of: Real Problem, Niche, Time Waste.
- Be candid, practical, detailed, and realistic.
- Avoid fluff and marketing language.
- Do not include code fences or extra keys.
- Do not merge sections.
- Each section must have a clear heading.
- Each section from 1 to 8 must contain at least 3 bullet points and preferably 3-5 bullet points.
- Be specific, not generic.
- Use this exact report structure:
  1. Idea Summary
  2. Problem Validation
  3. Target Users
  4. Solution Breakdown
  5. Feasibility Analysis
  6. Market & Competition
  7. Monetization Strategy
  8. Challenges / Risks
  9. Final Score
  10. Verdict
- Put only section 1 in "summary", including the heading and bullets.
- Put sections 2 through 8 in "analysis", each with its own heading and bullets.
- In section 5, include:
  - whether this can be built with current technology
  - required technologies, tools, frameworks, or APIs
  - difficulty level: Easy, Medium, or Hard
- Do not include sections 9 and 10 inside "summary" or "analysis"; return them only via "score" and "verdict".

Idea:
${idea}
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const parsed = extractJsonPayload(response.text ?? "");
    const report = normalizeReport(parsed);
    return res.json(report);
  } catch (error) {
    console.error("Gemini report generation failed:", error);
    return res.status(500).json({
      error: "The AI report could not be generated right now. Please try again.",
    });
  }
});

// ── Start server ──────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`IdeaForge server running at http://localhost:${port}`);
});

export default app;
