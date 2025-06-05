import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import logger from '../logs/logger';
import { sendEmail } from '../services/nodemailer.js';
import { sendMessage } from '../services/wsp.js';


const prisma = new PrismaClient();

// Corre cada día a las 7:00 AM
cron.schedule('0 7 * * *', async () => {
    logger.info('[NOTIFY] Verificando Notificaciones....');

    const nowDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(nowDate.getDate()+1);

    const events = await prisma.judicialEvent.findMany({
        where: {
          date: {
            gte: nowDate,
            lte: tomorrow
          }
        },
        include: {
          createdBy: true
        }
      });

    if(!events){
      logger.warn('NO AHY EVENTOS PARA NOTIFICAR!!!') 
    }  

    for (const event of events) {
        const user = event.createdBy;

        if(user.role == 'LAWYER'){

            const msg = `📅 *Upcoming Court Event*\n\n*Event:* ${event.name}\n*Court:* ${event.court}\n*Case:* ${event.caseRef}\n*Date:* ${event.date.toLocaleString()}`;

            if(user.phone){
                const chatId = `${user.phone}@c.us`;
                await sendMessage(chatId, msg);
            }

            if(user.email){
                await sendEmail(user.email, 'Upcoming Judicial Event', msg);
            } 

        }
    }
      


});
