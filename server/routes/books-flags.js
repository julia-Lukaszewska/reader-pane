/**
 * @file books-flags.js
 * @description Express router for updating book flags and deletion.
 * Includes:
 * - PATCH  /api/books/:id/archive     — archive book
 * - PATCH  /api/books/:id/restore     — restore book
 * - PATCH  /api/books/:id/favorite    — mark as favorite
 * - PATCH  /api/books/:id/unfavorite  — unmark as favorite
 * - DELETE /api/books/:id             — permanently delete book and file
 */ 

import express from 'express'
import Book from '../models/Book.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const router = express.Router()

//------------------------------------------------------------------
// PATCH /api/books/:id/archive — archive book
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
// PATCH /api/books/:id/restore — restore book
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
// PATCH /api/books/:id/favorite — mark as favorite
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
// PATCH /api/books/:id/unfavorite — unmark as favorite
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
// DELETE /api/books/:id — permanently delete book + PDF + cover
//------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const uploadsDir = path.join(__dirname, '../uploads')

      // Delete PDF
    const fileName = book.meta?.fileUrl ? path.basename(book.meta.fileUrl) : null
    const filePath = fileName ? path.join(uploadsDir, fileName) : null
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)

      
    // Delete cover PNG (if exists)
    const coverName = book.meta?.cover ? path.basename(book.meta.cover) : null
    const coverPath = coverName ? path.join(uploadsDir, coverName) : null
    if (coverPath && fs.existsSync(coverPath)) fs.unlinkSync(coverPath)


    // Delete book from database
    await Book.findByIdAndDelete(req.params.id)

     res.json({ message: 'Book, PDF and cover deleted successfully.' })
  } catch (err) {
    console.error('[DELETE BOOK]', err)
    res.status(500).json({ error: 'Failed to delete book and files.' })
  }
})

export default router
