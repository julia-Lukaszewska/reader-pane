/**
 * @file routes/booksStorage/upload.js
 * @description
 * Express router for uploading PDF and saving book metadata.
 * Applies:
 *   - JWT authentication
 *   - Multer memory upload (PDF + optional cover)
 *   - Field validation (title, description, tags)
 *   - Error handling for invalid input
 */

import express from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'

import authJwt from '../../middlewares/authJwt.js'
import { UploadBookController } from '../../controllers/UploadBookController.js'

const router = express.Router()

//-----------------------------------------------------------------------------
// Multer Configuration – in-memory upload for PDF + cover
//-----------------------------------------------------------------------------

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
})

//-----------------------------------------------------------------------------
// Validation Rules
//-----------------------------------------------------------------------------

const validateBook = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 256 }).withMessage('Title must be 1-256 characters long'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim()
    .isLength({ max: 4096 }).withMessage('Description too long (max 4096)'),
  
  body('tags')
    .optional()
    .isString().withMessage('Tags must be a string')
    .trim(),
]

//-----------------------------------------------------------------------------
// Middleware – handle validation errors
//-----------------------------------------------------------------------------

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

//-----------------------------------------------------------------------------
// POST /api/books/storage – upload book PDF + metadata
//-----------------------------------------------------------------------------

router.post(
  '/',
  authJwt,
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  validateBook,
  handleValidationErrors,
  UploadBookController
)

export default router
