/**
 * @file routes/booksPrivate/bookSingle.js
 * @description Express router for operations on a single book, including flags and file streaming.
 */

import express from 'express'
import Book from '../../models/Book.js'
import { getPdfBucket, deleteFromBucket } from '../../setupGridFS.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/:id – retrieve a single book (full document)
//------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book)
  } catch (err) {
    console.error('[GET ONE]', err)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
})

//------------------------------------------------------------------
// DELETE /api/books/:id – permanently delete book and associated PDF
//------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    // Delete associated PDF from GridFS
    const fileDeleted = await deleteFromBucket(book.file?.fileId || book.file?.filename)

    // Delete book record
    await Book.deleteOne({ _id: req.params.id, owner: req.user.id })
    res.json({ message: `Book and file deleted${fileDeleted ? '' : ', but no file was found.'}` })
  } catch (err) {
    console.error('[DELETE BOOK]', err)
    res.status(500).json({ error: 'Failed to delete book and file.' })
  }
})

//------------------------------------------------------------------
// DELETE /api/books/:id/file – delete only the file from GridFS
//------------------------------------------------------------------
router.delete('/:id/file', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    const fileDeleted = await deleteFromBucket(book.file?.fileId || book.file?.filename)
    if (!fileDeleted) return res.status(404).json({ error: 'File not found or already deleted' })

    res.json({ message: 'PDF file deleted successfully.' })
  } catch (err) {
    console.error('[DELETE FILE]', err)
    res.status(500).json({ error: 'Failed to delete file.' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id/file – stream PDF directly by bookId
//------------------------------------------------------------------
router.get('/:id/file', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book?.file?.filename) return res.status(404).send('File not found')
const pdfBucket = getPdfBucket()
    const stream = pdfBucket.openDownloadStreamByName(book.file.filename)
    stream.on('error', () => res.status(404).send('File not found'))
    res.set('Content-Type', 'application/pdf')
    stream.pipe(res)
  } catch (err) {
    console.error('[FILE STREAM]', err)
    res.status(500).json({ error: 'Failed to stream PDF' })
  }
})

//------------------------------------------------------------------
// GET /api/books/:id/cache – retrieve rendered pages and ranges
//------------------------------------------------------------------
router.get('/:id/cache', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      'flags.renderedPages flags.renderedRanges'
    ).lean()

    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({
      renderedPages: book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    })
  } catch (err) {
    console.error('[CACHE]', err)
    res.status(500).json({ error: 'Failed to fetch cache data' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/archive – archive book
//------------------------------------------------------------------
router.patch('/:id/archive', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
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
// PATCH /api/books/:id/restore – restore book from archive
//------------------------------------------------------------------
router.patch('/:id/restore', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
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
// PATCH /api/books/:id/favorite – mark as favorite
//------------------------------------------------------------------
router.patch('/:id/favorite', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
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
// PATCH /api/books/:id/unfavorite – remove favorite mark
//------------------------------------------------------------------
router.patch('/:id/unfavorite', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
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

export default router
