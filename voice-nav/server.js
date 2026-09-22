/**
 * Voice Navigation Backend
 * -------------------------------------------------
 * Pipeline: audio -> ASR (speech-to-text) -> LLM intent extraction -> action JSON + spoken reply
 *
 * Env vars required:
 *   OPENAI_API_KEY     - used for Whisper speech-to-text (swap for AI4Bharat/Azure if preferred)
 *   ANTHROPIC_API_KEY  - used for intent extraction with Claude
 *
 * Run:
 *   npm install
 *   OPENAI_API_KEY=... ANTHROPIC_API_KEY=... node server.js
 */

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const intents = require("./intents.json");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: uploadsDir });

// Build the list of valid targets once, from intents.json.
// This is what stops the model from "navigating" to a page that doesn't exist.
const VALID_PAGES = intents.pages.map((p) => p.id);
const VALID_FEATURES = intents.features.map((f) => f.id);

/**
 * Local heuristic fallback when ANTHROPIC_API_KEY is not set.
 * Matches keywords and labels defined in intents.json.
 */
function localIntentFallback(text) {
  const lower = text.toLowerCase();
  for (const p of intents.pages) {
    if (p.labels.some((l) => lower.includes(l.toLowerCase()))) {
      const isTamil = /[\u0B80-\u0BFF]/.test(text) || lower.includes("poo") || lower.includes("pageku");
      return {
        intent: "navigate",
        target: p.id,
        confidence: 0.95,
        reply_language: isTamil ? "ta" : "en",
        spoken_reply: isTamil
          ? `${p.id} பக்கத்திற்கு செல்கிறேன்.`
          : `Navigating to ${p.id} page.`
      };
    }
  }
  for (const f of intents.features) {
    if (f.labels.some((l) => lower.includes(l.toLowerCase()))) {
      const isTamil = /[\u0B80-\u0BFF]/.test(text) || lower.includes("pannunga") || lower.includes("edukka");
      return {
        intent: "open_feature",
        target: f.id,
        confidence: 0.95,
        reply_language: isTamil ? "ta" : "en",
        spoken_reply: isTamil
          ? `${f.id} திறக்கப்படுகிறது.`
          : `Opening ${f.id}.`
      };
    }
  }
  return {
    intent: "unknown",
    target: null,
    confidence: 0.2,
    reply_language: "en",
    spoken_reply: "Sorry, I didn't understand that command. Can you repeat?"
  };
}

/**
 * Step 1: Speech-to-text.
 * Uses OpenAI's Whisper API here because it handles code-switched speech
 * (Tamil+English mixed, "Tanglish") reasonably well out of the box.
 * For production-grade Indian-language accuracy, swap this call for
 * AI4Bharat's IndicWhisper/Vakyansh models hosted on your own infra.
 */
async function transcribeAudio(filePath) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[VoiceNav] OPENAI_API_KEY not set. Falling back to local demonstration command.");
    return "camera open pannunga";
  }

  const audioData = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("file", new Blob([audioData]), "audio.webm");
  form.append("model", "whisper-1");
  // Do not force a single "language" param — leaving it unset lets Whisper
  // auto-detect and handle mixed-language utterances better.

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ASR failed: ${res.status} ${errText}`);
  }
  const data = await res.json();
  return data.text;
}

/**
 * Step 2: Intent + slot extraction via LLM.
 * The system prompt constrains the model to ONLY the pages/features that
 * actually exist in the app, and forces strict JSON output so the backend
 * can parse it reliably regardless of which language the user spoke.
 */
async function extractIntent(transcript) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("[VoiceNav] ANTHROPIC_API_KEY not set. Using offline schema matching fallback.");
    return localIntentFallback(transcript);
  }

  const systemPrompt = `You are a voice command parser for a mobile app.
The user may speak in Tamil, English, or a mix of both (Tanglish), or any other language.
Valid navigation pages: ${VALID_PAGES.join(", ")}
Valid device/app features: ${VALID_FEATURES.join(", ")}

Given the transcribed user speech, respond with ONLY a JSON object, no other text, no markdown fences:
{
  "intent": "navigate" | "open_feature" | "unknown",
  "target": "<page id or feature id, or null>",
  "confidence": <0 to 1>,
  "reply_language": "<the language the user spoke, e.g. 'ta' for Tamil, 'en' for English>",
  "spoken_reply": "<a short natural confirmation reply IN THE SAME LANGUAGE/STYLE the user spoke, e.g. Tanglish stays Tanglish>"
}

If the speech doesn't clearly match any valid page or feature, set intent to "unknown", target to null,
and spoken_reply to a polite clarification question in the user's language.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: transcript }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Intent extraction failed: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text = data.content.map((c) => c.text || "").join("");
  const cleaned = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    parsed = {
      intent: "unknown",
      target: null,
      confidence: 0,
      reply_language: "en",
      spoken_reply: "Sorry, I didn't understand that. Can you repeat it?",
    };
  }
  return parsed;
}

/**
 * Step 3: Validate the model's chosen target against the real intents list.
 * Never trust the LLM output blindly — this is what prevents the app from
 * trying to navigate to a page/feature that doesn't exist.
 */
function validateTarget(parsed) {
  if (parsed.intent === "navigate" && !VALID_PAGES.includes(parsed.target)) {
    return { ...parsed, intent: "unknown", target: null };
  }
  if (parsed.intent === "open_feature" && !VALID_FEATURES.includes(parsed.target)) {
    return { ...parsed, intent: "unknown", target: null };
  }
  return parsed;
}

// Main endpoint: accepts an audio file, returns the parsed action.
app.post("/voice-command", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No audio file provided" });

    const transcript = await transcribeAudio(req.file.path);
    fs.unlink(req.file.path, () => {}); // cleanup temp file

    let parsed = await extractIntent(transcript);
    parsed = validateTarget(parsed);

    res.json({ transcript, ...parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Convenience endpoint for testing with plain text instead of audio.
app.post("/voice-command-text", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    let parsed = await extractIntent(text);
    parsed = validateTarget(parsed);

    res.json({ transcript: text, ...parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Voice nav backend running on port ${PORT}`));
