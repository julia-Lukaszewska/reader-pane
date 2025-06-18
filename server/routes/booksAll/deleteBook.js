/**
 * @file routes/booksStorage/deleteBook.js
 * @description Express router for deleting a book record and its associated PDF from GridFS.
 */
import express from 'express'
import { DeleteBookController } from '../../controllers/DeleteBookController.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ DELETE /api/books/storage/book/:id
//-----------------------------------------------------
/**
 * @route DELETE /api/books/storage/book/:id
 * @description Deletes a book document and its PDF file from GridFS.
 *              Uses DeleteBookController to handle file removal and record deletion.
 */
router.delete('/book/:id', DeleteBookController)

export default router
