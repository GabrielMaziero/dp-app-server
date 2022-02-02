import express from 'express';
import router from './routes';
import passport from 'passport';
import { PassportAuth } from './config/passport-auth';

const app = express();
const passportAuth = new PassportAuth()

passport.use(passportAuth.googleStrategy())
app.use(passport.initialize())
app.use(express.json());
app.use('/api/', router);

export default app;