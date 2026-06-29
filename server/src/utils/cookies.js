import { env, isProduction } from '../config/env.js';

export const REFRESH_COOKIE_NAME = 'refreshToken';

const DAY_IN_MS = 24 * 60 * 60 * 1000; 

export const refreshCookieOptions = {
  httpOnly: true,                             
  secure: isProduction,                       
  sameSite: 'strict',                          
  maxAge: env.refreshTokenTtlDays * DAY_IN_MS, 
  path: '/api/auth',                           
};

export const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  maxAge: 0,           
  path: '/api/auth',
};