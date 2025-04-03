import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import passportJWT from './middlewares/passport.js';
import xssClean from 'xss-clean';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { maintenanceMiddleware } from "./middlewares/maintenance.js";
import maintenaceRoutes from './routes/maintenance.route.js';
import fileRoutes from './routes/file.route.js';
import { corsOptions } from './utils/cors.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(maintenanceMiddleware);
app.use(morgan('morgan'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(xssClean());
app.use(csurf({ cookie: true }));
app.use(passport.initialize());
passport.use(passportJWT);


//Routes
app.use('/api', maintenaceRoutes);
app.use('/api', fileRoutes);




export default app;







