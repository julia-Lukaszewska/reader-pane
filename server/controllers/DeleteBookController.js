/**
 * @file DeleteBookController.js
 * @description
 * Controller for deleting a book and its associated PDF from GridFS.
 * 1) Verifies user ownership
 * 2) Deletes file from GridFS
 * 3) Deletes book document from MongoDB
 */

import Book from '../models/Book.js'
import { deleteFile } from '../config/gridfs.js'

export const DeleteBookController = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    const fileId = book.file?.fileId
    if (fileId) {
      try {
        await deleteFile(fileId)
      } catch (err) {
        console.warn('[GridFS DELETE ERROR]', err)
      }
    }

    await book.deleteOne()
    res.json({ message: 'Book removed' })
  } catch (err) {
    console.error('[DELETE BOOK ERROR]', err)
    res.status(500).json({ error: 'Failed to delete book' })
  }
}
