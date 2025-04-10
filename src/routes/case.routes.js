import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { createCase, deleteCase, getCaseById, getCases, updateCase} from '../controllers/case.controller.js';


const router = express.Router();

router.delete('/case:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), deleteCase);

router.get('/case:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getCaseById);

router.put('/case:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), updateCase);

router.get('/case', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getCases);

router.post('/case', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), createCase);

export default router;