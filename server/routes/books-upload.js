/**
 * @file books-upload.js
 * @description Express router for uploading a new book (PDF + meta + optional cover).
 * Uses multer to handle file uploads and calls controller to process data.
 * Includes:
 * - POST /api/books — upload book PDF and metadata
 */

import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { handleUploadBook } from '../controllers/uploadBook.js'

//------------------------------------------------------------------
// Resolve __dirname for ES modules
//------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const uploadsDir = path.join(__dirname, '../uploads')

//------------------------------------------------------------------
// Ensure uploads directory exists
//------------------------------------------------------------------
fs.mkdirSync(uploadsDir, { recursive: true })

//------------------------------------------------------------------
// Configure multer storage
//------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[/\\]+/g, '_')
    cb(null, `${Date.now()}-${safeName}`)
  },
})

//------------------------------------------------------------------
// Set file filter and upload limits
//------------------------------------------------------------------
const pdfOnly = (_req, file, cb) => {
  file.mimetype === 'application/pdf'
    ? cb(null, true)
    : cb(new Error('Only PDF files are allowed.'))
}

const upload = multer({
  storage,
  fileFilter: pdfOnly,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
})

//------------------------------------------------------------------
// Initialize router and define upload route
//------------------------------------------------------------------
const router = express.Router()

// POST /api/books — upload PDF + meta + optional cover
router.post('/', upload.single('file'), handleUploadBook)


export default router
