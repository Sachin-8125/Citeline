import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isAllowedOrigin } from './src/config/env.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';
import { authRouter } from './src/routes/authRoutes.js';
import { documentRouter } from './src/routes/documentRoutes.js';

const app = express();

app.set('trust proxy', 1);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
});

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

const skipPreflight = (req) => req.method === 'OPTIONS';

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipPreflight,
  message: {
    message: 'Too many requests. Please try again later.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipPreflight,
  message: {
    message: 'Too many authentication attempts. Try again later.',
  },
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    ok: true,
    environment: env.nodeEnv,
  });
});

app.use('/api/auth', generalLimiter, authLimiter, authRouter);
app.use('/api/documents', generalLimiter, documentRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };