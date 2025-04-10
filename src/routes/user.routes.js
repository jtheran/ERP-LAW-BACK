import express from "express";
import passport from "passport";
import authorizeRoles from '../middlewares/auth.js';
import { deleteUser, updateUser, getUserByID, getUsers } from '../controllers/user.controller.js';


const router = express.Router();

router.delete('/user:id', passport.authenticate('jwt', { session: false}), authorizeRoles('ADMIN'), deleteUser);

router.put('/user:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), updateUser);

router.get('/user:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getUserByID);

router.get('/user', passport.authenticate('jwt', { session: false}), authorizeRoles('ADMIN'), getUsers);


export default router;