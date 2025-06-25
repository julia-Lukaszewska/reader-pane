/**
 * @file routes/booksStorage/stream.js
 * @description
 * Express router for streaming PDF files from GridFS:
 * - Requires JWT authentication and owner check
 * - Supports CORS with preflight
 * - Handles HTTP HEAD and GET (with Range) requests for partial content
 */
import express from 'express'
import cors from 'cors'
import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getGridFsBucket } from '../../config/gridfs.js'
import { fullFile } from '../../controllers/stream/fullFile.js'
import { getCorsOptions } from '../../config/cors/index.js'

//-----------------------------------------------------
//------ Router & CORS Setup
//-----------------------------------------------------
const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

//-----------------------------------------------------
//------ Preflight OPTIONS
//-----------------------------------------------------
/**
 * @route OPTIONS /api/books/storage/:filename
 * @description Handle CORS preflight for streaming endpoint.
 */
router.options(
  '/:filename',
  cors(corsOptions),
  (_req, res) => res.sendStatus(204)
)

//-----------------------------------------------------
//------ HEAD Request: File Metadata
//-----------------------------------------------------
/**
 * @route HEAD /api/books/storage/:filename
 * @description Return file size and support for byte ranges without body.
 */
router.head(
  '/:filename',
  cors(corsOptions),
  checkBookOwner,
  async (req, res, next) => {
    try {
      const bucket = getGridFsBucket()
      const filesColl = bucket.s.db.collection('books_files.files')
      const fileDoc = await filesColl.findOne({ filename: req.params.filename })
      if (!fileDoc) return res.sendStatus(404)

      res.set({
        'Content-Length': fileDoc.length,
        'Accept-Ranges': 'bytes',
        'Content-Type': fileDoc.contentType || 'application/pdf',
      })
      return res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }
)

//-----------------------------------------------------
//------ GET Request: Stream PDF (with Range support)
//-----------------------------------------------------
/**
 * @route GET /api/books/storage/:filename
 * @description Stream PDF content, supporting HTTP Range requests.
 */
router.get(
  '/:filename',
  cors(corsOptions),
  (req, _res, next) => {
    console.log('[STREAM ROUTE] GET', req.originalUrl, 'range=', req.headers.range)
    next()
  },
  checkBookOwner,
   fullFile
)

export default router
