/**
 * @file DeleteBookController.js
 * @description
 * Controller for deleting a book from the system.
 * 1) Verifies user ownership of the book
 * 2) Removes the PDF file from GridFS using fileId
 * 3) Deletes the Book document from MongoDB
 */

import Book from '../models/Book.js'
import { deleteFile } from '../config/gridfs.js'

// -----------------------------------------------------------------------------
// DeleteBook Controller
// -----------------------------------------------------------------------------
export const DeleteBookController = async (req, res) => {
  try {
    const bookId = req.params.id

    // 1) Lookup book and verify ownership
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // 2) Delete file from GridFS (if fileId exists)
    const fileId = book.file?.fileId
    if (fileId) {
      try {
        await deleteFile(fileId)
      } catch (err) {
        console.warn('[GridFS] Failed to delete file:', err)
      }
    }

    // 3) Delete book document
    await book.deleteOne()
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (err) {
    console.error('[DELETE BOOK ERROR]', err)
    res.status(500).json({ error: 'Failed to delete book' })
  }
}
