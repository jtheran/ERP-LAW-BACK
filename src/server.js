import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import passportJWT from './middlewares/passport.js';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { corsOptions } from './utils/cors.js';
import { maintenanceMiddleware } from "./middlewares/maintenance.js";
import maintenaceRoutes from './routes/maintenance.route.js';
import fileRoutes from './routes/file.route.js';
import caseRoutes from './routes/case.routes.js';
import userRoutes from './routes/user.routes.js';
import wspRoutes from './routes/wsp.routes.js';


const app = express();

//Middlewares
app.use(express.json());
app.use(maintenanceMiddleware);
app.use(morgan('morgan'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(passport.initialize());
passport.use(passportJWT);


//Routes
app.use('/api', maintenaceRoutes);
app.use('/api', fileRoutes);
app.use('/api', caseRoutes);
app.use('/api', userRoutes);
app.use('/api', wspRoutes);



export default app;







