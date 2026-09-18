import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

  JWT_ACCESS_SECRET: z.string().min(32, 'ACCESS_SECRET must be at least 32 chars'),
  JWT_REFRESH_SECRET: z.string().min(32, 'REFRESH_SECRET must be at least 32 chars'),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(7),

  CLIENT_URL: z.string().min(1).default('http://localhost:5173'),

  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),

  MAX_FILE_SIZE_MB: z.coerce.number().default(20),
  UPLOAD_DIR: z.string().default('uploads'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  parsed.error.errors.forEach((err) => {
    console.error(`  ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

function normalizeOrigin(value) {
  return value
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\/+$/, '');
}

const clientOrigins = parsed.data.CLIENT_URL.split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

const invalidOrigin = clientOrigins.find((origin) => {
  try {
    new URL(origin);
    return false;
  } catch {
    return true;
  }
});

if (invalidOrigin) {
  console.error(`❌ Invalid CLIENT_URL origin: ${invalidOrigin}`);
  process.exit(1);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  mongoUri: parsed.data.MONGODB_URI,
  accessSecret: parsed.data.JWT_ACCESS_SECRET,
  refreshSecret: parsed.data.JWT_REFRESH_SECRET,
  accessTokenTtl: parsed.data.ACCESS_TOKEN_TTL,
  refreshTokenTtlDays: parsed.data.REFRESH_TOKEN_TTL_DAYS,
  clientUrl: clientOrigins[0],
  clientOrigins,
  geminiApiKey: parsed.data.GEMINI_API_KEY,
  maxFileSizeMb: parsed.data.MAX_FILE_SIZE_MB,
  uploadDir: parsed.data.UPLOAD_DIR,
};

export const isProduction = env.nodeEnv === 'production';

export function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const normalized = normalizeOrigin(origin);
  if (env.clientOrigins.includes(normalized)) {
    return true;
  }

  try {
    const url = new URL(normalized);
    const { hostname } = url;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return true;
    }

    return url.protocol === 'https:' && hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}