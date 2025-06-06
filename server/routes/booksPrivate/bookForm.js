/**
 * @file routes/booksPrivate/bookForm.js
 * @description Express router for editing book metadata, notes, and bookmarks.
 */

import express from 'express'
import Book from '../../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// PATCH /api/books/:id – update meta fields (shallow merge)
//------------------------------------------------------------------
router.patch('/:id', async (req, res) => {
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
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[PATCH META]', err)
    res.status(500).json({ error: 'Failed to update book metadata' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/notes – add a note
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// DELETE /api/books/:id/notes/:index – remove a note by index
//------------------------------------------------------------------
router.delete('/:id/notes/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    const pullExpr = { $unset: { [`flags.notes.${idx}`]: 1 } }
    const compact  = { $pull: { 'flags.notes': null } }

    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id },
      pullExpr
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      compact,
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.flags.notes)
  } catch (err) {
    console.error('[DELETE NOTE]', err)
    res.status(500).json({ error: 'Failed to delete note' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/bookmarks – add a bookmark (future use)
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// DELETE /api/books/:id/bookmarks/:index – remove a bookmark by index
//------------------------------------------------------------------
router.delete('/:id/bookmarks/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    const pullExpr = { $unset: { [`flags.bookmarks.${idx}`]: 1 } }
    const compact  = { $pull: { 'flags.bookmarks': null } }

    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id },
      pullExpr
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      compact,
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
