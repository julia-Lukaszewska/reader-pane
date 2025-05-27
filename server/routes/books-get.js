/**
 * @file books-get.js
 * @description Express router for fetching book data from MongoDB.
 * Includes:
 * - GET /static – fetch static metadata (title, tags, cover...)
 * - GET /:id/live – fetch flags and stats (mutable state)
 * - PATCH /:id/live – update flags and stats
 * - GET / – fetch all books (full objects)
 * - GET /:id – fetch single book (full object)
 * - GET /:id/cache – get rendered pages and ranges
 * - GET /:id/file-url – get PDF file URL
 */

import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/static — fetch static metadata only
//------------------------------------------------------------------
router.get('/static', async (req, res) => {
  try {
    const books = await Book.find(
      { owner: req.user.id },
      {
        'meta.title': 1,
        'meta.author': 1,
        'meta.totalPages': 1,
        'meta.cover': 1,
        'meta.tags': 1,
        'meta.language': 1,
        'meta.collection': 1,
      }
    ).lean()
    res.status(200).json(books)
  } catch (err) {
    console.error('[STATIC]', err)
    res.status(500).json({ error: 'Error while fetching static books' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id/live — fetch mutable fields (flags + stats)
//------------------------------------------------------------------
router.get('/:id/live', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { flags: 1, stats: 1 }
    ).lean()
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json(book)
  } catch (err) {
    console.error('[LIVE GET]', err)
    res.status(500).json({ error: 'Error while fetching live data' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/live — update flags and stats
//------------------------------------------------------------------
router.patch('/:id/live', async (req, res) => {
  try {
    const changes = {}
    if (req.body.flags) changes.flags = req.body.flags
    if (req.body.stats) changes.stats = req.body.stats

    if (!Object.keys(changes).length) {
      return res.status(400).json({ error: 'No flags or stats provided' })
    }

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: changes },
      { new: true, runValidators: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json({ flags: book.flags, stats: book.stats })
  } catch (err) {
    console.error('[LIVE PATCH]', err)
    res.status(500).json({ error: 'Error while updating live data' })
  }
})

//------------------------------------------------------------------
// GET /api/books — get all books (full objects)
//------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ 'meta.addedAt': -1 })
    res.status(200).json(books)
  } catch (err) {
    console.error('[GET ALL]', err)
    res.status(500).json({ error: 'Error while fetching books' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id — get single book (full object)
//------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json(book)
  } catch (err) {
    console.error('[GET ONE]', err)
    res.status(500).json({ error: 'Error while fetching book' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id/cache — get renderedPages and renderedRanges
//------------------------------------------------------------------
router.get('/:id/cache', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      'flags.renderedPages flags.renderedRanges'
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json({
      renderedPages: book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    })
  } catch (err) {
    console.error('[CACHE]', err)
    res.status(500).json({ error: 'Error fetching cache data' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id/file-url — get file URL of uploaded PDF
//------------------------------------------------------------------
router.get('/:id/file-url', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      'meta.fileUrl fileUrl'
    ).lean()
    if (!book) return res.status(404).json({ message: 'Book not found' })
    const raw = book.meta?.fileUrl ?? book.fileUrl
    res.status(200).json({ fileUrl: raw })
  } catch (err) {
    console.error('[FILE URL]', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router;
