import express from 'express'
import authJwt from '../../middlewares/authJwt.js'
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
//------ DELETE /api/books/all/book/:id'
//-----------------------------------------------------
/**
 * @route DELETE /api/books/all/book/:id'
 * @description Delete the book record and its PDF file.
 */
router.use('/', deleteBookRouter)

export default router