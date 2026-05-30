/**
 * Prompt Engineering Module for CaptionCraft AI
 */

const PLATFORM_GUIDELINES = {
  Instagram: {
    description: "Focus on storytelling, visual descriptions, and engagement. Use a mix of short and long-form text. Instagram users love personal touches and behind-the-scenes vibes. Start with a strong hook. Use line breaks for readability.",
    maxChars: 2200,
    structure: "Hook -> Story/Value -> Call to Action",
    example: "Capturing moments that matter. [Hook] This weekend was all about... [Body] Check out the full gallery in our bio! [CTA]"
  },
  TikTok: {
    description: "Short, punchy, and trend-aware. Focus on hooks and curiosity. The first sentence MUST grab attention immediately. TikTok is all about being authentic and fast-paced. Use popular TikTok slang if appropriate for the tone.",
    maxChars: 4000,
    structure: "Hook -> Brief Context -> Relevant Hashtags (separate)",
    example: "You won't believe what happened today! 😱 [Hook] Trying the newest trend... [Context]"
  },
  LinkedIn: {
    description: "Professional, value-driven, and thought-provoking. Use bullet points for readability. LinkedIn is about networking, professional growth, and industry insights. End with a question to encourage comments.",
    maxChars: 3000,
    structure: "Insightful Headline -> Body (Bullet points) -> Conclusion -> CTA/Question",
    example: "The future of remote work is changing. [Headline] Here are 3 things I've learned: \n• Consistency is key\n• Communication matters\n• Trust your team\nWhat's your take? [Question]"
  },
  Twitter: {
    description: "Concise, witty, and timely. Maximum 280 characters. Perfect for hot takes, quick updates, or thread starters. Use abbreviations sparingly but effectively.",
    maxChars: 280,
    structure: "Punchy Statement/Hook -> Brief Body (if room) -> CTA/Link placeholder",
    example: "Innovation isn't just a buzzword; it's a mindset. 🚀 [Hook] Here's why... [Body]"
  },
  "Twitter/X": {
    description: "Concise, witty, and timely. Maximum 280 characters. Perfect for hot takes, quick updates, or thread starters. Use abbreviations sparingly but effectively.",
    maxChars: 280,
    structure: "Punchy Statement/Hook -> Brief Body (if room) -> CTA/Link placeholder",
    example: "Innovation isn't just a buzzword; it's a mindset. 🚀 [Hook] Here's why... [Body]"
  },
  YouTube: {
    description: "SEO-friendly, engaging, and encourages clicks. Summarize the video content and include a clear Call to Action (CTA) like 'Subscribe' or 'Watch now'. Use keywords early in the description.",
    maxChars: 5000,
    structure: "Video Summary -> Key Takeaways -> Links -> CTA",
    example: "In today's video, we explore the world of AI. [Summary] You'll learn: \n- How prompts work\n- Tips for better output\nDon't forget to like and subscribe! [CTA]"
  }
};

const TONE_DESCRIPTIONS = {
  professional: "Formal, authoritative, and respectful. Use clear language and industry-standard terms where appropriate.",
  casual: "Friendly, relatable, and easy-going. Like you're talking to a friend. Use contractions and relaxed phrasing.",
  funny: "Humorous, entertaining, and perhaps a bit silly. Use jokes, puns, or relatable comedic situations.",
  inspirational: "Motivating, uplifting, and profound. Focus on growth, overcoming challenges, and positive outcomes.",
  witty: "Clever, sharp, and quick-witted. Use wordplay, irony, or smart observations."
};

/**
 * Processes content to identify its type (question, action, description).
 */
function processContent(description) {
  const trimmed = description.trim();
  const lower = trimmed.toLowerCase();
  
  if (trimmed.endsWith('?') || lower.startsWith('why') || lower.startsWith('how') || lower.startsWith('can') || lower.startsWith('what')) {
    return 'question';
  }
  
  const actionWords = ['launching', 'starting', 'creating', 'making', 'building', 'celebrating', 'announcing'];
  if (actionWords.some(word => lower.includes(word))) {
    return 'action';
  }

  if (trimmed.length < 60 && !trimmed.includes('.') && !trimmed.includes(',')) {
    return 'short_description';
  }
  
  return 'statement';
}

/**
 * Builds a prompt for the LLM to generate a caption.
 */
