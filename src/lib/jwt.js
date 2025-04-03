import jwt from 'jsonwebtoken';
import config from '../config/config';

const createToken = (payload) => {

    const token = jwt.sign(payload, config.secret,{
        expiresIn: config.expiresIn,
    });
    if(!token){
        logger.error('TOKEN NO FUE CREADO!!!');
        return null;
    }
    logger.info('TOKEN CREADO!!!');
    return token;
}

export default createToken;