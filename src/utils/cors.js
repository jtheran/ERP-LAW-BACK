export const corsOptions = {
    origin: ['*'], // Dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};