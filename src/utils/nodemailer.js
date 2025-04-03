import nodemailer from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'tuemail@gmail.com', 
            pass: 'tucontraseña' 
        }
});

export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail(
        { 
            from: 'tuemail@gmail.com', 
            to,
            subject,
            text 
        });
};
