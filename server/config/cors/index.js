/**
 * @file config/cors/index.js
 * @description Whitelist CORS dla środowisk dev/staging/prod
 */
const WHITELIST = {
  development: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  staging:     ['https://reader-pane-staging.vercel.app'],
  production:  ['https://reader-pane.vercel.app'],
};

export function getCorsOptions(env = process.env.NODE_ENV) {
  const allowed = new Set(WHITELIST[env] || []);
  return {
    origin(origin, cb) {
      if (!origin || allowed.has(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization','Range'],
    exposedHeaders: ['Accept-Ranges','Content-Range'],
  };
}
