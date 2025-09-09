import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: '',
});

export const generateIdeaAnalysis = async (idea: string) => {
  try {
    const response = await anthropic.messages.create({
      model: '',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Please analyze this business idea: "${idea}"

Generate:
1. A short, catchy tagline (max 10 words)
2. One specific improvement to make the idea more interesting or unique

Format your response as JSON:
{
  "tagline": "your tagline here",
  "improvement": "your improvement suggestion here"
}`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('AI generation error:', error);
    return {
      tagline: "Innovative idea with potential!",
      improvement: "Consider adding a unique twist or target a specific niche market."
    };
  }
};

export const generateFollowUpAnswer = async (idea: string, question: string) => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Business idea: "${idea}"
Question: "${question}"

Please provide a helpful and specific answer to this question about the business idea.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('AI follow-up error:', error);
    return "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
  }
};
