/**
 * server.js
 * Main entry point for Express backend.
 */
import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'

import configurePassport from './config/passport.js'
import { getCorsOptions } from './config/cors/index.js'
import { gridFsBucketReady } from './config/gridfs.js'

import {
  authRouter,
  // booksPublicRouter,
  booksStorageRouter,
  booksPrivateRouter
} from './routes/index.js'

// ———————————————————————————————
// 1. ENVIRONMENT
// ———————————————————————————————
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BRANCH = process.env.BRANCH || 'dev'
dotenv.config({ path: path.join(__dirname, '..', 'env', `.env.server.${BRANCH}`) })
console.log(`Loaded .env.server.${BRANCH}`)

// ———————————————————————————————
// 2. EXPRESS APP SETUP
// ———————————————————————————————
const app = express()
app.set('trust proxy', 1)
app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())
// ———————————————————————————————
// 3. GLOBAL MIDDLEWARE
// ———————————————————————————————
app.use(helmet({ crossOriginResourcePolicy: false }))      // security headers
app.use(morgan('dev'))                                     // request logging
app.use(express.json({ limit: '50mb' }))                   // body parser JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' })) // body parser URL-encoded
app.use(cookieParser())                                    // cookies
app.use(cors(getCorsOptions(                               // CORS
  BRANCH === 'main' ? 'production' :
  BRANCH === 'staging' ? 'staging' : 'development'
)))

// ———————————————————————————————
// 4. PASSPORT INITIALIZATION
// ———————————————————————————————
configurePassport()
app.use(passport.initialize())

// ———————————————————————————————
// 5. PUBLIC ROUTES
// ———————————————————————————————
app.use('/api/auth', authRouter)
// app.use('/api/books/public', booksPublicRouter)

// ———————————————————————————————
// 6. UPLOAD/STORAGE ROUTES
// ———————————————————————————————
app.use('/api/books/storage', booksStorageRouter)

// ———————————————————————————————
// 7. PRIVATE/PROTECTED ROUTES
// ———————————————————————————————
app.use('/api/books/private', booksPrivateRouter)

// ———————————————————————————————
// 8. BASIC HEALTHCHECK & ROOT
// ———————————————————————————————
app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'))
app.get('/health', (_req, res) => {
  const dbUp = mongoose.connection.readyState === 1
  res.status(dbUp ? 200 : 500).json({ status: dbUp ? 'ok' : 'MongoDB not ready' })
})
app.use(Sentry.Handlers.errorHandler())

// ———————————————————————————————
// 9. DATABASE CONNECTION & SERVER START
// ———————————————————————————————
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await gridFsBucketReady
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('Database connection error:', err))

// ———————————————————————————————
// 10. GLOBAL ERROR HANDLER (LAST)
// ———————————————————————————————
app.use((err, _req, res, _next) => {
  console.error('Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
