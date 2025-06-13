/**
 * @file routes/booksPrivate/booksCollection.js
 * @description Express router for retrieving book collections.
 */

import express from 'express'
import Book from '../../models/Book.js'
import { listLibrary } from '../../controllers/LibraryBooksController.js'
const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/private/static – list lightweight metadata for all books
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
// GET /api/books/private       – list full documents for all books
//------------------------------------------------------------------
router.get('/', listLibrary)

export default router
