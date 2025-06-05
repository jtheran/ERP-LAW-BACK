import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { requireActiveSub } from '../middlewares/subscriptionGuard.js';
import { createParty, deleteParty, getParties, updateParty, getPartyByID } from '../controllers/party.controller.js';


const router = express.Router();

router.get('/party', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getParties);

router.get('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getPartyByID);

router.post('/party', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, createParty);

router.put('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, updateParty);

router.delete('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, deleteParty);


export default router;