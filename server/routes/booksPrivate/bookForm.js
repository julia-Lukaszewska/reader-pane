/**
 * @file routes/booksPrivate/bookForm.js
 * @description
 * Express router for creating and editing book metadata, notes, and bookmarks.
 */
import express from 'express'
import Book from '../../models/Book.js'
import { updateLibraryBook } from '../../controllers/LibraryBooksController.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ Create Book Metadata
//-----------------------------------------------------
/**
 * @route POST /api/books/private
 * @description Create a new book metadata document.
 * @returns {201} Created book object
 * @returns {400} If `meta` is missing
 * @returns {500} On server error
 */
router.post('/', async (req, res) => {
  try {
    if (!req.body.meta) {
      return res.status(400).json({ error: 'No meta provided.' })
    }
    const book = new Book({
      meta: req.body.meta,
      owner: req.user.id,
    })
    await book.save()
    res.status(201).json(book)
  } catch (err) {
    console.error('[CREATE BOOK]', err)
    res.status(500).json({ error: 'Failed to create book metadata' })
  }
})

//-----------------------------------------------------
//------ Update Book Metadata
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id
 * @description Shallow merge update of book metadata fields.
 *              Handled by `updateLibraryBook` controller.
 */
router.patch('/:id', updateLibraryBook)

//-----------------------------------------------------
//------ Notes Endpoints
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/notes
 * @description Add a note to the book.
 * @returns {Array} Updated notes array
 * @returns {400} If text or page missing/invalid
 * @returns {404} If book not found
 * @returns {500} On server error
 */
router.patch('/:id/notes', async (req, res) => {
  try {
    const { text, page } = req.body
    if (!text || typeof page !== 'number') {
      return res.status(400).json({ error: 'Note must include text and page.' })
    }
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $push: { 'flags.notes': { text, page, createdAt: new Date() } } },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.flags.notes)
  } catch (err) {
    console.error('[ADD NOTE]', err)
    res.status(500).json({ error: 'Failed to add note' })
  }
})

/**
 * @route DELETE /api/books/private/:id/notes/:index
 * @description Remove a note by index.
 * @returns {Array} Updated notes array
 * @returns {404} If book not found
 * @returns {500} On server error
 */
router.delete('/:id/notes/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id },
      { $unset: { [`flags.notes.${idx}`]: 1 } }
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $pull: { 'flags.notes': null } },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.flags.notes)
  } catch (err) {
    console.error('[DELETE NOTE]', err)
    res.status(500).json({ error: 'Failed to delete note' })
  }
})

//-----------------------------------------------------
//------ Bookmarks Endpoints
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/bookmarks
 * @description Add a bookmark to the book.
 * @returns {Array} Updated bookmarks array
 * @returns {400} If page missing/invalid
 * @returns {404} If book not found
 * @returns {500} On server error
 */
router.patch('/:id/bookmarks', async (req, res) => {
  try {
    const { label, page } = req.body
    if (typeof page !== 'number') {
      return res.status(400).json({ error: 'Bookmark must include page number.' })
    }
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $push: { 'flags.bookmarks': { page, label } } },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.flags.bookmarks)
  } catch (err) {
    console.error('[ADD BOOKMARK]', err)
    res.status(500).json({ error: 'Failed to add bookmark' })
  }
})

/**
 * @route DELETE /api/books/private/:id/bookmarks/:index
 * @description Remove a bookmark by index.
 * @returns {Array} Updated bookmarks array
 * @returns {404} If book not found
 * @returns {500} On server error
 */
router.delete('/:id/bookmarks/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id },
      { $unset: { [`flags.bookmarks.${idx}`]: 1 } }
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $pull: { 'flags.bookmarks': null } },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.flags.bookmarks)
  } catch (err) {
    console.error('[DELETE BOOKMARK]', err)
    res.status(500).json({ error: 'Failed to delete bookmark' })
  }
})


export default router
