//------------------------------------------------------------------
// Main router that combines all book-related routes
//------------------------------------------------------------------

import express from 'express'
import mongoose from 'mongoose'

//------------------------------------------------------------------
// Import sub-routes
//------------------------------------------------------------------
 
import getRoutes       from './books-get.js'         // GET all, single, cache
import flagRoutes      from './books-flags.js'       // favorite, archive, delete
import progressRoutes  from './books-progress.js'    // reading progress
import editRoutes      from './books-edit.js'        // meta, flags, notes, bookmarks
import uploadRoutes, { uploadsDir } from './books-upload.js' // PDF upload + dir

const router = express.Router()

//------------------------------------------------------------------
// Validate :id param for all routes
//------------------------------------------------------------------

router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }
  next()
})

//------------------------------------------------------------------
// Mount sub-routers (order matters)
//------------------------------------------------------------------

// Upload first — uses separate prefix
router.use('/upload', uploadRoutes)

// Read-only routes
router.use('/', getRoutes)

// Book flags (favorite, archive, delete)
router.use(flagRoutes)

// Reading progress and last opened
router.use(progressRoutes)

// Editable data: meta, notes, bookmarks
router.use(editRoutes)

export default router
export { uploadsDir }
