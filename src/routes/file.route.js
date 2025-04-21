import express from 'express';
import upload from '../lib/multer.js';
import passport from "passport";
import { uploadFile, downloadFile, deleteFile,getFiles } from '../controllers/file.controller.js';
import authorizeRoles from '../middlewares/auth.js';

const router = express.Router();

router.post('/file', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), upload.single('file'), uploadFile);
router.get('/file/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), downloadFile);
router.delete('/file/:id', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), deleteFile);
router.get('/file', passport.authenticate('jwt', { session: false}), authorizeRoles(['ADMIN', 'USER']), getFiles);

export default router;
