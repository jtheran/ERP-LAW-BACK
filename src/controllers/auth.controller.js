import logger from '../logs/logger.js';
import jwt from '../lib/jwt.js';
import config from '../config/config.js';
import { PrismaClient } from '@prisma/client';
import { encryptPass, matchPass } from '../lib/hash.js';

const prisma = new PrismaClient();


export const login = async (req, res) => {
    try{

        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            logger.info('El correo no existe')
            return res.status(401).json({ msg: 'Correo o contraseña incorrectos' });
        }

        const ismatch = matchPass(user.password, password);
        if (!ismatch) {
            logger.info('Contraseña incorrecta')
            return res.status(401).json({ msg: 'Correo o contraseña incorrectos' });
        }
        
        const token = jwt(user);

        logger.info('LOGUEADO CORRECTAMENTE!!!');
        return res.status(200).json({msg: 'LOGUEADO CORRECTAMENTE', access_token: token, iv: config.key});
    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const logout = (req, res) => {
    try{
        res.header('Autorization', '').status(200).json({msg: 'HA SIDO DESLOGUEADO!!!'});
        logger.info('Usuario deslogueado');

    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};

export const register = async (req, res) => {
    try{
        
        const { name, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            logger.info('El correo ya está registrado')
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        const hashedPassword = await encryptPass(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role }
        });

        if(!user){
            logger.info('Error al crear el usuario')
            return res.status(400).json({ msg: 'Error al crear el usuario' });
        }

        

        logger.info(`Usuario registrado: ${email}`);
        return res.status(201).json({ msg: 'Usuario registrado exitosamente'});

    }catch(err){
        logger.error('ERROR INTERNO DEL SERVIDOR: ' + err.message);
        return res.status(500).json({msg: 'ERROR INTERNO DEL SERVIDOR'});
    }
};


