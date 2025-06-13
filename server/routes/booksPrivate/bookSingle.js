/**
 * @file routes/booksPrivate/bookSingle.js
 * @description Express router for retrieving a single book’s metadata.
 */

import express from 'express'
import Book from '../../models/Book.js'
import { getLibraryBook } from '../../controllers/LibraryBooksController.js'
const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/private/:id – retrieve single book (full document)
//------------------------------------------------------------------
router.get('/:id', getLibraryBook)

export default router
