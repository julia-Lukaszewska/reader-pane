/**
 * @file routes/booksPrivate/bookCollection.js
 * @description Express router for retrieving book collections.
 */

import express from 'express'
import Book from '../../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/static – list lightweight metadata for all books
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
    res.json(books)
  } catch (err) {
    console.error('[STATIC]', err)
    res.status(500).json({ error: 'Failed to fetch static books' })
  }
})

//------------------------------------------------------------------
// GET /api/books – list full documents for all books (owner-scoped)
//------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ 'meta.addedAt': -1 })
    res.json(books)
  } catch (err) {
    console.error('[GET ALL]', err)
    res.status(500).json({ error: 'Failed to fetch books' })
  }
})

export default router
