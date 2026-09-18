import { env } from '../config/env.js';

export const REFRESH_COOKIE_NAME = 'refreshToken';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const usesCrossSiteCookies =
  process.env.RENDER === 'true' ||
  env.nodeEnv === 'production' ||
  env.clientOrigins.some((origin) => {
    try {
      const hostname = new URL(origin).hostname;
      return hostname !== 'localhost' && hostname !== '127.0.0.1';
    } catch {
      return false;
    }
  });

const cookieSameSite = usesCrossSiteCookies ? 'none' : 'lax';

export const refreshCookieOptions = {
  httpOnly: true,
  secure: usesCrossSiteCookies,
  sameSite: cookieSameSite,
  maxAge: env.refreshTokenTtlDays * DAY_IN_MS,
  path: '/api/auth',
};

export const clearCookieOptions = {
  httpOnly: true,
  secure: usesCrossSiteCookies,
  sameSite: cookieSameSite,
  maxAge: 0,
  path: '/api/auth',
};