/**
 * @file routes/booksStorage/stream.js
 * @description
 * Express router for streaming PDF files from GridFS.
 * - Requires authentication and owner check
 * - Supports HTTP Range requests for partial content
 */

import express from 'express'
import checkBookOwner from '../../middlewares/checkBookOwner.js'
import parseRange from '../../middlewares/parseRange.js'
import { StreamBookController } from '../../controllers/StreamBookController.js'

const router = express.Router()
console.log('[ROUTE] GET', req.originalUrl, 'range=', req.headers.range)
//------------------------------------------------------------------
// GET /api/books/storage/:filename – stream PDF by filename (protected)
//------------------------------------------------------------------
router.get(
  '/:filename',
  checkBookOwner,
  parseRange,
  StreamBookController
)

export default router