function buildPrompt(description, platform, tone, includeHashtags = false, includeEmoji = false) {
  const platformInfo = PLATFORM_GUIDELINES[platform] || { 
    description: "Create an engaging caption.", 
    maxChars: 1000, 
    structure: "Hook -> Body -> CTA",
    example: "Engaging content here. [Hook] Details follow... [Body]"
  };
  const toneDesc = TONE_DESCRIPTIONS[tone] || "Use a natural tone.";

  return `
You are a social media expert and professional copywriter. Generate a high-quality, high-engagement caption for the following content:
Content Description: ${description}
Platform: ${platform}
Tone: ${tone}

Platform-Specific Guidelines for ${platform}:
- Strategy: ${platformInfo.description}
- Character Limit: Strictly under ${platformInfo.maxChars} characters.
- Required Structure: ${platformInfo.structure}
- Example Style: ${platformInfo.example}

Tone Instructions:
${toneDesc}

Writing Requirements:
1. Hook: Start with a powerful opening hook that stops the scroll.
2. Body: Expand on the content with value, story, or intrigue. Use short paragraphs and line breaks.
3. CTA (Call to Action): End with a clear, platform-appropriate CTA (e.g., "Link in bio", "Drop a comment", "Tag a friend").
4. ${includeEmoji ? 'Emojis: Use 2-3 relevant emojis to enhance the message. Place them strategically, not just at the end.' : 'Do NOT use emojis.'}
5. Hashtags: Do NOT include hashtags in the text block; our system appends them separately.
6. Target Audience: Tailor the language to appeal to the typical user on ${platform}.

Generated Caption:`.trim();
}

/**
 * Generates a simple fallback caption using templates when AI is unavailable.
 */
function generateFallbackCaption(description, platform, tone) {
  const contentType = processContent(description);
  
  // Helper to normalize the description for insertion (lowercase start if needed)
  const formatDesc = (desc) => {
    const d = desc.trim();
    return d.charAt(0).toLowerCase() + d.slice(1);
  };

  const templates = {
    question: {
      professional: [
        `Exploring the nuances of: ${description}. What are your professional thoughts?`,
        `Regarding ${description}: How is your organization approaching this challenge?`,
        `Insight needed: ${description}. Let's discuss the strategic implications.`
      ],
      casual: [
        `Thinking about ${description}... what do you guys think?`,
        `Quick question for you all: ${description}?`,
        `Curious about ${description}. Any tips or ideas?`
      ],
      funny: [
        `Is it just me or is ${description} a total mystery? 😂`,
        `Asking for a friend: ${description}? Just for science.`,
        `The real question is: ${description}? And where is my coffee?`
      ]
    },
    action: {
      professional: [
        `We are proud to be ${formatDesc(description)}. This marks a significant milestone in our journey.`,
        `Currently ${formatDesc(description)} and focusing on delivering maximum value to our clients.`,
        `Innovation in progress: ${description}. Stay tuned for more updates.`
      ],
      casual: [
        `So excited to be ${formatDesc(description)} today! It's been a long time coming.`,
        `Finally ${formatDesc(description)} and I couldn't be happier with the results!`,
        `Just finished ${formatDesc(description)} - what a day! ✨`
      ],
      funny: [
        `I'm ${formatDesc(description)} - wish me luck (I'm going to need it).`,
        `Attempting to be productive while ${formatDesc(description)}. 50/50 chance of success.`,
        `If you see me ${formatDesc(description)}, mind your business. 😂`
      ]
    },
    short_description: {
      professional: [
        `Presenting ${description}. A modern approach to industry excellence.`,
        `Our latest update: ${description}. Designed for impact.`,
        `Focusing on ${description} this week. Quality matters.`
      ],
      casual: [
        `Obsessed with ${description}! ✨`,
        `Just ${description} things. Loving it.`,
        `Finally sharing ${description} with you all!`
      ],
      funny: [
        `Me vs ${description}. Guess who's winning?`,
        `Standard procedure for ${description}. Don't ask.`,
        `${description}: because I like to live dangerously.`
      ]
    },
    statement: {
      professional: [
        `Elevate your approach to ${description} with these industry insights.`,
        `The evolution of ${description} is redefining our strategy.`,
        `Driving results in ${description} requires a balanced perspective.`
      ],
      casual: [
        `Can't get enough of ${description} lately!`,
        `Spending my day with ${description} and loving every minute.`,
        `If you're into ${description}, you're going to love this update.`
      ],
      funny: [
        `Me: I should be working. Also me: thinking about ${description}.`,
        `${description} - because sometimes adulthood is just too much.`,
        `Current status: 90% coffee, 10% ${description}.`
      ]
    }
  };

  const toneKey = templates.statement[tone] ? tone : 'casual';
  const typeKey = templates[contentType] ? contentType : 'statement';
  
  const selectedList = templates[typeKey][toneKey] || templates.statement.casual;
  const base = selectedList[Math.floor(Math.random() * selectedList.length)];

  const platformAddons = {
    Instagram: " Check the link in bio! 📸",
    TikTok: " Watch 'til the end! 🎥",
    LinkedIn: " What are your thoughts on this? 📌",
    Twitter: " #trending",
    "Twitter/X": " #trending",
    YouTube: " Subscribe for more! 📺"
  };

  const addon = platformAddons[platform] || "";
  return base + addon;
}

