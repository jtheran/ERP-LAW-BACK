import { PrismaClient } from '@prisma/client';
import fs from 'fs-extra';
import logger from '../logs/logger.js';

const prisma = new PrismaClient();

// 📌 Subir archivo físicamente y guardar en la DB

export const getFiles = async (req, res) => {
    try{
        const docs = await prisma.document.findMany({ 
            include: { 
                case: true, 
                user: true 
            } 
        });

        if(!docs){
            logger.error('[PRISMA] DOCS NOT FOUND!!!!');
            return res.status(400).json({msg: 'DOCS NOT FOUND'});
        }
        res.json(docs);
        logger.info('[PRISMA] DOCS FOUND!!!');
        return res.status(201).json({ msg: 'DOCS FOUND', file: docs });
    } catch (err) {
        logger.error(`Error al subir archivo: ${err.message}`);
        return res.status(500).json({ msg: 'Error al guardar el archivo' });
    }
  };


export const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: 'No se subió ningún archivo' });

        const { name, type, url } = req.file;

        const file = await prisma.document.create({
            data: { name, type, url }
        });

        logger.info(`Archivo ${name} subido con éxito. ID: ${file.id}`);
        return res.status(201).json({ msg: 'Archivo guardado', file });
    } catch (err) {
        logger.error(`Error al subir archivo: ${err.message}`);
        return res.status(500).json({ msg: 'Error al guardar el archivo' });
    }
};

// 📌 Descargar archivo
export const downloadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await prisma.document.findUnique({ where: { id } });

        if (!file) return res.status(404).json({ msg: 'Archivo no encontrado' });

        logger.info('DOWNLOAD FILE SUCCESS');
        res.setHeader('Content-Type', file.type);
        return res.status(200).json({msg: 'DOWNLOAD FILE SUCCESS!!'}).download(file.url, file.name);
    } catch (err) {
        logger.error(`Error al descargar archivo: ${err.message}`);
        return res.status(500).json({ msg: 'Error al descargar el archivo' });
    }
};

// 📌 Eliminar archivo
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await prisma.document.findUnique({ where: { id } });

        if (!file) return res.status(404).json({ msg: 'Archivo no encontrado' });

        await fs.remove(file.url); // Elimina el archivo físicamente
        await prisma.file.delete({ where: { id } });

        logger.info('Archivo eliminado')
        return res.status(200).json({ msg: 'Archivo eliminado' });
    } catch (err) {
        logger.error(`Error al eliminar archivo: ${err.message}`);
        return res.status(500).json({ msg: 'Error al eliminar el archivo' });
    }
};
