/**
 * @file routes/booksStorage/index.js
 * @description
 * Express router for all storage operations: upload, stream, delete file, delete book.
 */
import express from 'express'
import authJwt from '../../middlewares/authJwt.js'
import uploadRouter from './upload.js'
import streamRouter from './stream.js'


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





export default router
