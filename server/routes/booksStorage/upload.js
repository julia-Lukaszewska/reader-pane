/**
 * @file routes/booksStorage/upload.js
 * @description Express router for uploading PDF and saving book metadata.
 */

import express from 'express'
import multer from 'multer'
import authJwt from '../../middlewares/authJwt.js'
import { body } from 'express-validator'
import { UploadBookController } from '../../controllers/UploadBookController.js'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
})

const validateBook = [
  body('title').optional().isString().trim().isLength({ min: 1, max: 256 }),
  body('description').optional().isString().trim().isLength({ max: 4096 }),
  body('tags').optional().isString().trim(),
]

router.post(
  '/',
  authJwt,
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  validateBook,
  UploadBookController
)

export default router
