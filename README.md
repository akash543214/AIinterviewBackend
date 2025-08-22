

# 🎤 AI Interview Backend (Express + TypeScript)

This backend records answers from the frontend, transcribes them with **Google Cloud Speech-to-Text**, and evaluates them with **Vertex AI (Gemini)**.  

It exposes APIs for:
- 🎙️ Transcribing audio answers
- 🤖 Evaluating answers against a job description
- 🩺 Health check & AI test

---

## 🚀 Features
- Upload audio (`.webm` / `.ogg` with Opus codec, 48kHz)
- Google Cloud **Speech-to-Text** for transcription
- **Vertex AI (Gemini)** for evaluation
- Markdown-formatted feedback for frontend display

---

---

## env

GOOGLE_APPLICATION_CREDENTIALS=""
GCP_PROJECT_ID=""
DATABASE_URL="

Download service token json from GPC seperately and load from resources

## Setup

### 1. Clone & Install
```bash
git clone <your-repo>
cd backend
npm install
