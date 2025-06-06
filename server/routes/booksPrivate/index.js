/**
 * @file routes/booksPrivate/index.js
 * @description Barrel file for authenticated book-related routes.
 */

import express from 'express'
import passport from 'passport'

import bookUpload     from './bookUpload.js'
import bookCollection from './bookCollection.js'
import bookSingle     from './bookSingle.js'
import bookStats      from './bookStats.js'
import bookForm       from './bookForm.js'

const router = express.Router()

// -----------------------------------------------------------------------------
// AUTHENTICATION – protect all /api/books routes with JWT
// -----------------------------------------------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// -----------------------------------------------------------------------------
// SUB-ROUTES – mount all book-related routes under /api/books
// -----------------------------------------------------------------------------
router.use('/',       bookUpload)      // POST   /api/books/upload
router.use('/',       bookCollection)  // GET    /api/books, /api/books/static
router.use('/',       bookSingle)      // GET/DELETE /api/books/:id, plus flags, cache, file
router.use('/',       bookStats)       // GET/POST   /api/books/:id/live  and /progress, /last-opened
router.use('/',       bookForm)        // PATCH  /api/books/:id, notes, bookmarks

export default router
