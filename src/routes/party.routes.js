import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { createParty, deleteParty, getParties, updateParty, getPartyByID } from '../controllers/party.controller.js';


const router = express.Router();

router.get('/party', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getParties);

router.get('/party/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getPartyByID)

export default router;