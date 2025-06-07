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

const router = express.Router()

// Protect all private routes with JWT
router.use(passport.authenticate('jwt', { session: false }))

//------------------------------------------------------------------
// GET  /api/books/private      – list all user’s books
// DELETE /api/books/private    – (optional) delete all user’s books
//------------------------------------------------------------------
router.use('/', booksCollection)

//------------------------------------------------------------------
// GET /api/books/private/:id   – retrieve single book metadata
//------------------------------------------------------------------
router.use('/', bookSingle)

//------------------------------------------------------------------
// Stats endpoints:
//   GET/PATCH  /api/books/private/:id/live
//   GET        /api/books/private/:id/progress
//   PATCH      /api/books/private/:id/progress
//   PATCH      /api/books/private/:id/progress/auto
//   PATCH      /api/books/private/:id/last-opened
//------------------------------------------------------------------
router.use('/', bookStats)

//------------------------------------------------------------------
// Metadata endpoints:
//   POST  /api/books/private
//   PATCH /api/books/private/:id
//   Notes & bookmarks under /:id/notes and /:id/bookmarks
//------------------------------------------------------------------
router.use('/', bookForm)

export default router
