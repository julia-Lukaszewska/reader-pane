/**
 * @file books-get.js
 * @description
 * Express router for book-related API endpoints.
 *
 * Public endpoints
 * ───────────────────────────────────────────────────────────
 * GET    /static                → list lightweight metadata
 * GET    /:id/live              → read mutable flags & stats
 * PATCH  /:id/live              → update mutable flags & stats
 * GET    /                      → list full book docs (owner-scoped)
 * GET    /:id                   → single full book
 * GET    /:id/cache             → rendered pages / ranges
 * GET    /:id/file              → stream PDF directly by bookId
 */

import express from 'express'
import Book from '../models/Book.js'
import { pdfBucket } from '../setupGridFS.js'

const router = express.Router()


// ───────────────────────────────────────────────────────────
// GET /api/books/static – lightweight metadata
// ───────────────────────────────────────────────────────────
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
    res.json(books)
  } catch (err) {
    console.error('[STATIC]', err)
    res.status(500).json({ error: 'Failed to fetch static books' })
  }
})

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/live – read mutable flags / stats
// ───────────────────────────────────────────────────────────
router.get('/:id/live', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { flags: 1, stats: 1 }
    ).lean()

    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[LIVE GET]', err)
    res.status(500).json({ error: 'Failed to fetch live data' })
  }
})

// ───────────────────────────────────────────────────────────
// PATCH /api/books/:id/live – update mutable flags / stats
// ───────────────────────────────────────────────────────────
router.patch('/:id/live', async (req, res) => {
  try {
    const updates = {}
    if (req.body.flags) updates.flags = req.body.flags
    if (req.body.stats) updates.stats = req.body.stats

    if (!Object.keys(updates).length)
      return res.status(400).json({ error: 'No flags or stats provided' })

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({ flags: book.flags, stats: book.stats })
  } catch (err) {
    console.error('[LIVE PATCH]', err)
    res.status(500).json({ error: 'Failed to update live data' })
  }
})

// ───────────────────────────────────────────────────────────
// GET /api/books – full documents (owner scope)
// ───────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ 'meta.addedAt': -1 })
    res.json(books)
  } catch (err) {
    console.error('[GET ALL]', err)
    res.status(500).json({ error: 'Failed to fetch books' })
  }
})

// ───────────────────────────────────────────────────────────
// GET /api/books/:id – single book
// ───────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[GET ONE]', err)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
})

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/cache – rendered pages / ranges
// ───────────────────────────────────────────────────────────
router.get('/:id/cache', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      'flags.renderedPages flags.renderedRanges'
    ).lean()

    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({
      renderedPages: book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    })
  } catch (err) {
    console.error('[CACHE]', err)
    res.status(500).json({ error: 'Failed to fetch cache data' })
  }
})

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/file – stream PDF directly by bookId
// ───────────────────────────────────────────────────────────
router.get('/:id/file', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book?.file?.filename) return res.status(404).send('File not found')

    const stream = pdfBucket.openDownloadStreamByName(book.file.filename)
    stream.on('error', () => res.status(404).send('File not found'))
    res.set('Content-Type', 'application/pdf')
    stream.pipe(res)
  } catch (err) {
    console.error('[FILE STREAM]', err)
    res.status(500).json({ error: 'Failed to stream file' })
  }
})

export default router