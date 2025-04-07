import OpenAI from 'openai';
import config from '../logs/logger.js';
import logger from '../logs/logger.js';

export const openai = new OpenAI({
  apiKey: config.keyGPT,
});

export const generateEmbedding = async (text) => {
    const res = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });
    return res.data[0].embedding;
};