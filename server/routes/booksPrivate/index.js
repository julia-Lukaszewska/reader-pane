/**
 * @file routes/booksPrivate/index.js
 * @description Express router for private book metadata and statistics.
 */
import express from 'express'
import passport from 'passport'

import bookCollection from './booksCollection.js' // ← połączony plik
import bookStats      from './bookStats.js'
import bookForm       from './bookForm.js'
import bookFileUrl    from './bookFileUrl.js'

const router = express.Router()

//-----------------------------------------------------
//------ JWT Protection
//-----------------------------------------------------
/**
 * Protect all private routes with Passport JWT strategy (no sessions).
 */
router.use(passport.authenticate('jwt', { session: false }))

//-----------------------------------------------------
//------ File URL Endpoint
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id/file-url
 * @description Retrieve the signed URL and file metadata for a book.
 */
router.use('/', bookFileUrl)

//-----------------------------------------------------
//------ Collection + Single Book Endpoints
//-----------------------------------------------------
/**
 * @route GET /api/books/private/static
 * @route GET /api/books/private
 * @route GET /api/books/private/:id
 * @description List books or retrieve a single book
 */
router.use('/', bookCollection)

//-----------------------------------------------------
//------ Statistics Endpoints
//-----------------------------------------------------
/**
 * @route GET|PATCH /api/books/private/:id/live
 * @route GET        /api/books/private/:id/progress
 * @route PATCH      /api/books/private/:id/progress
 * @route PATCH      /api/books/private/:id/progress/auto
 * @route PATCH      /api/books/private/:id/last-opened
 */
router.use('/', bookStats)

//-----------------------------------------------------
//------ Metadata, Notes & Bookmarks
//-----------------------------------------------------
/**
 * @route POST   /api/books/private
 * @route PATCH  /api/books/private/:id
 * @route PATCH  /api/books/private/:id/notes
 * @route DELETE /api/books/private/:id/notes/:index
 * @route PATCH  /api/books/private/:id/bookmarks
 * @route DELETE /api/books/private/:id/bookmarks/:index
 */
router.use('/', bookForm)

export default router