/**
 * Suggests hashtags based on content and platform.
 */
function suggestHashtags(content, platform) {
  const contentLower = content.toLowerCase();
  
  const keywords = contentLower
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  const categoryHashtags = {
    tech: ["#tech", "#innovation", "#coding", "#software", "#futuretech", "#AI", "#digital"],
    business: ["#business", "#entrepreneur", "#growth", "#startup", "#marketing", "#leadership"],
    lifestyle: ["#lifestyle", "#dailyvlog", "#mindset", "#happiness", "#wellness", "#vibe"],
    food: ["#foodie", "#recipe", "#cooking", "#delicious", "#instafood", "#yum"],
    travel: ["#travel", "#adventure", "#explore", "#wanderlust", "#vacation", "#travelgram"],
    fashion: ["#fashion", "#style", "#ootd", "#outfit", "#instafashion", "#lookbook"],
    fitness: ["#fitness", "#workout", "#health", "#motivation", "#gym", "#training"]
  };

  const categoryKeywords = {
    tech: ["code", "software", "app", "tech", "digital", "ai", "data", "web", "computer", "robot"],
    business: ["money", "business", "work", "office", "startup", "strategy", "market", "sales", "ceo"],
    lifestyle: ["life", "day", "home", "mind", "happy", "health", "wellness", "living"],
    food: ["eat", "food", "recipe", "cook", "dinner", "lunch", "breakfast", "yum", "delicious", "kitchen"],
    travel: ["trip", "travel", "world", "place", "city", "beach", "mountain", "plane", "hotel"],
    fashion: ["wear", "clothes", "style", "dress", "outfit", "look", "model", "brand", "shopping"],
    fitness: ["gym", "train", "workout", "fitness", "run", "sport", "active", "muscle", "healthy"]
  };

  let categoryTags = [];
  for (const [category, words] of Object.entries(categoryKeywords)) {
    if (words.some(word => contentLower.includes(word))) {
      categoryTags = [...categoryTags, ...categoryHashtags[category]];
    }
  }

  const commonTags = ["#viral", "#trending", "#content", "#foryou", "#reels"];
  
  // Weighting: 1. Category tags, 2. Content keywords, 3. Platform/Common tags
  const combined = [
    ...new Set([
      ...categoryTags, 
      ...keywords.map(k => `#${k}`), 
      ...commonTags
    ])
  ];
  
  const platformSpecific = {
    Instagram: ["#igdaily", "#instagood", "#photooftheday"],
    TikTok: ["#fyp", "#foryoupage", "#tiktokviral"],
    LinkedIn: ["#professional", "#networking", "#success"],
    Twitter: ["#breaking", "#news", "#thoughts"],
    "Twitter/X": ["#breaking", "#news", "#thoughts"],
    YouTube: ["#vlog", "#video", "#subscribe"]
  };

  const finalHashtags = [...combined, ...(platformSpecific[platform] || [])];
  
  return [...new Set(finalHashtags)].slice(0, 10);
}

/**
 * Suggests emojis based on tone and platform (Deterministic selection).
 */
function suggestEmojis(tone, platform) {
  const toneEmojis = {
    professional: ["💼", "📈", "🎯", "📝"],
    casual: ["😊", "✨", "👋", "🌟"],
    funny: ["😂", "🤣", "😜", "💀"],
    inspirational: ["🚀", "💪", "🌈", "💡"],
    witty: ["😏", "🧠", "🧐", "🎭"]
  };

  const platformEmojis = {
    Instagram: ["📸", "❤️"],
    TikTok: ["🎥", "🔥"],
    LinkedIn: ["📌", "✅"],
    Twitter: ["🐦", "📢"],
    "Twitter/X": ["🐦", "📢"],
    YouTube: ["📺", "🔔"]
  };

  const base = toneEmojis[tone] || toneEmojis.casual;
  const extra = platformEmojis[platform] || [];
  
  // Deterministic pick: primary platform emoji + primary tone emojis
  const selection = [];
  if (extra.length > 0) selection.push(extra[0]);
  selection.push(...base);
  if (extra.length > 1) selection.push(extra[1]);
  
  return selection.slice(0, 4).join("");
}

module.exports = {
  buildPrompt,
  processContent,
  generateFallbackCaption,
  suggestHashtags,
  suggestEmojis
};
