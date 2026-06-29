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

  CLIENT_URL: z.string().url().default('http://localhost:5173'),

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

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  mongoUri: parsed.data.MONGODB_URI,
  accessSecret: parsed.data.JWT_ACCESS_SECRET,
  refreshSecret: parsed.data.JWT_REFRESH_SECRET,
  accessTokenTtl: parsed.data.ACCESS_TOKEN_TTL,
  refreshTokenTtlDays: parsed.data.REFRESH_TOKEN_TTL_DAYS,
  clientUrl: parsed.data.CLIENT_URL,
  geminiApiKey: parsed.data.GEMINI_API_KEY, 
  maxFileSizeMb: parsed.data.MAX_FILE_SIZE_MB,
  uploadDir: parsed.data.UPLOAD_DIR,
};

export const isProduction = env.nodeEnv === 'production';