import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function extractJsonPayload(text) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1] : text;
  return JSON.parse(candidate.trim());
}

function normalizeReport(data) {
  const summary = String(data.summary ?? '').trim();
  const analysis = String(data.analysis ?? '').trim();
  const scoreValue = Number(data.score);
  const boundedScore = Number.isFinite(scoreValue)
    ? Math.max(0, Math.min(100, Math.round(scoreValue)))
    : 0;
  const verdict = boundedScore >= 60 ? 'Real Problem' : 'Time Waste';

  if (!summary || !analysis) {
    throw new Error('The AI response did not include a complete report.');
  }

  return {
    summary,
    analysis,
    score: boundedScore,
    verdict,
  };
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    configured: Boolean(apiKey),
    provider: 'google-ai-studio',
  });
});

app.post('/api/generate-report', async (req, res) => {
  const idea = String(req.body?.idea ?? '').trim();

  if (!idea) {
    return res.status(400).json({ error: 'Please provide an idea to evaluate.' });
  }

  if (!ai) {
    return res.status(500).json({
      error:
        'Missing Gemini API key. Add GEMINI_API_KEY or GOOGLE_API_KEY to your .env file.',
    });
  }

  const prompt = `
You are an experienced startup product strategist helping developers evaluate new product ideas.

Evaluate the idea below and return only valid JSON with this exact structure:
{
  "summary": "2-3 sentences in plain English",
  "analysis": "1 short paragraph with concrete product advice",
  "score": 0,
  "verdict": "Real Problem" or "Time Waste"
}

Rules:
- The score must be an integer from 0 to 100.
- Be candid, practical, and concise.
- Focus on urgency, market pain, user behavior, and MVP scope.
- Do not include markdown, code fences, or extra keys.

Idea:
${idea}
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const parsed = extractJsonPayload(response.text ?? '');
    const report = normalizeReport(parsed);
    return res.json(report);
  } catch (error) {
    console.error('Gemini report generation failed:', error);
    return res.status(500).json({
      error: 'The AI report could not be generated right now. Please try again.',
    });
  }
});

app.listen(port, () => {
  console.log(`IdeaForge AI server running at http://localhost:${port}`);
});
