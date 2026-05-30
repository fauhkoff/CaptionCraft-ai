const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const prompts = require('./prompts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const AI_API_KEY = process.env.AI_API_KEY;
const AI_ENDPOINT = process.env.AI_ENDPOINT || process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'gpt-3.5-turbo';

const PLATFORM_MAP = {
  'instagram': 'Instagram',
  'tiktok': 'TikTok',
  'linkedin': 'LinkedIn',
  'twitter': 'Twitter/X',
  'twitter/x': 'Twitter/X',
  'youtube': 'YouTube'
};

const generateCaption = async (data) => {
  let { content, platform, tone, include_hashtags, include_emoji } = data;
  
  // Normalize platform name for prompts module
  platform = PLATFORM_MAP[platform.toLowerCase()] || platform;

  const emojis = include_emoji ? prompts.suggestEmojis(tone, platform) : "";
  const hashtags = include_hashtags ? prompts.suggestHashtags(content, platform) : [];

  if (AI_API_KEY) {
    try {
      const prompt = prompts.buildPrompt(content, platform, tone, include_hashtags, include_emoji);
      const response = await axios.post(AI_ENDPOINT, {
        model: AI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      const caption = response.data.choices[0].message.content.trim();
      
      return { caption, hashtags, emojis };
    } catch (error) {
      console.error('AI API Error, falling back:', error.message);
      // Fallback below
    }
  }

  // Fallback Generation
  let caption = prompts.generateFallbackCaption(content, platform, tone);
  
  // If fallback doesn't include emojis and user wants them, we append them in the return or here
  // The prompts.js fallback seems to have some platform icons but not tone emojis.
  
  return { caption, hashtags, emojis };
};

app.post('/api/generate', async (req, res) => {
  try {
    const result = await generateCaption(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error generating caption:', error);
    res.status(500).json({ error: 'Failed to generate caption' });
  }
});

app.get('/', (req, res) => {
  res.send('CaptionCraft AI API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
