/**
 * @file routes/booksStorage/deleteFile.js
 * @description Express router for deleting a PDF file from GridFS.
 */
import express from 'express'
import Book from '../../models/Book.js'
import { deleteFile } from '../../config/gridfs.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ DELETE /api/books/storage/:filename
//-----------------------------------------------------
/**
 * @route DELETE /api/books/storage/:filename
 * @description Deletes a PDF file from GridFS if it exists and the authenticated user owns it.
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
router.delete('/:filename', async (req, res) => {
  try {
    // Verify file exists and belongs to the user
    const book = await Book.findOne({ 'file.filename': req.params.filename })
    if (!book) {
      return res.status(404).json({ error: 'File not found' })
    }
    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // Attempt deletion from GridFS
    const deleted = await deleteFile(req.params.filename)
    if (!deleted) {
      return res.status(404).json({ error: 'File not found' })
    }

    return res.json({ success: true })
  } catch (err) {
    console.error('[DELETE FILE]', err)
    return res.status(500).json({ error: 'Failed to delete file' })
  }
})

// na końcu pliku:
export const deleteFileRouter = router
