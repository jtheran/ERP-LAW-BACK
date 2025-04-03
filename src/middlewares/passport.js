import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { PrismaClient } from '@prisma/client'; // Asegúrate de importar tu instancia de Prisma
import config from '../config/config.js';

const prisma = new PrismaClient();

const options = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
};

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
        try{
            const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id }
            });
    
            if (user) return done(null, user);
            return done(null, false);
      }catch(err){

            return done(err, false);
      }
    })

  
export default jwtStrategy;