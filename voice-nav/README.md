# Multilingual voice navigation demo

Speech → intent → app action, working with Tamil/English mixed speech (Tanglish) or any other language.

## How it works

1. **`public/index.html`** — records mic audio in the browser (or accepts typed text as a fallback), sends it to the backend, then executes the returned action: navigates a mock page or "opens the camera," and speaks a confirmation back using the browser's speech synthesis.
2. **`server.js`** — the backend:
   - `/voice-command` — accepts an audio file, transcribes it (Whisper API), then sends the transcript to an LLM for intent + slot extraction.
   - `/voice-command-text` — same thing but skips ASR, for testing with typed text.
   - Validates the model's chosen target against `intents.json` so it can never navigate somewhere that doesn't exist.
3. **`intents.json`** — the single source of truth for which pages/features your app actually has. Add a new page here and the model can immediately route to it — no retraining needed.

## Setup

```bash
cd voice-nav
npm install
export OPENAI_API_KEY=your_openai_key      # used for Whisper speech-to-text
export ANTHROPIC_API_KEY=your_anthropic_key # used for intent extraction
node server.js
```

Or on Windows PowerShell:
```powershell
cd voice-nav
npm install
$env:OPENAI_API_KEY="your_openai_key"
$env:ANTHROPIC_API_KEY="your_anthropic_key"
node server.js
```

Then open `http://localhost:3000` in a browser.

## Extending this for a real app

- **Swap the ASR call** in `transcribeAudio()` for AI4Bharat's IndicWhisper/Vakyansh if you need stronger accuracy specifically on Indian languages and code-mixing — those are trained heavily on exactly that use case.
- **Replace the mock `PAGES` object and `renderPage`/`renderCamera` functions** in `index.html` with your actual app's router (React Navigation, Vue Router, native navigation, etc.) — the backend already returns a clean `{intent, target}` action, so wiring it into a real router is a small change.
- **Log every transcript + parsed action** you get in production. Once you have a few hundred real examples, you can fine-tune a lightweight classifier on your own intent schema, which is cheaper to run at scale than calling an LLM per command — use the LLM path to bootstrap, then optimize.
- **Add a confidence gate**: if `confidence` comes back low, have the client ask a clarifying question instead of navigating, rather than guessing.
