import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import passportJWT from './middlewares/passport.js';
import { maintenanceMiddleware } from "./middlewares/maintenance.js";
import maintenaceRoutes from './routes/maintenance.route.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(maintenanceMiddleware);
app.use(morgan('morgan'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
passport.use(passportJWT);


//Routes
app.use('/', maintenaceRoutes)




export default app;







