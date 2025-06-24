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
    /^https:\/\/reader-pane(-[\w-]+)?\.vercel\.app$/, // wildcard subdomains
  ],
}

//-----------------------------------------------------
//------ Environment Normalization
//-----------------------------------------------------
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
export function getCorsOptions(env = process.env.NODE_ENV) {
  const normalized = normalizeEnv(env)
  const allowed = WHITELIST[normalized] || []

  return {
    origin(origin, callback) {
      const isAllowed = origin && allowed.some(rule =>
        typeof rule === 'string' ? rule === origin : rule.test(origin)
      )

      if (process.env.NODE_ENV === 'development') {
        console.log('[CORS] Request from:', origin)
        console.log(`[CORS] ${isAllowed ? 'Allowed' : 'Blocked'} origin`)
      }

      return isAllowed
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: [
      'Accept-Ranges',
      'Content-Range',
      'Content-Length',
      'Content-Type',
    ],
  }
}
