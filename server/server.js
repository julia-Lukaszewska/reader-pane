/**
 * @file server.js
 * @description
 * Main server entry point for the Express backend.
 * Connects to MongoDB, sets up middleware, static file serving, routes, and global error handling.
 * 
 * Includes:
 * - Middleware setup for security, CORS, logging, and JSON parsing
 * - Static file serving from /uploads via /files route
 * - Route handling for /api/books endpoints
 * - Global error handler for uncaught exceptions
 * 
 * Note:
 * The JSON and URL-encoded body size limit is explicitly set to 50MB.
 * Without this setting, Express defaults to 100KB for JSON payloads.
 * This increase is required to support large base64-encoded cover images or detailed metadata during book uploads.
 */

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'

import booksRoutes, { uploadsDir } from './routes/index.js'
 
dotenv.config()
const app = express()

//------------------------------------------------------------------
// Resolve __dirname for ES modules
//------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//------------------------------------------------------------------
// Port configuration
//------------------------------------------------------------------
const PORT = process.env.PORT || 5000

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
// Middleware configuration
//------------------------------------------------------------------
app.use(helmet({crossOriginResourcePolicy: false }))           
app.use(morgan('dev'))           // HTTP request logger
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))


app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://reader-pane-frontend.onrender.com',
      'https://reader-pane.vercel.app',
    ],
    credentials: true,
  })
)


//------------------------------------------------------------------
// Static file serving (PDFs, covers)
//------------------------------------------------------------------
app.use('/files', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader('Access-Control-Allow-Origin', 'https://reader-pane.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use('/files', express.static(uploadsDir))

//------------------------------------------------------------------
// API routes
//------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('📚 Reader-Pane backend is running.');
});

app.use('/api/books', booksRoutes)

//------------------------------------------------------------------
// Global error handler
//------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error('❌ Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
