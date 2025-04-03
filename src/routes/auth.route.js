import { Router } from 'express';
import passport from 'passport';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);

router.get('/logout', passport.authenticate('jwt', { session: false}), logout);

router.post('/register', register);

export default router;