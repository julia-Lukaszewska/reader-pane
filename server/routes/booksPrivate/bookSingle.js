/**
 * @file routes/booksPrivate/bookSingle.js
 * @description Express router for retrieving a single book’s metadata.
 */

import express from 'express'
import Book from '../../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/private/:id – retrieve single book (full document)
//------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[GET BOOK]', err)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
})

export default router
