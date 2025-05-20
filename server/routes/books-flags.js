// src/routes/books-flags.js
import express from 'express'
import Book from '../models/Book.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const router = express.Router()

//------------------------------------------------------------------
// PATCH /api/books/:id/archive — Move book to archive
//------------------------------------------------------------------
router.patch('/:id/archive', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'flags.isArchived': true },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[ARCHIVE]', err)
    res.status(500).json({ error: 'Failed to archive the book.' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/restore — Restore book from archive
//------------------------------------------------------------------
router.patch('/:id/restore', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'flags.isArchived': false },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[RESTORE]', err)
    res.status(500).json({ error: 'Failed to restore the book.' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/favorite — Mark book as favorite
//------------------------------------------------------------------
router.patch('/:id/favorite', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'flags.isFavorited': true },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[FAVORITE]', err)
    res.status(500).json({ error: 'Failed to favorite the book.' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/unfavorite — Unmark book as favorite
//------------------------------------------------------------------
router.patch('/:id/unfavorite', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'flags.isFavorited': false },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[UNFAVORITE]', err)
    res.status(500).json({ error: 'Failed to unfavorite the book.' })
  }
})

//------------------------------------------------------------------
// DELETE /api/books/:id — Permanently delete book and file
//------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    // Delete file from disk
    const fileUrl  = typeof book.meta.fileUrl === 'string' ? book.meta.fileUrl : null
    const fileName = fileUrl ? path.basename(fileUrl) : null
    const __filename = fileURLToPath(import.meta.url)
    const __dirname  = path.dirname(__filename)
    const filePath   = path.join(__dirname, '../uploads', fileName)

    if (fileName && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    // Delete book from database
    await Book.findByIdAndDelete(req.params.id)
    res.json({ message: 'Book and file permanently deleted.' })
  } catch (err) {
    console.error('[DELETE BOOK]', err)
    res.status(500).json({ error: 'Failed to delete the book.' })
  }
})

export default router
