import dotenv from 'dotenv';

dotenv.config();


const config = {

    port: process.env.PORT || '9999',
    secret: process.env.SECRET || 'zaqwer',
    adminEmail: process.env.EMAILADMIN || 'admin@admin.com',
    adminPass: process.env.PASSADMIN || 'Admin123!',
    adminEmailPass: process.env.PASSEMAILADMIN || 'Testing24@',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    iv: process.env.IV || 16,
    key: process.env.KEY_ENCRYPT || 'vf35fdb165df4bn4dr8',
    algoritm: process.env.ALGORITM || 'aes-256-cbc',
    adminPhone: process.env.ADMINPHONE || '+573001234567',
    urlDB: process.env.DATABASE_URL || 'mongodb://localhost:27017/LAWDB?replicaSet=rs0',
    qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
    qdrantCollection: process.env.QDRANT_COLLECTION_NAME || 'docsLAW',
    keyGPT: process.env.OPENAI_API_KEY || '',
};

export default config;