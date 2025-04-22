// src/controllers/judicialEvent.controller.js
import logger from '../logs/logger.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEvents = async (req, res) => {
    try {
        const events = await prisma.judicialEvent.findMany({
        where: { createdById: req.user.id },
        include: { case: true },
        orderBy: { date: 'asc' }
        });

        if (!events){
        logger.warn('[PRISMA] NO EVENTS FOUND');
        return res.status(404).json({ msg: 'NO EVENTS FOUND' });
        }

        logger.info('[PRISMA] EVENTS FOUND');
        return res.status(200).json({ msg: 'Events found', count: events.length, event: events });
    }catch(err){
        logger.error('[SERVER] INTERNAL ERROR: ' + err.message);
        return res.status(500).json({ msg: 'INTERNAL SERVER ERROR'});
    }
};

export const createEvent = async (req, res) => {
  try {
    const { name, court, caseId, date } = req.body;

    const event = await prisma.judicialEvent.create({
      data: {
        name,
        court,
        caseId,
        date: new Date(date),
        createdById: req.user.id
      }
    });

    if(!event){
        logger.warn('[PRISMA] NO EVENT CREATED');
        return res.status(400).json({ msg: 'NO EVENT CREATED', event });
    }

    logger.info('[PRISMA] EVENT CREATED');
    return res.status(201).json({ msg: 'EVENT CREATED', event });
  } catch (err) {
    logger.error('[SERVER] INTERNAL ERROR: ' + err.message);
    return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
  }
};

export const updateEvent = async (req, res) => {
  try{

    const updatedEvent = await prisma.judicialEvent.update({
      where: { id, createdById: req.user.id },
      data: {
        ...req.body,
      }
    });

    if (!updatedEvent) {
        logger.warn('[PRISMA] EVENT NOT UPDATED');
        return res.status(400).json({ msg: 'EVENT NOT UPDATED'});
      }

    logger.info('[PRISMA] EVENT UPDATED');
    return res.status(200).json({ msg: 'EVENT UPDATED', event: updatedEvent });
  } catch (err) {
    logger.error('[SERVER] INTERNAL ERROR: ' + err.message);
    return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await prisma.judicialEvent.delete({ where: { id, createdById: req.user.id } });

    if (!deletedEvent) {
        logger.warn('[PRISMA] EVENT NOT DELETED');
        return res.status(400).json({ msg: 'EVENT NOT DELETED'});
      }

    logger.info('[PRISMA] EVENT DELETED');
    return res.status(200).json({ msg: 'EVENT DELETED', event: deletedEvent });
  } catch (err) {
    logger.error('[SERVER] INTERNAL ERROR: ' + err.message);
    return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
  }
};

export const getEventById = async (req, res) => {
    try {
      const { id } = req.params;
      const event = await prisma.judicialEvent.findUnique({ where: { id, createdById: req.user.id } });
  
      if (!event) {
          logger.warn('[PRISMA] EVENT NOT FOUND');
          return res.status(404).json({ msg: 'EVENT NOT FOUND'});
        }
  
      logger.info('[PRISMA] EVENT FOUND');
      return res.status(200).json({ msg: 'EVENT FOUND', event });
    } catch (err) {
      logger.error('[SERVER] INTERNAL ERROR: ' + err.message);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  };
