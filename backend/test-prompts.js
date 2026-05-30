const { buildPrompt, generateFallbackCaption, suggestHashtags, suggestEmojis } = require('./prompts');

const testCases = [
  { description: 'A cute cat playing with yarn', platform: 'Instagram', tone: 'casual' },
  { description: 'New project launch: CaptionCraft AI', platform: 'LinkedIn', tone: 'professional' },
  { description: 'POV: You just finished your first marathon', platform: 'TikTok', tone: 'inspirational' },
  { description: 'The sun is setting over the mountains', platform: 'Twitter', tone: 'witty' },
  { description: 'How to make the perfect sourdough bread', platform: 'YouTube', tone: 'professional' }
];

testCases.forEach(({ description, platform, tone }) => {
  console.log(`--- Test Case: ${platform} (${tone}) ---`);
  console.log('Description:', description);
  
  console.log('\n[Prompt]');
  console.log(buildPrompt(description, platform, tone, true, true));
  
  console.log('\n[Fallback]');
  console.log(generateFallbackCaption(description, platform, tone));
  
  console.log('\n[Hashtags]');
  console.log(suggestHashtags(description, platform));
  
  console.log('\n[Emojis]');
  console.log(suggestEmojis(tone, platform));
  console.log('\n');
});
