/**
 * @file routes/booksStorage/upload.js
 * @description
 * Express router for uploading PDF and saving book metadata.
 * - Requires JWT authentication
 * - Uses Multer for in-memory file upload (PDF + optional cover)
 * - Validates fields: title, description, tags
 * - Handles validation errors
 */
import express from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'

import authJwt from '../../middlewares/authJwt.js'
import { UploadBookController } from '../../controllers/UploadBookController.js'

//-----------------------------------------------------
//------ Router & Middleware Setup
//-----------------------------------------------------
const router = express.Router()

/**
 * @constant upload
 * @description Multer configuration: in-memory storage, 25MB file size limit.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
})

//-----------------------------------------------------
//------ Validation Rules
//-----------------------------------------------------
/**
 * @constant validateBook
 * @description Express-validator middleware for book metadata fields.
 */
const validateBook = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 256 }).withMessage('Title must be 1–256 characters long'),
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

//-----------------------------------------------------
//------ Validation Error Handler
//-----------------------------------------------------
/**
 * @function handleValidationErrors
 * @description Sends a 400 response if validation errors are present.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

//-----------------------------------------------------
//------ POST /api/books/storage
//-----------------------------------------------------
/**
 * @route POST /api/books/storage
 * @description Uploads a book PDF (and optional cover) along with metadata.
 *              Applies authentication, file upload, validation, and error handling.
 */
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
