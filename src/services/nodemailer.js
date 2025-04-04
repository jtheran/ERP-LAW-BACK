import nodemailer from 'nodemailer';
import config from '../config/config.js';
import logger from '../logs/logger.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: config.adminEmail, 
            pass: config.adminEmailPass 
        }
});

export const sendEmail = async (to, subject, text) => {
    try{

        await transporter.sendMail(
            { 
                from: 'ERPLAW: '+config.adminEmail, 
                to,
                subject,
                text, 
            });

        logger.info('CORREO ENVIADO A: '+to);
    }catch(err){
        logger.error('ERROR AL ENVIAR CORREO: '+err);
    }
    
};
