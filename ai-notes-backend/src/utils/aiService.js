const axios = require('axios');
const { OpenAI } = require("openai");

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Initialize OpenAI client for GPT-OSS-20B
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HUGGINGFACE_API_KEY,
});

// Generate summary using BART
const generateSummary = async (text) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: text },
      { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
    );

    return response.data[0]?.summary_text || 'No summary generated';
  } catch (err) {
    console.error('Summary generation error:', err.message);
    return 'Error generating summary';
  }
};

// Generate suggestions using GPT-OSS-20B chat API
const generateSuggestions = async (text) => {
  try {
    const prompt = `Provide 3 concise, actionable suggestions to improve this text:\n${text}`;

    const chatCompletion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:fireworks-ai",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestions = chatCompletion.choices[0].message.content || 'No suggestions generated';
    return suggestions;
  } catch (err) {
    console.error('Suggestions generation error:', err.message);
    return 'Error generating suggestions';
  }
};

// Wrapper function for noteController
const summarizeTextAndSuggestions = async (text) => {
  const summary = await generateSummary(text);
  const suggestions = await generateSuggestions(text);
  return { summary, suggestions };
};

module.exports = { summarizeTextAndSuggestions, generateSummary, generateSuggestions };
