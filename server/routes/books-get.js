// src/routes/books-get.js
import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

//─────────────────── STATIC FIELDS ───────────────────
// GET /api/books/static — fetch only immutable metadata
router.get('/static', async (req, res) => {
  try {
    const staticBooks = await Book.find({}, {
      'meta.title':       1,
      'meta.author':      1,
      'meta.totalPages':  1,
      'meta.cover':       1,
      'meta.tags':        1,
      'meta.language':    1,
      'meta.collection':  1,
    }).lean()
    res.status(200).json(staticBooks)
  } catch (err) {
    console.error('[STATIC] Error fetching static books:', err)
    res.status(500).json({ error: 'Error while fetching static books' })
  }
})

//─────────────────── LIVE FIELDS ───────────────────
// GET /api/books/:id/live — fetch only mutable fields (flags + stats)
router.get('/:id/live', async (req, res) => {
  try {
    const live = await Book.findById(
      req.params.id,
      { flags: 1, stats: 1 }
    ).lean()
    if (!live) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json(live)
  } catch (err) {
    console.error('[LIVE GET] Error fetching live data:', err)
    res.status(500).json({ error: 'Error while fetching live data' })
  }
})

// PATCH /api/books/:id/live — update only mutable fields (flags + stats)
router.patch('/:id/live', async (req, res) => {
  try {
    const changes = {}
    if (req.body.flags) changes.flags = req.body.flags
    if (req.body.stats) changes.stats = req.body.stats

    if (!Object.keys(changes).length) {
      return res.status(400).json({ error: 'No flags or stats provided' })
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { new: true, runValidators: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json({ flags: book.flags, stats: book.stats })
  } catch (err) {
    console.error('[LIVE PATCH] Error updating live data:', err)
    res.status(500).json({ error: 'Error while updating live data' })
  }
})

//─────────────────── FULL OBJECTS ───────────────────
// GET /api/books — get all books (full object)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ 'meta.addedAt': -1 })
    res.status(200).json(books)
  } catch (err) {
    console.error('[BOOKS] Error fetching all books:', err)
    res.status(500).json({ error: 'Error while fetching books' })
  }
})

// GET /api/books/:id — get single book (full object)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json(book)
  } catch (err) {
    console.error('[BOOK] Error fetching single book:', err)
    res.status(500).json({ error: 'Error while fetching book' })
  }
})

//─────────────────── CACHE DATA ───────────────────
// GET /api/books/:id/cache — get renderedPages & renderedRanges
router.get('/:id/cache', async (req, res) => {
  try {
    const book = await Book.findById(
      req.params.id,
      'flags.renderedPages flags.renderedRanges'
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.status(200).json({
      renderedPages:  book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    })
  } catch (err) {
    console.error('[CACHE] Error fetching cache data:', err)
    res.status(500).json({ error: 'Error fetching cache data' })
  }
})

//─────────────────── FILE URL ───────────────────
// GET /api/books/:id/file-url — get fileUrl of uploaded PDF
router.get('/:id/file-url', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .select('meta.fileUrl fileUrl')
      .lean()
    if (!book) return res.status(404).json({ message: 'Book not found' })
    const raw = book.meta?.fileUrl ?? book.fileUrl
    res.status(200).json({ fileUrl: raw })
  } catch (err) {
    console.error('[FILE URL] Error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
