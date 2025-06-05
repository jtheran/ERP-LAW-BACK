import logger from '../logs/logger.js';

export const requireActiveSub = async (req, res, next) => {

    if (req.user.role === 'ADMIN'){
        logger.info('[PAY] ADMIN');
        return next();
    }

    const sub = await prisma.subscription.findFirst({
        where: {
            userId: req.user.id,
            status: 'ACTIVE',
            currentPeriodEnd: { gte: new Date() }
        }
    });
    
    if (!sub){
        logger.warn('[PAY] SUSCRIPCION INACTIVA!!!');
        return res.status(402).json({ msg: 'Suscripción inactiva' });
    }
    
    logger.warn('[PAY] SUSCRIPCION ACTIVA!!!');
    next();
  };