import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,  
    credentials: true,       
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100,                  
  standardHeaders: true,      
  legacyHeaders: false,       
  message: { 
    message: 'Too many requests. Please try again later.' 
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  limit: 20,                   
  standardHeaders: true,
  legacyHeaders: false,
  message: { 
    message: 'Too many authentication attempts. Try again later.' 
  },
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    ok: true,
    environment: env.nodeEnv,
  });
});

app.use('/api/auth', generalLimiter, authLimiter, authRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };