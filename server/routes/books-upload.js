/**
 * @file books-upload.js
 * @description Express router for uploading a new book (PDF + meta + optional cover).
 * Uses multer (memoryStorage) + GridFS in the controller.
 */

import express from 'express'
import multer  from 'multer'
import { UploadBook } from '../controllers/uploadBook.js'

const router  = express.Router()
const upload  = multer({ storage: multer.memoryStorage(), limits: { fieldSize: 10 * 1024 * 1024 } })

// POST /api/books/upload — PDF + meta (+ optional base64 cover)
router.post('/', upload.fields([
  { name: 'pdf',   maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]), UploadBook)

export default router
