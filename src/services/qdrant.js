import axios from 'axios';
import config from '../config/config.js';
import logger from '../logs/logger.js';


export const createCollection = async () => {
    try{
        
        await axios.put(`${config.qdrantUrl}/collections/${config.qdrantCollection}`, 
            { 
                vector: {
                    size: 1536,
                    distante: 'Cosine'
                }
        }); 
        
        logger.info('[QDRANT] COLLECTION CREEATED OR THIS EXISTS');
    }catch(err){
        
        logger.error('[QDRANT] ERROR CREATED COLLECTION');
    }
}


export const insertEmbedding = async (id, vector, payload) => {
    try{

        await axios.put(`${config.qdrantUrl}/collections/${config.qdrantCollection}/points`, {
            points: [
                {
                    id,
                    vector,
                    payload // datos extra: título, nombre del caso, etc.
                }
            ]
        });

        logger.info('[QDRANT] LOAD EMBEDDINGS');
    }catch(err){

        logger.error('[QDRANT] ERROR LOAD EMBEDDINGS');
    }  

};

export const searchSimilar = async (vector, topK = 5) => {

    try{

        const response = await axios.post(`${config.qdrantUrl}/collections/${config.qdrantCollection}/points/search`, {
        vector,
        top: topK
        });

        logger.info('[QDRANT] SEARCH EMBEDDINGS');
        return response.data.result;

    }catch(err){

        logger.error('[QDRANT] ERROR SEARCH EMBEDDINGS');
    }
  };
