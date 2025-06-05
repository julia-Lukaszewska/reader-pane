/**
 * @file index.js
 * @description Main router for /api/books.
 * Applies global middleware:
 * - Validates :id parameters
 * - JWT authentication
 * Mounts sub-routes:
 * - GET routes for reading books and lists
 * - Upload routes for PDF files
 * - Flag routes (favorites, archive, delete)
 * - Progress routes (last opened, current page)
 * - Edit routes (meta, notes, bookmarks)
 */

import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'


import getRoutes from './books-get.js'
import flagRoutes from './books-flags.js'
import progressRoutes from './books-progress.js'
import editRoutes from './books-edit.js'
import uploadRoutes from './books-upload.js'

const router = express.Router()

// -----------------------------------------------------------------------------
// PARAM VALIDATION – validate :id in all routes
// -----------------------------------------------------------------------------

router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }
  next()
})

// -----------------------------------------------------------------------------
// AUTHENTICATION – protect all routes with JWT
// -----------------------------------------------------------------------------

router.use(passport.authenticate('jwt', { session: false }))

// -----------------------------------------------------------------------------
// SUB-ROUTES – mount all functional book-related routes
// -----------------------------------------------------------------------------

// Upload routes (PDF files)
// If you want this route to be public, move it above JWT middleware
router.use('/upload', uploadRoutes)

// Read-only routes (get books, search, etc.)
router.use('/', getRoutes)

// Flag routes (favorite, archive, delete)
router.use(flagRoutes)

// Progress routes (current page, last opened)
router.use(progressRoutes)

// Edit routes (meta, notes, bookmarks)
router.use(editRoutes)

export default router
// export { uploadsDir }
