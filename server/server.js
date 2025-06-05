/**
 * @file server.js
 * @description
 * Main entry point for the Express backend.
 * Connects to MongoDB, configures middleware, serves API routes,
 * and initialises GridFS.
 */

import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { configurePassport } from './config/passport.js'
import booksPublicRoutes from './routes/books-public.js'


import authRoutes from './routes/auth.js'
import booksRoutes from './routes/index.js'
import { corsOptions } from './config/cors.config.js'
import './setupGridFS.js'                     

// -----------------------------------------------------------------------------
// ENV & PATHS
// -----------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const BRANCH     = process.env.BRANCH || 'dev'
dotenv.config({ path: path.join(__dirname, '..', 'env', `.env.server.${BRANCH}`) })

console.log(`Loaded .env.server.${BRANCH}`)

// -----------------------------------------------------------------------------
// APP & COMMON MIDDLEWARE
// -----------------------------------------------------------------------------
const app = express()

app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(cors(corsOptions))

// -----------------------------------------------------------------------------
// PASSPORT & ROUTES
// -----------------------------------------------------------------------------
configurePassport()
app.use('/api/books', booksPublicRoutes)
app.use('/api/auth',  authRoutes)
app.use('/api/books', booksRoutes)            // all book-related routes (incl. file streaming)

app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'))

// -----------------------------------------------------------------------------
// DATABASE & SERVER START
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 5000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error('Database connection error:', err))

// -----------------------------------------------------------------------------
// GLOBAL ERROR HANDLER
// -----------------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error('Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
