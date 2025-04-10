import { Logger } from 'winston';
import logger from '../logs/logger.js';
import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient();

export const getCases = async (req, res) => {
    try{
        const cases = await prisma.case.findMany({ 
            include: { 
                plaintiff: true, defendant: true, court: true, events: true 
            } 
        });

        if(!cases){
            logger.warn('[PRISMA] CASES NOT FOUND!!!!');
            return res.status(400).json({msg: 'CASES NOT FOUND!!!'});
        }

        logger.info('[PRISMA] CASOS ENCONTRADOS CORRECTMAENTE!!!');
        return res.status(200).json({msg: 'CASOS ENCONTRADOS CORRECTMAENTE!!!', count: cases.lentgh(), cases});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
  
export const getCaseById = async (req, res) => {
    try{
        const caseID = await prisma.case.findUnique({
            where: { 
                id: req.params.id 
            },
            include: { 
                plaintiff: true, defendant: true, court: true, events: true 
            }
        });

        if (!caseID){
            logger.warn('[PRISMA] CASE NOT FOUND');
            return res.status(404).json({ msg: 'CASE NOT FOUND' });
        }

        logger.info('[PRISMA] CASE FOUND');
        return res.status(200).json({msg: 'CASE FOUND', case: caseID});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
  
export const createCase = async (req, res) => {
    try{

        const { title, description, startDate, endDate, plaintiffId, defendantId, courtId } = req.body;
        const newCase = await prisma.case.create({
            data: { 
                title, description, status: 'OPEN', startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, userId: req.user.id, plaintiffId, defendantId, courtId 
            }
        });

        if (!newCase){
            logger.warn('[PRISMA] CASE NOT CREATED');
            return res.status(400).json({ msg: 'CASE NOT CREATED' });
        }

        logger.info('[PRISMA] CASE CREATED');
        return res.status(200).json({msg: 'CASE CREATED', case: newCase});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
  
export const updateCase = async (req, res) => {
    try{
        const { title, description, status, startDate, endDate, plaintiffId, defendantId, courtId } = req.body;
        const updateCase = await prisma.case.update({
            where: { id: req.params.id },
            data: { 
                title, description, status, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, userId: req.user.id, plaintiffId, defendantId, courtId 
            }
        });

        if (!updateCase){
            logger.warn('[PRISMA] CASE NOT UPDATED');
            return res.status(400).json({ msg: 'CASE NOT UPDATED' });
        }
        
        logger.info('[PRISMA] CASE UPDATED');
        return res.status(200).json({msg: 'CASE UPDATED', case: updateCase});
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};
  
export const deleteCase = async (req, res) => {
    try{
        const deleteCase = await prisma.case.delete({ 
            where: { id: req.params.id }
        });

        if (!deleteCase){
            logger.warn('[PRISMA] CASE NOT DELETED');
            return res.status(400).json({ msg: 'CASE NOT DELETED' });
        }

        logger.info('[PRISMA] CASE DELETED');
        return res.status(200).json({msg: 'CASE DELETED', case: deleteCase});
    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
    
};
  