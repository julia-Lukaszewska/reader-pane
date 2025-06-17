/**
 * @file routes/booksPrivate/index.js
 * @description Express router for private book metadata and statistics.
 */
import express from 'express'
import passport from 'passport'

import booksCollection from './booksCollection.js'
import bookSingle      from './bookSingle.js'
import bookStats       from './bookStats.js'
import bookForm        from './bookForm.js'
import bookFileUrl     from './bookFileUrl.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
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
//------ Collection Endpoints
//-----------------------------------------------------
/**
 * @route GET /api/books/private/static
 * @route GET /api/books/private
 * @description List user’s books (static metadata or full documents).
 */
router.use('/', booksCollection)

//-----------------------------------------------------
//------ Single Book Endpoint
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id
 * @description Retrieve full metadata for a single book.
 */
router.use('/', bookSingle)

//-----------------------------------------------------
//------ Statistics Endpoints
//-----------------------------------------------------
/**
 * @route GET|PATCH /api/books/private/:id/live
 * @route GET        /api/books/private/:id/progress
 * @route PATCH      /api/books/private/:id/progress
 * @route PATCH      /api/books/private/:id/progress/auto
 * @route PATCH      /api/books/private/:id/last-opened
 * @description Manage reading stats and timestamps.
 */
router.use('/', bookStats)

//-----------------------------------------------------
//------ Metadata, Notes & Bookmarks Endpoints
//-----------------------------------------------------
/**
 * @route POST   /api/books/private
 * @route PATCH  /api/books/private/:id
 * @route PATCH  /api/books/private/:id/notes
 * @route DELETE /api/books/private/:id/notes/:index
 * @route PATCH  /api/books/private/:id/bookmarks
 * @route DELETE /api/books/private/:id/bookmarks/:index
 * @description Create and update book metadata, notes, and bookmarks.
 */
router.use('/', bookForm)

export default router
