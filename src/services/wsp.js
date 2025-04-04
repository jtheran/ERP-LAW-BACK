import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode';
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import path from 'path';
import logger from '../logs/logger.js';
import config from '../config/config.js';

const MONGO_URI = config.urlDB;
await mongoose.connect(MONGO_URI);

const storeMongo = new MongoStore({ mongoose: mongoose });
const { Client, RemoteAuth } = pkg;


export const client = new Client({
  authStrategy: new RemoteAuth({ 
    store: storeMongo,
    backupSyncIntervalMs: 300000
}),
  puppeteer: { headless: true },
    
});

client.on('qr', async (qr) => {
  logger.info('[QR] Generando imagen del QR...');
  const qrPath = path.join('public', 'qr.png');
  await qrcode.toFile(qrPath, qr);
  logger.info(`[QR] Imagen generada en ${qrPath}`);
});

client.on('ready', () => {
    logger.info('[WHATSAPP] session started.....');
    console.log('✅ SESSION STARTED')
});

client.on('auth_failure', (msg) => {
  logger.error(`[WHATSAAP] AUTENTICACÓN FALLIDA: ${msg}`); 
});


export const sendMessage = async (number, message) => {
  const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
  await client.sendMessage(chatId, message);
};
