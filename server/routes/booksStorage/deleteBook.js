/**
 * @file routes/booksStorage/deleteBook.js
 * @description Express router for deleting a book record and associated PDF from GridFS.
 */

import express from 'express'
import { DeleteBook } from '../../controllers/DeleteBookController.js'

const router = express.Router()

//------------------------------------------------------------------
// DELETE /api/books/storage/book/:id – delete book record and PDF
//------------------------------------------------------------------
router.delete('/book/:id', DeleteBook)

export default router
