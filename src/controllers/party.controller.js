import logger from '../logs/logger.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getParties = async (req, res) => {
    try{
        const parties = await prisma.party.findMany();

        if (!parties) {
            logger.error('[PRISMA] PARTIES NOT FOUND')
            return res.status(400).json({ msg: 'PARTIES NOT FOUND' });
        }

        logger.info('[PRISMA] PARTIES FOUND!!!');
        return res.status(200).json({msg: 'PARTIES FOUND!!!', party: parties});

    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const createParty = async (req, res) => {
    try{
        const party = await prisma.party.create({ 
            data: req.body 
        });

        if(!party){
            logger.info('[PRISMA] PARTY NOT CREATED');
            return res.status(400).json({ msg: 'PARTY NOT CREATED' });
        }
        logger.info('[PRISMA] PARTY CREATED!!!');
        return res.status(201).json({msg: 'PARTY CREATED', party});
    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
  
export const updateParty = async (req, res) => {
    try{
        const updateParty = await prisma.party.update({ 
            where: { 
                id: req.params.id 
            }, 
            data: req.body 
        });

        if(!updateParty){
            logger.info('[PRISMA] PARTY NOT UPDATED');
            return res.status(400).json({ msg: 'PARTY NOT UPDATED' });
        }

        logger.info('[PRISMA] PARTY UPDATED');
        return res.status(200).json({ msg: 'PARTY UPDATED', party: updateParty});
    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const getPartyByID = async (req, res) => {
    const partyID = await prisma.party.findUnique({ 
        where: { 
            id: req.params.id 
        } 
    });
    
};
  
export const deleteParty = async (req, res) => {
    await prisma.party.delete({ where: { id: req.params.id } });
    res.json({ msg: 'Party deleted' });
};