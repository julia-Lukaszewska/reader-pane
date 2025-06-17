// --------------------------------------------
// server.js (HTTPS-only version)
// --------------------------------------------
import './instrument.js'
import express from 'express'
import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'
import path from 'path'
import { getCorsOptions } from './config/cors/index.js'
import https from 'https'
import fs from 'fs'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'

import configurePassport from './config/passport.js'
import { gridFsBucketReady } from './config/gridfs.js'
import {
  authRouter,
  booksStorageRouter,
  booksPrivateRouter,
} from './routes/index.js'

// --------------------------------------------
// ENVIRONMENT
// --------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const BRANCH     = process.env.BRANCH || 'dev'

dotenv.config({
  path: path.join(__dirname, '..', 'env', `.env.server.${BRANCH}`),
})
console.log(`Loaded .env.server.${BRANCH}`)

// --------------------------------------------
// EXPRESS APP SETUP
// --------------------------------------------
const app = express()
app.set('trust proxy', 1)

// --------------------------------------------
// GLOBAL MIDDLEWARE
// --------------------------------------------
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(
  cors(
    getCorsOptions(
      BRANCH === 'main' ? 'production'
      : BRANCH === 'staging' ? 'staging'
      : 'development'
    )
  )
)

// --------------------------------------------
// PASSPORT INITIALIZATION
// --------------------------------------------
configurePassport()
app.use(passport.initialize())

// --------------------------------------------
// ROUTES
// --------------------------------------------
app.use('/api/auth', authRouter)
app.use('/api/books/storage', booksStorageRouter)
app.use('/api/books/private', booksPrivateRouter)

// --------------------------------------------
// HEALTHCHECK & ROOT
// --------------------------------------------
app.get('/', (_req, res) => res.send('Reader-Pane backend is running.'))
app.get('/health', (_req, res) => {
  const dbUp = mongoose.connection.readyState === 1
  res.status(dbUp ? 200 : 500).json({ status: dbUp ? 'ok' : 'MongoDB not ready' })
})

// --------------------------------------------
// GLOBAL ERROR HANDLER (LAST)
// --------------------------------------------
Sentry.setupExpressErrorHandler(app)

app.use((err, _req, res, _next) => {
  console.error('Global error handler:', err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// --------------------------------------------
// DATABASE CONNECTION & HTTPS SERVER START
// --------------------------------------------
const PORT = process.env.PORT || 5000
const httpsOptions = {
  key:  fs.readFileSync(path.join(__dirname, '..', 'client', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'client', 'localhost.pem')),
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await gridFsBucketReady
    console.log('GridFS bucket ready')
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`HTTPS backend listening on https://localhost:${PORT}`)
    })
  })
  .catch(err => console.error('Database connection error:', err))
