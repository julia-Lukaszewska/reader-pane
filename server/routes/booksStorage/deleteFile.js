/**
 * @file routes/booksStorage/deleteFile.js
 * @description Express router for deleting a PDF file from GridFS.
 */

import express from 'express'
import { deleteFile } from '../../config/gridfs.js'
import Book from '../../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// DELETE /api/books/storage/:filename – delete PDF from GridFS
//------------------------------------------------------------------
router.delete('/:filename', async (req, res) => {
  try {
    const book = await Book.findOne({ 'file.filename': req.params.filename })
    if (!book) {
      return res.status(404).json({ error: 'File not found' })
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const deleted = await deleteFile(req.params.filename)
    if (!deleted) {
      return res.status(404).json({ error: 'File not found' })
    }
    res.json({ success: true })
  } catch (err) {
    console.error('[DELETE FILE]', err)
    res.status(500).json({ error: 'Failed to delete file' })
  }
})

export default router
