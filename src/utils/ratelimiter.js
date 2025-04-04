import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 3, // Máximo de intentos de login por IP
    message: 'Demasiados intentos de inicio de sesión. Inténtalo más tarde.',
    headers: true
});

export default loginLimiter;
