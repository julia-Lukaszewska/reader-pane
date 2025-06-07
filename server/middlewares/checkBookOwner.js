/**
 * @file middlewares/checkBookOwner.js
 * @description
 * Ensures the authenticated user owns the requested book.
 */
import Book from '../models/Book.js';

export default async function checkBookOwner(req, res, next) {
  try {
    const { filename } = req.params;
    const book = await Book.findOne({
      'file.filename': filename,
      owner: req.user.id
    });
    if (!book) return res.sendStatus(404);
    next();
  } catch (err) {
    next(err);
  }
}
