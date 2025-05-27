/**
 * @file books-edit.js
 * @description Express router for editing book data (meta, flags, stats).
 * Includes endpoints for:
 * - PATCH /:id — shallow merge updates to meta, flags, or stats
 * - PATCH /:id/notes — add a note to a book
 * - DELETE /:id/notes/:index — remove note by index
 * - PATCH /:id/bookmarks — add a bookmark
 * - DELETE /:id/bookmarks/:index — remove bookmark by index
 */

import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// PATCH /api/books/:id – update meta, flags, stats (shallow merge)
//------------------------------------------------------------------
router.patch('/:id', async (req, res) => {
  try {
    const updates = {}

    if (req.body.meta) {
      for (const [key, value] of Object.entries(req.body.meta)) {
        updates[`meta.${key}`] = value
      }
    }

    if (req.body.flags) {
      for (const [key, value] of Object.entries(req.body.flags)) {
        updates[`flags.${key}`] = value
      }
    }

    if (req.body.stats) {
      for (const [key, value] of Object.entries(req.body.stats)) {
        updates[`stats.${key}`] = value
      }
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: 'No meta, flags, or stats provided.' })
    }

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      { $set: updates },
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found.' })
    res.json(book)
  } catch (err) {
    console.error('[PATCH /:id]', err)
    res.status(500).json({ error: 'Failed to update the book.' })
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
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      { $push: { 'flags.notes': { text, page, createdAt: new Date() } } },
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found.' })
    res.json(book.flags.notes)
  } catch (err) {
    console.error('[ADD NOTE]', err)
    res.status(500).json({ error: 'Failed to add note.' })
  }
})

//------------------------------------------------------------------
// DELETE /api/books/:id/notes/:index – remove a note
//------------------------------------------------------------------
router.delete('/:id/notes/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    const pullExpr = { $unset: { [`flags.notes.${idx}`]: 1 } }
    const compact = { $pull: { 'flags.notes': null } }

    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      pullExpr
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      compact,
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found.' })
    res.json(book.flags.notes)
  } catch (err) {
    console.error('[DEL NOTE]', err)
    res.status(500).json({ error: 'Failed to delete note.' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/bookmarks – add a bookmark
//------------------------------------------------------------------
router.patch('/:id/bookmarks', async (req, res) => {
  try {
    const { label, page } = req.body
    if (!page) {
      return res.status(400).json({ error: 'Bookmark must include page number.' })
    }

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      { $push: { 'flags.bookmarks': { page, label } } },
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found.' })
    res.json(book.flags.bookmarks)
  } catch (err) {
    console.error('[ADD BM]', err)
    res.status(500).json({ error: 'Failed to add bookmark.' })
  }
})

//------------------------------------------------------------------
// DELETE /api/books/:id/bookmarks/:index – remove a bookmark
//------------------------------------------------------------------
router.delete('/:id/bookmarks/:index', async (req, res) => {
  try {
    const idx = Number(req.params.index)
    const pullExpr = { $unset: { [`flags.bookmarks.${idx}`]: 1 } }
    const compact = { $pull: { 'flags.bookmarks': null } }

    await Book.updateOne(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      pullExpr
    )
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, //  enforce ownership
      compact,
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found.' })
    res.json(book.flags.bookmarks)
  } catch (err) {
    console.error('[DEL BM]', err)
    res.status(500).json({ error: 'Failed to delete bookmark.' })
  }
})

export default router
