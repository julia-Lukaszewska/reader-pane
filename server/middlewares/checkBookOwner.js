/**
 * @file middlewares/checkBookOwner.js
 * @description
 * Ensures the authenticated user owns the requested book before allowing access.
 */
import Book from '../models/Book.js'

//-----------------------------------------------------
//------ checkBookOwner Middleware
//-----------------------------------------------------
/**
 * @function checkBookOwner
 * @description Express middleware that verifies the current user owns the book
 *              identified by the `filename` route parameter.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function checkBookOwner(req, res, next) {
  try {
    const { filename } = req.params
    const book = await Book.findOne({
      'file.filename': filename,
      owner: req.user.id,
    })
    if (!book) {
      return res.sendStatus(404)
    }
    next()
  } catch (err) {
    next(err)
  }
}
