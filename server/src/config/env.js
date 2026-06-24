import dotenv from "dotenv";

dotenv.config();

const requiredKeys = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'CLIENT_URL'];

for(const key of requiredKeys){
  if(!process.env[key]){
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL,
  mongodbUri: process.env.MONGODB_URI,
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
  refreshTokenTtlDays: process.env.REFRESH_TOKEN_TTL_DAYS || 7,
};

export const isProduction = env.nodeEnv === 'production';