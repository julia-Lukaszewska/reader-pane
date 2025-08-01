/**
 * @file routes/booksStorage/index.js
 * @description
 * Express router for all storage operations: upload, stream, delete file, delete book.
 */
import express from 'express'
import authJwt from '../../middlewares/authJwt.js'
import uploadRouter from './upload.js'
import streamRouter from './stream.js'
import metaRouter from './meta.js'
import pageRouter from './page.js'
import rangeRouter from './range.js'

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
//------ GET /api/books/storage/:filename/meta
//-----------------------------------------------------
/**
 * @route GET /api/books/storage/:filename/meta
 * @description Return PDF page metadata.
 */
router.use('/', metaRouter)
//---------------------------------------------------
//------- GET /api/books/storage/:filename/page/:num
//--------------------------------------------------

router.use('/', pageRouter)

//---------------------------------------------------
//------- GET /api/books/storage/:filename/pages
//--------------------------------------------------
/**
 * @route GET /api/books/storage/:filename/pages
 * @description Stream selected range of pages as a PDF slice.
 */
router.use('/', rangeRouter)
//-----------------------------------------------------
//------ GET /api/books/storage/:filename
//-----------------------------------------------------
/**
 * @route GET /api/books/storage/:filename
 * @description Stream PDF from GridFS by filename.
 */
router.use('/', streamRouter)





export default router
