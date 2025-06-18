/**
 * @file routes/booksPrivate/booksCollection.js
 * @description Express router for retrieving book collections.
 */
import express from 'express'
import Book from '../../models/Book.js'
import { listLibrary, getLibraryBook  } from '../../controllers/LibraryBooksController.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ GET /api/books/private/static
//-----------------------------------------------------
/**
 * @route GET /api/books/private/static
 * @description List lightweight metadata for all books.
 * @returns {Array<Object>} Array of book metadata objects with selected fields.
 */
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

//-----------------------------------------------------
//------ GET /api/books/private
//-----------------------------------------------------
/**
 * @route GET /api/books/private
 * @description List full documents for all books owned by the user.
 */
router.get('/', listLibrary)
//-----------------------------------------------------
//------ GET /api/books/private/:id
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id
 * @description Retrieves a single book’s full document for the authenticated user.
 *              Uses the `getLibraryBook` controller to handle lookup and error responses.
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
router.get('/:id', getLibraryBook)

export default router
