/**
 * @file routes/booksStorage/index.js
 * @description Express router for all storage operations: upload, stream, delete file, delete book.
 */

import express from 'express'
import authJwt from '../../middlewares/authJwt.js'
import uploadRouter from './upload.js'
import streamRouter from './stream.js'
import deleteFileRouter from './deleteFile.js'
import deleteBookRouter from './deleteBook.js'

const router = express.Router()

// Protect all storage routes with JWT
router.use(authJwt)

//------------------------------------------------------------------
// POST /api/books/storage          – upload PDF and save metadata
//------------------------------------------------------------------
router.use('/', uploadRouter)

//------------------------------------------------------------------
// GET /api/books/storage/:filename  – stream PDF from GridFS
//------------------------------------------------------------------
router.use('/', streamRouter)

//------------------------------------------------------------------
// DELETE /api/books/storage/:filename – delete only PDF from GridFS
//------------------------------------------------------------------
router.use('/', deleteFileRouter)

//------------------------------------------------------------------
// DELETE /api/books/storage/book/:id – delete book record and PDF
//------------------------------------------------------------------
router.use('/', deleteBookRouter)

export default router
