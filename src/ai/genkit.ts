import {genkit, GenkitError} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

let keyIndex = 1;
const apiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

if (apiKeys.length === 0) {
  throw new GenkitError({
    source: 'genkit-init',
    message: 'No API keys found. Please set GEMINI_API_KEY_1, etc. in your .env file.',
  });
}

function getApiKey() {
  const key = apiKeys[keyIndex - 1];
  keyIndex = (keyIndex % apiKeys.length) + 1;
  return key;
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: getApiKey,
  })],
  model: 'googleai/gemini-2.5-flash',
});
