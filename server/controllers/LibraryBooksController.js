/**
 * @file LibraryController.js
 * @description
 * Controller functions for managing the user's library. Provides
 * endpoints to list, retrieve, update and delete books belonging to
 * the authenticated user.
 */

import Book from '../models/Book.js'
import { deleteFile } from '../config/gridfs.js'

// -----------------------------------------------------------------------------
// List all books for the authenticated user
// -----------------------------------------------------------------------------
export const listLibrary = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ 'meta.addedAt': -1 })
    res.json(books)
  } catch (err) {
    console.error('[LIBRARY LIST ERROR]', err)
    res.status(500).json({ error: 'Failed to fetch library' })
  }
}

// -----------------------------------------------------------------------------
// Retrieve a single book by ID for the authenticated user
// -----------------------------------------------------------------------------
export const getLibraryBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.json(book)
  } catch (err) {
    console.error('[LIBRARY GET ERROR]', err)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
}

// -----------------------------------------------------------------------------
// Update meta fields for a book
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Delete a book and its associated file from GridFS
// -----------------------------------------------------------------------------
export const deleteLibraryBook = async (req, res) => {
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
        console.warn('[GRIDFS DELETE ERROR]', err)
      }
    }

    await book.deleteOne()
    res.json({ message: 'Book removed' })
  } catch (err) {
    console.error('[LIBRARY DELETE ERROR]', err)
    res.status(500).json({ error: 'Failed to delete book' })
  }
}
