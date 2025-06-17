/**
 * @file routes/booksPrivate/bookStats.js
 * @description Express router for managing book stats (progress and timestamps).
 */
import express from 'express'
import Book from '../../models/Book.js'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ GET Live Stats
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id/live
 * @description Get mutable stats (e.g., currentPage, maxVisitedPage, lastOpenedAt).
 */
router.get('/:id/live', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { stats: 1 }
    ).lean()
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.stats)
  } catch (err) {
    console.error('[LIVE GET]', err)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

//-----------------------------------------------------
//------ PATCH Live Stats
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/live
 * @description Update mutable stats.
 */
router.patch('/:id/live', async (req, res) => {
  try {
    if (!req.body.stats) {
      return res.status(400).json({ error: 'No stats provided.' })
    }
    const updates = {}
    for (const [key, value] of Object.entries(req.body.stats)) {
      updates[`stats.${key}`] = value
    }
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json(book.stats)
  } catch (err) {
    console.error('[LIVE PATCH]', err)
    res.status(500).json({ error: 'Failed to update stats' })
  }
})

//-----------------------------------------------------
//------ GET Reading Progress
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id/progress
 * @description Get reading progress (currentPage, maxVisitedPage).
 */
router.get('/:id/progress', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { 'stats.currentPage': 1, 'stats.maxVisitedPage': 1 }
    ).lean()
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({
      currentPage: book.stats.currentPage || 1,
      maxVisitedPage: book.stats.maxVisitedPage || 1,
    })
  } catch (err) {
    console.error('[GET PROGRESS]', err)
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
})

//-----------------------------------------------------
//------ PATCH Reading Progress
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/progress
 * @description Save progress manually.
 */
router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage } = req.body
    if (!currentPage || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid currentPage value' })
    }
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    book.stats = book.stats || {}
    book.stats.currentPage = currentPage
    book.stats.maxVisitedPage = Math.max(currentPage, book.stats.maxVisitedPage || 1)
    await book.save()

    res.json({
      currentPage: book.stats.currentPage,
      maxVisitedPage: book.stats.maxVisitedPage,
    })
  } catch (err) {
    console.error('[PATCH PROGRESS]', err)
    res.status(500).json({ error: 'Failed to save progress' })
  }
})

//-----------------------------------------------------
//------ PATCH Auto-Save Progress
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/progress/auto
 * @description Auto-save progress (background/save-on-exit).
 */
router.patch('/:id/progress/auto', async (req, res) => {
  try {
    const currentPage = req.body?.changes?.stats?.currentPage
    if (!currentPage || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid currentPage value' })
    }
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    book.stats = book.stats || {}
    book.stats.currentPage = currentPage
    book.stats.maxVisitedPage = Math.max(currentPage, book.stats.maxVisitedPage || 1)
    await book.save()

    res.json({
      currentPage: book.stats.currentPage,
      maxVisitedPage: book.stats.maxVisitedPage,
    })
  } catch (err) {
    console.error('[PATCH AUTO PROGRESS]', err)
    res.status(500).json({ error: 'Failed to auto-save progress' })
  }
})

//-----------------------------------------------------
//------ PATCH Last Opened Timestamp
//-----------------------------------------------------
/**
 * @route PATCH /api/books/private/:id/last-opened
 * @description Update lastOpenedAt timestamp.
 */
router.patch('/:id/last-opened', async (req, res) => {
  try {
    const now = new Date()
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { 'stats.lastOpenedAt': now },
      { new: true }
    )
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({ lastOpenedAt: book.stats.lastOpenedAt })
  } catch (err) {
    console.error('[PATCH LAST OPENED]', err)
    res.status(500).json({ error: 'Failed to update lastOpenedAt' })
  }
})

export default router
