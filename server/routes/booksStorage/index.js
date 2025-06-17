/**
 * @file routes/booksStorage/index.js
 * @description
 * Express router for all storage operations: upload, stream, delete file, delete book.
 */
import express from 'express'
import authJwt from '../../middlewares/authJwt.js'
import uploadRouter from './upload.js'
import streamRouter from './stream.js'
import deleteFileRouter from './deleteFile.js'
import deleteBookRouter from './deleteBook.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ JWT Protection
//-----------------------------------------------------
/**
 * Protect all storage routes with JWT authentication.
 */
router.use(authJwt)

//-----------------------------------------------------
//------ POST /api/books/storage
//-----------------------------------------------------
/**
 * @route POST /api/books/storage
 * @description Upload PDF and save metadata.
 */
router.use('/', uploadRouter)

//-----------------------------------------------------
//------ GET /api/books/storage/:filename
//-----------------------------------------------------
/**
 * @route GET /api/books/storage/:filename
 * @description Stream PDF from GridFS by filename.
 */
router.use('/', streamRouter)

//-----------------------------------------------------
//------ DELETE /api/books/storage/:filename
//-----------------------------------------------------
/**
 * @route DELETE /api/books/storage/:filename
 * @description Delete only the PDF file from GridFS.
 */
router.use('/', deleteFileRouter)

//-----------------------------------------------------
//------ DELETE /api/books/storage/book/:id
//-----------------------------------------------------
/**
 * @route DELETE /api/books/storage/book/:id
 * @description Delete the book record and its PDF file.
 */
router.use('/', deleteBookRouter)

export default router
