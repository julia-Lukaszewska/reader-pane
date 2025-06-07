/**
 * @file routes/booksPublic/index.js
 * @description Aggregates public book endpoints.
 *
 * Sub-routes:
 *   • GET /api/books/public/file/:filename – stream public PDF files
 */

import express from 'express'
import booksPublicRouter from './booksPublic.js'

const router = express.Router()

// Mount public book routes
router.use('/', booksPublicRouter)

export default router
