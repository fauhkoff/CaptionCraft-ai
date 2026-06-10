# CaptionCraft AI

AI-powered caption generator that creates platform-optimized, engaging captions for social media posts in seconds.

## Project Overview

CaptionCraft AI helps content creators, social media managers, and small business owners overcome writer's block by generating high-quality captions tailored for various platforms and tones.

## Features

- **Multi-Platform Support**: Instagram, TikTok, LinkedIn, Twitter/X, and YouTube.
- **Tone Customization**: Professional, casual, funny, inspirational, and witty.
- **AI-Powered**: Uses LLMs (OpenAI-compatible) for generation.
- **Smart Fallback**: Template-based fallback when AI is unavailable.
- **Interactive UI**: Real-time generation with emoji and hashtag suggestions.
- **Responsive Design**: Clean and modern UI that works on all devices.

## Tech Stack

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Icons**: Lucide React
- **Styling**: Modern CSS (Inter font)
- **API**: Axios for communication

## Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation
Clone the project and install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Backend Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=3001
AI_API_KEY=ee46db743077057463e73de3068881f9
AI_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo
```

### 4. Running the App
Start both servers (in separate terminals or in the background):

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm run dev
```
The app will be available at `http://localhost:5173`.

## API Documentation

### POST /api/generate
Generates a social media caption.

**Request Body:**
```json
{
  "content": "A beautiful sunset in Santorini",
  "platform": "instagram",
  "tone": "casual",
  "include_emoji": true,
  "include_hashtags": true
}
```

**Response:**
```json
{
  "caption": "Soaking in every second of this Santorini magic. ✨",
  "hashtags": ["#santorini", "#sunset", "#travel"],
  "emojis": "🌅🇬🇷✨"
}
```

## Platform & Tone Support

- **Platforms**: Instagram, TikTok, LinkedIn, Twitter/X, YouTube.
- **Tones**: Professional, Casual, Funny, Inspirational, Witty.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend port | `3001` |
| `AI_API_KEY` | API Key for LLM | Required for AI |
| `AI_ENDPOINT` | API Endpoint URL | `https://api.openai.com/v1/chat/completions` |
| `AI_API_URL` | Alias for `AI_ENDPOINT` | - |
| `AI_MODEL` | Model to use | `gpt-3.5-turbo` |

---
&copy; 2025 CaptionCraft AI.
