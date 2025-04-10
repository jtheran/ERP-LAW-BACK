import logger from '../logs/logger.js';
import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient();

export const getUsers = async (req, res) => {
    try{

        const users = await prisma.user.findMany();

        if(!users){
            logger.warn('[PRISMA] USERS NOT FOUND!!!!');
            return res.status(400).json({msg: 'USERS NOT FOUND'});
        }

        logger.info('[PRISMA] USUARIOS ENCONTRADOS CORRECTMAENTE!!!')
        return res.status(200).json({msg: 'USUARIOS ENCONTRADOS CORRECTMAENTE!!!', count: users.lentgh(), users});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const getUserByID = async (req, res) => {
    try{

        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        });

        if(!user){
            logger.warn('[PRISMA] USER NOT FOUND!!!!');
            return res.status(400).json({msg: 'USER NOT FOUND'});
        }

        logger.info('[PRISMA] USUARIO ENCONTRADO CORRECTMAENTE!!!')
        return res.status(200).json({msg: 'USUARIO ENCONTRADO CORRECTMAENTE!!!', user});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const updateUser = async (req, res) => {
    try{

        const userUpdate = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        if(!userUpdate){
            logger.warn('[PRISMA] USUARIO NO ACTUALIZADO');
            return res.status(400).json({msg: 'USUARIO NO ACTUALIZADO'});
        }

        logger.info('[PRISMA] USUARIO ACTUALIZADO CORRECTMAENTE!!!')
        return res.status(200).json({msg: 'USUARIO ACTUALIZADO CORRECTMAENTE!!!', userUpdate});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const deleteUser = async (req, res) => {
    try{
 
        const userDelete = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
  
        if(!userDelete){
            logger.warn('[PRISMA] USUARIO NO ELIMINADO');
            return res.status(400).json({msg: 'USUARIO NO ELIMINADO'});
        }

        logger.info('[PRISMA] USUARIO ELIMINADO CORRECTMAENTE!!!')
        return res.status(200).json({msg: 'USUARIO ELIMINADO CORRECTMAENTE!!!', userDelete});

    }catch(err){
        logger.error('[SERVER] ERROR INTERNO DEL SERVIDOR'+err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

