/**
 * @file config/cors/index.js
 * @description CORS whitelist per environment/branch:
 *   - development → local Vite
 *   - staging     → staging frontend on Vercel
 *   - production  → build & main frontends on Vercel
 *
 * Usage:
 *   import cors from 'cors';
 *   import { getCorsOptions } from './config/cors/index.js';
 *   app.use(cors(getCorsOptions()));
 */
  
//-----------------------------------------------------
//------ Whitelist Definitions
//-----------------------------------------------------
const WHITELIST = {
  development: [
    'https://localhost:5173',
    'https://127.0.0.1:5173',
  ],
  staging: [
    'https://reader-pane-staging.vercel.app',
  ],
  production: [
    'https://reader-pane.vercel.app',             // build
    'https://reader-pane-main.vercel.app',        // main
    /^https:\/\/reader-pane(-[\w-]+)?\.vercel\.app$/,
  ],
}

//-----------------------------------------------------
//------ Environment Normalization
//-----------------------------------------------------
/**
 * @function normalizeEnv
 * @description Normalize common environment aliases to one of:
 *   'development', 'staging', 'production'
 * @param {string} env
 * @returns {string}
 */
function normalizeEnv(env) {
  if (!env) return 'development'
  const alias = env.toLowerCase()
  if (alias === 'dev' || alias === 'development') return 'development'
  if (alias === 'stage' || alias === 'staging') return 'staging'
  if (alias === 'prod' || alias === 'production') return 'production'
  return alias
}

//-----------------------------------------------------
//------ CORS Options Builder
//-----------------------------------------------------
/**
 * @function getCorsOptions
 * @description Build CORS options for Express `cors()` middleware.
 *   - Validates `origin` against the whitelist for the given environment
 *   - Logs allow/block decisions
 * @param {string} [env=process.env.NODE_ENV] - Current NODE_ENV or branch
 * @returns {import('cors').CorsOptions}
 */
export function getCorsOptions(env = process.env.NODE_ENV) {
  const normalized = normalizeEnv(env)
  const allowed = WHITELIST[normalized] || []

  return {
    origin(origin, callback) {
      console.log('[CORS] Request from:', origin)
      const isAllowed = !origin || allowed.some(rule =>
        typeof rule === 'string'
          ? rule === origin
          : rule.test(origin)
      )

      if (isAllowed) {
        console.log('[CORS] Allowed')
        return callback(null, true)
      }

      console.warn('[CORS] Blocked origin:', origin)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'],
    allowedHeaders: ['Content-Type','Authorization','Range'],
    exposedHeaders: [
      'Accept-Ranges',
      'Content-Range',
      'Content-Length',
      'Content-Type',
    ],
  }
}
