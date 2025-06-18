/**
 * @file LibraryController.js
 * @description
 * Controller functions for managing the user's library. Provides
 * endpoints to list, retrieve, update, and delete books belonging to
 * the authenticated user.
 */
import Book from '../models/Book.js'
import { deleteFile } from '../config/gridfs.js'

//-----------------------------------------------------
//------ listLibrary: List All Books
//-----------------------------------------------------
/**
 * @function listLibrary
 * @description Retrieves all books owned by the authenticated user,
 *              sorted newest first.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const listLibrary = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id })
      .sort({ 'meta.addedAt': -1 })
    res.json(books)
  } catch (err) {
    console.error('[LIBRARY LIST ERROR]', err)
    res.status(500).json({ error: 'Failed to fetch library' })
  }
}

//-----------------------------------------------------
//------ getLibraryBook: Retrieve Single Book
//-----------------------------------------------------
/**
 * @function getLibraryBook
 * @description Retrieves a single book by ID for the authenticated user.
 *              Sends 404 if not found, and disables caching.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getLibraryBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    res.set('Cache-Control', 'no-store')
    res.json(book)
  } catch (err) {
    console.error('[LIBRARY GET ERROR]', err)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
}

//-----------------------------------------------------
//------ updateLibraryBook: Update Book Meta
//-----------------------------------------------------
/**
 * @function updateLibraryBook
 * @description Updates metadata fields on a book. Expects `req.body.meta`.
 *              Returns the updated book document.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateLibraryBook = async (req, res) => {
  try {
    if (!req.body.meta) {
      return res.status(400).json({ error: 'No meta provided.' })
    }

    const updates = {}
    for (const [key, value] of Object.entries(req.body.meta)) {
      updates[`meta.${key}`] = value
    }

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    )
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    res.json(book)
  } catch (err) {
    console.error('[LIBRARY UPDATE ERROR]', err)
    res.status(500).json({ error: 'Failed to update book' })
  }
}

