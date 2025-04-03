import dotenv from 'dotenv';

dotenv.config();


const config = {

    port: process.env.PORT || '9999',
    secret: process.env.SECRET || 'zaqwer',
    adminEmail: process.env.EMAILADMIN || 'admin@admin.com',
    adminPass: process.env.PASSADMIN || 'Admin123!',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

export default config;