/**
 * @file server.js
 * @description
 * Main entry point for the Express backend.
 * Connects to MongoDB, configures middleware, serves static files,
 * handles routes, and applies global error handling.
 *
 * Features:
 * - Security (Helmet), CORS, HTTP request logging, JSON/body parsing
 * - Static file serving from /uploads via /files route
 * - API routing for /api/books endpoints
 * - Centralized error handler for uncaught exceptions
 *
 * Note:
 * JSON and URL-encoded body size limits are set to 50 MB – required for
 * uploading large base64 cover images or detailed metadata.
 */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path, { dirname, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import booksRoutes, { uploadsDir } from './routes/index.js';

/* ------------------------------------------------------------------ */
/* Load correct .env file – works no matter where you run `npm run`   */
/* ------------------------------------------------------------------ */
const NODE_ENV  = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const envFile = `.env.server.${process.env.BRANCH || 'dev'}`
dotenv.config({ path: join(__dirname, '..', 'env', envFile) })
console.log(`✅ Loaded ${envFile}`)


const app = express();

/* ------------------------------------------------------------------ */
/* CORS – allowed origins                                             */
/* ------------------------------------------------------------------ */
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://reader-pane-preview.vercel.app',
  'https://reader-pane-prod.vercel.app',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
        return cb(null, true);
      }
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

/* ------------------------------------------------------------------ */
/* Common middleware                                                  */
/* ------------------------------------------------------------------ */
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

/* ------------------------------------------------------------------ */
/* Ensure uploads directory exists                                    */
/* ------------------------------------------------------------------ */
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at: ${uploadsDir}`);
}

/* ------------------------------------------------------------------ */
/* Static file serving                                                */
/* ------------------------------------------------------------------ */
app.use(
  '/files',
  cors({ origin: ALLOWED_ORIGINS, credentials: true }),
  (req, res, next) => {
    /* keep your custom headers */
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    next();
  },
  express.static(uploadsDir)
);

/* ------------------------------------------------------------------ */
/* Routes                                                             */
/* ------------------------------------------------------------------ */
app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'));
app.use('/api/books', booksRoutes);

/* ------------------------------------------------------------------ */
/* Start server                                                       */
/* ------------------------------------------------------------------ */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));

/* ------------------------------------------------------------------ */
/* Global error handler                                               */
/* ------------------------------------------------------------------ */
app.use((err, _req, res, _next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
