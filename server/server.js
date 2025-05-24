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
 * JSON and URL-encoded body size limits are set to 50MB.
 * This is required for uploading large base64-encoded cover images
 * or detailed metadata during book upload.
 */

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import corsMiddleware from 'cors'
import booksRoutes, { uploadsDir } from './routes/index.js'

const NODE_ENV = process.env.NODE_ENV || 'development'
const envPath = NODE_ENV === 'development'
  ? './server/env/.env'
  : `./server/env/.env.${NODE_ENV}`

dotenv.config({ path: envPath })

const app = express()
//------------------------------------------------------------------
// CORS configuration – moved to top
//------------------------------------------------------------------
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost:5173',
  'http://localhost:5174',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

//------------------------------------------------------------------
// Resolve __dirname for ES modules
//------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//------------------------------------------------------------------
// Ensure uploads directory exists
//------------------------------------------------------------------
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }) // creates subdirectories if needed
  console.log(`📁 Created uploads directory at: ${uploadsDir}`)
}

//------------------------------------------------------------------
// Port configuration
//------------------------------------------------------------------
const PORT = process.env.PORT || 5000
//------------------------------------------------------------------
// API routes
//------------------------------------------------------------------
app.get(
  '/',
  corsMiddleware({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
  (req, res) => {
    res.send('📚 Reader-Pane backend is running.')
  }
)

app.use('/api/books', booksRoutes)


//------------------------------------------------------------------
// Middleware configuration
//------------------------------------------------------------------
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev')) // HTTP request logger
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

//------------------------------------------------------------------
// Static file serving (PDFs, covers)
//------------------------------------------------------------------
app.use('/files', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Expose-Headers', '*')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  next()
})

app.use('/files', express.static(uploadsDir))


//------------------------------------------------------------------
// MongoDB connection and server start
//------------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    )
  })
  .catch((err) => console.error('❌ Database connection error:', err))

//------------------------------------------------------------------
// Global error handler
//------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error('❌ Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
