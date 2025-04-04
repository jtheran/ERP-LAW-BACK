import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../logs/logger.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: config.adminEmail, 
            pass: config.adminEmailPass 
        }
});

export const sendEmail = async (to, subject, html, text=null) => {
    try{

        await transporter.sendMail(
            { 
                from: config.adminEmail, 
                to,
                subject,
                text,
                html 
            });

        logger.info('CORREO ENVIADO A: '+to);
    }catch(err){
        logger.error('ERROR AL ENVIAR CORREO: '+err);
    }
    
};
