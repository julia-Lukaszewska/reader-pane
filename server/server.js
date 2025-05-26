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

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path, { dirname, join } from 'path'

// Load environment variables before anything else
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envFile = `.env.server.${process.env.BRANCH || 'dev'}`
dotenv.config({ path: join(__dirname, '..', 'env', envFile) })
console.log('JWT_ACCESS_KEY =', process.env.JWT_ACCESS_KEY);
console.log(` Loaded ${envFile}`)
import { configurePassport } from './config/passport.js';
configurePassport();


import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import fs from 'fs'

import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'

import booksRoutes, { uploadsDir } from './routes/index.js'
import { corsOptions, allowedOrigins } from './config/cors.config.js'

const app = express()

// -----------------------------------------------------------------------------
// AUTHENTICATION ROUTES
// -----------------------------------------------------------------------------

app.use(cookieParser())
app.use('/auth', authRoutes)

// -----------------------------------------------------------------------------
// CORS CONFIGURATION
// -----------------------------------------------------------------------------

app.use(cors(corsOptions))

// -----------------------------------------------------------------------------
// COMMON MIDDLEWARE
// -----------------------------------------------------------------------------

app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// -----------------------------------------------------------------------------
// ENSURE UPLOADS DIRECTORY EXISTS
// -----------------------------------------------------------------------------

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log(`Created uploads directory at: ${uploadsDir}`)
}

// -----------------------------------------------------------------------------
// STATIC FILE SERVING
// -----------------------------------------------------------------------------

app.use(
  '/files',
  cors({ origin: allowedOrigins, credentials: true }),
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Expose-Headers', '*')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    next()
  },
  express.static(uploadsDir)
)

// -----------------------------------------------------------------------------
// ROUTES
// -----------------------------------------------------------------------------

app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'))
app.use('/api/books', booksRoutes)

// -----------------------------------------------------------------------------
// START SERVER
// -----------------------------------------------------------------------------

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('Database connection error:', err))

// -----------------------------------------------------------------------------
// GLOBAL ERROR HANDLER
// -----------------------------------------------------------------------------

app.use((err, _req, res, _next) => {
  console.error('Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
