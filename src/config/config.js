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
};

export default config;