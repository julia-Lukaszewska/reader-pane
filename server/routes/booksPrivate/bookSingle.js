/**
 * @file routes/booksPrivate/bookSingle.js
 * @description Express router for retrieving a single book’s metadata.
 */
import express from 'express'
import { getLibraryBook } from '../../controllers/LibraryBooksController.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

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
