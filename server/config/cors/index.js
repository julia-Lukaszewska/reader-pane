/**
 * @file config/cors/index.js
 * @description CORS whitelist per environment/branch.
 *   - development → local Vite
 *   - staging     → staging frontend on Vercel
 *   - production  → build & main frontends on Vercel
 *
 * Usage    :
 *   import cors from 'cors';
 *   import { getCorsOptions } from './config/cors/index.js';
 *   app.use(cors(getCorsOptions()));
 */

const WHITELIST = {
  development: [
    'https://localhost:5173',
    'https://127.0.0.1:5173',
  ],
  staging: [
    'https://reader-pane-staging.vercel.app',
  ],
  production: [
    'https://reader-pane.vercel.app', // build
    'https://reader-pane-main.vercel.app', // main
    /^https:\/\/reader-pane(-[\w-]+)?\.vercel\.app$/,
  ],

};

/**
 * Build CORS options for `cors()` middleware.
 *
 * @param {string} [env=process.env.NODE_ENV] - current NODE_ENV
 * @returns {import('cors').CorsOptions}
 */
export function getCorsOptions(env = process.env.NODE_ENV) {
  const allowed = WHITELIST[env] || [];

  return {
    origin(origin, cb) {
      console.log('[CORS] Request from:', origin);
      if (
        !origin ||
        allowed.some((rule) =>
          typeof rule === 'string' ? rule === origin : rule.test(origin)
        )
      ) {
        console.log('[CORS] Allowed');
        return cb(null, true);
      }
      console.warn('[CORS] Blocked origin:', origin);
      cb(new Error('Not allowed by CORS'));

    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Accept-Ranges', 'Content-Range', 'Content-Length', 'Content-Type'],
  };
}
