import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { createCourt, deleteCourt, getCourtByID, getCourts, updateCourt } from '../controllers/court.controller.js';

const router = express.Router();

router.post('/court', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), createCourt);

router.get('/court', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getCourts);

router.get('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getCourtByID);

router.put('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), updateCourt);

router.delete('/court/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), deleteCourt);


export default router;