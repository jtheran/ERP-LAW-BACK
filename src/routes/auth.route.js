import { Router } from 'express';
import passport from 'passport';
import csurf from 'csurf';
import loginLimiter from '../lib/ratelimiter.js';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginLimiter, login);

router.get('/logout', passport.authenticate('jwt', { session: false}), logout);

router.post('/register', loginLimiter, register);

router.get('/auth-csrf', loginLimiter, passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({ csrf: req.csrfToken() })
});

export default router;