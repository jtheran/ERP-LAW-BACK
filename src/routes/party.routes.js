import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { createParty, deleteParty, getParties, updateParty, getPartyByID } from '../controllers/party.controller.js';


const router = express.Router();

router.get('/party', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getParties);

router.get('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getPartyByID);

router.post('/party', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), createParty);

router.put('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), updateParty);

router.delete('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), deleteParty);


export default router;