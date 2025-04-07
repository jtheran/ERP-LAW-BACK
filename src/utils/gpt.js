import OpenAI from 'openai';
import config from '../logs/logger.js';
import logger from '../logs/logger.js';

export const openai = new OpenAI({
  apiKey: config.keyGPT,
});

export const generateEmbedding = async (text) => {
    try{

    const res = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });

    logger.info('[GPT] EMBEBIDO GENERADO');
    return res.data[0].embedding;

  }catch(err){}

    logger.info('[GPT] ERROR EMBEBIDO NO GENERADO: '+err.message);
    res.json({msg: 'EMBEBIDO NO GENERADO: '});
};

export const askGPT = async (msg) => {

  try{

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente legal para abogados en Colombia. Responde de forma clara, útil y profesional.',
        },
        {
          role: 'user',
          content: msg,
        },
      ],
      temperature: 0.5,
    });

    logger.info('[GPT] RESPUESTA GENERADA....');
    return completion.choices[0].message.content;

  }catch(err){

    logger.info('[GPT] ERROR AL GENERAR LA RESPUESTA: '+err.message);
    res.json({msg: 'RESPUESTA NO GENERADA CORRECTAMENTE'});

  }

};