import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { requireActiveSub } from '../middlewares/subscriptionGuard.js';
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../controllers/event.controller.js';


const router = express.Router();

router.post('/event', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, createEvent);

router.get('/event', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getEvents);

router.get('/event/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getEventByIdByID);

router.put('/event/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, updateEvent);

router.delete('/event/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, deleteEvent);


export default router;