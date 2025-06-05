import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { requireActiveSub } from '../middlewares/subscriptionGuard.js';
import { createCase, deleteCase, getCaseById, getCases, updateCase} from '../controllers/case.controller.js';


const router = express.Router();

router.delete('/case/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, deleteCase);

router.get('/case/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getCaseById);

router.put('/case/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, updateCase);

router.get('/case', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, getCases);

router.post('/case', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), requireActiveSub, createCase);

export default router;