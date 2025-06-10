/**
 * @file server.js
 * @description
 * Main entry point for the Express backend.
 * Connects to MongoDB, configures middleware, serves API routes,
 * and initializes GridFS.
 */

import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import Sentry from './config/sentry.server.js';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import passport from 'passport';
import configurePassport from './config/passport.js';
import {
  authRouter,
  booksPublicRouter,
  booksPrivateRouter,
  booksStorageRouter
} from './routes/index.js';

import { getCorsOptions } from './config/cors/index.js';
import { gridFsBucketReady } from './config/gridfs.js';

// -----------------------------------------------------------------------------
// ENVIRONMENT & PATHS
// -----------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BRANCH = process.env.BRANCH || 'dev';
dotenv.config({ path: path.join(__dirname, '..', 'env', `.env.server.${BRANCH}`) });

console.log(`Loaded .env.server.${BRANCH}`);

// -----------------------------------------------------------------------------
// APP & COMMON MIDDLEWARE
// -----------------------------------------------------------------------------
const app = express();
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

const getEffectiveEnv = () => {
  if (BRANCH === 'main' || BRANCH === 'build') return 'production';
  if (BRANCH === 'staging') return 'staging';
  return 'development';
};
app.use(cors(getCorsOptions(getEffectiveEnv())));

// -----------------------------------------------------------------------------
// SENTRY: Express integration
// -----------------------------------------------------------------------------
Sentry.setupExpressErrorHandler(app);

// -----------------------------------------------------------------------------
// PASSPORT & ROUTES
// -----------------------------------------------------------------------------
configurePassport();
app.use(passport.initialize());

// Public routes
app.use('/api/books/public', booksPublicRouter);
app.use('/api/auth', authRouter);

// Book storage & private routes
app.use('/api/books/storage', booksStorageRouter);
app.use('/api/books/private', booksPrivateRouter);

app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'));
app.get('/health', (_req, res) => {
  const dbUp = mongoose.connection.readyState === 1;
  if (dbUp) return res.status(200).json({ status: 'ok' });
  res.status(500).json({ status: 'MongoDB not ready' });
});

// -----------------------------------------------------------------------------
// DATABASE & SERVER START
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await gridFsBucketReady;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));

// -----------------------------------------------------------------------------
// GLOBAL ERROR HANDLER (fallback)
// -----------------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  // wszystkie wyjątki zostały już przekazane do Sentry
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
