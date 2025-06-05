import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import logger from '../logs/logger';
import { sendEmail } from '../services/nodemailer.js';
import { sendMessage } from '../services/wsp.js';


const prisma = new PrismaClient();

// Corre cada día a las 8:00 AM
cron.schedule('0 8 * * *', async () => {
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
<<<<<<< HEAD
      logger.warn('NO AHY EVENTOS PARA NOTIFICAR!!!') 
=======
       logger.warn('NO HAY EVENTOS PARA NOTIFICAR!!!') 
>>>>>>> b604fc28b04f206f0ba181819e8007a3a729cee9
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

cron.schedule('0 8 */7 * *', async () => {
    const today = new Date();
    const soon = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  
    const expiring = await prisma.subscription.findMany({
      where: {
        status: 'ACTIVE',
        currentPeriodEnd: { lte: soon, gte: today }
      },
      include: { user: true, plan: true }
    });
  
    for (const sub of expiring) {

        const msg = `⚠️ *Subscription Expiring Soon*\n
        *Plan:* ${sub.plan.name}\n
        *User:* ${sub.user.name}\n
        *Expires:* ${sub.currentPeriodEnd.toLocaleString()}\n\n
        _To avoid interruptions, please renew before the expiration date._`;

        if(sub.user.phone){
            const chatId = `${sub.user.phone}@c.us`;
            await sendMessage(chatId, msg);
        } 

        await sendEmail(sub.user.email, '⚠️ *Subscription Expiring Soon*\n', msg);

    }
  });


