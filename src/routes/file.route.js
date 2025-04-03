import express from 'express';
import upload from '../lib/multer.js';
import passport from "passport";
import { uploadFile, downloadFile, deleteFile } from '../controllers/file.controller.js';
import authorizeRoles from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload', passport.authenticate('jwt', { session: false}), authorizeRoles('ADMIN', 'USER'), upload.single('file'), uploadFile);
router.get('/download/:id', passport.authenticate('jwt', { session: false}), authorizeRoles('ADMIN', 'USER'), downloadFile);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false}), authorizeRoles('ADMIN'), deleteFile);

export default router;
