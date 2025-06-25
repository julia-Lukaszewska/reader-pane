/**
 * @file config/cors/index.js
 * @description CORS whitelist per environment/branch:
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
    'https://reader-pane.vercel.app',             // build
    'https://reader-pane-main.vercel.app',        // main
    /^https:\/\/reader-pane(-[\w-]+)?\.vercel\.app$/, // wildcard subdomains
  ],
}
//-----------------------------------------------------
//------ Normalize Environment
//-----------------------------------------------------
function normalizeEnv(env) {
  if (!env) return 'development'
  const alias = env.toLowerCase()
  if (alias === 'dev' || alias === 'development') return 'development'
  if (alias === 'stage' || alias === 'staging') return 'staging'
  if (alias === 'prod' || alias === 'production' || alias === 'main') 
    return 'production'
  return alias
}


//-----------------------------------------------------
//------ CORS Options Builder with Logging
//-----------------------------------------------------
export function getCorsOptions(env = process.env.NODE_ENV) {
  const normalized = normalizeEnv(env)
  const allowed = WHITELIST[normalized] || []

  console.log(`[CORS] Environment: ${env} → normalized as "${normalized}"`)
  console.log('[CORS] Allowed origins:', allowed)

  return {
    origin(origin, callback) {
  const isAllowed = origin && allowed.some(rule =>
    typeof rule === 'string' ? rule === origin : rule.test(origin)
  )

  console.log('[CORS] Incoming request from:', origin)
  console.log(`[CORS] ${isAllowed ? '✅ ALLOWED' : '❌ BLOCKED'} origin`)

  // Fallback dla braku `origin` – np. Postman, SSR, HEAD /
  if (!origin) {
    console.warn('[CORS] Missing origin → allowing (likely server-side or HEAD)')
    return callback(null, true)
  }

  return isAllowed
    ? callback(null, true)
    : callback(new Error('Not allowed by CORS'))
}
,

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
