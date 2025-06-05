import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { requireActiveSub } from '../middlewares/subscriptionGuard.js';
import { createCourt, deleteCourt, getCourtByID, getCourts, updateCourt } from '../controllers/court.controller.js';

const router = express.Router();

router.post('/court', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, createCourt);

router.get('/court', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getCourts);

router.get('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getCourtByID);

router.put('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, updateCourt);

router.delete('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, deleteCourt);


export default router;