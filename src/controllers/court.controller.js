import logger from '../logs/logger.js';
import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient();



export const getCourts = async (req, res) => {
    try{

        const courts = await prisma.court.findMany();

        if(!courts){
            logger.warn('[PRISMA] COURTS NOT FOUND!!!!');
            return res.status(400).json({msg: 'COURTS NOT FOUND!!!'});
        }

        logger.info('[PRISMA] COURTS FOUND');
        return res.status(200).json({msg: 'COURTS FOUND', count: courts.lenght(), court: courts});
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const createCourt = async (req, res) => {
    const court = await prisma.court.create({ data: req.body });
    res.status(201).json(court);
};

export const updateCourt = async (req, res) => {
    try{
        const updateCourt = await prisma.court.update({ 
            where: { 
                id: req.params.id 
            }, 
            data: req.body 
        });
        
        if(!updateCourt){
            logger.warn('[PRISMA] COURT NOT UPDATED');
            return res.status(400).json({msg: 'COURT NOT UPDATED'});
        }

        logger.info('COURT UPDATED');
        return res.status(200).json({msg: 'COURT UPDATED', court: updateCourt})
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const getCourtByID = async (req, res) => {
    try{
        const court = await prisma.court.findUnique({ 
            where: { 
                id: req.params.id 
            }, 
        });
        
        if(!court){
            logger.warn('[PRISMA] COURT NOT FOUND');
            return res.status(400).json({msg: 'COURT NOT FOUND'});
        }

        logger.info('COURT FOUND');
        return res.status(200).json({msg: 'COURT FOUND', court})
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const deleteCourt = async (req, res) => {
    try{
        const deleteCourt = await prisma.court.delete({ 
            where: { 
                id: req.params.id 
            } 
        });

        if(!deleteCourt){
            logger.warn('[PRISMA] COURT NOT DELETED');
            return res.status(400).json({msg: 'COURT NOT DELETED'});
        }

        logger.info('[PRISMA] COURT DELETED')
        return res.status(200).json({ msg: 'COURT DELETED', court: deleteCourt });
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
