/**
 * @file routes/booksPrivate/bookStats.js
 * @description Express router for managing book stats (progress and timestamps).
 */

import express from 'express'
import Book from '../../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/:id/live – get mutable stats (e.g., currentPage, maxVisitedPage, lastOpenedAt)
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// PATCH /api/books/:id/live – update mutable stats
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// GET /api/books/:id/progress – get reading progress (currentPage, maxVisitedPage)
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// PATCH /api/books/:id/progress – save progress manually
//------------------------------------------------------------------
router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage } = req.body
    if (!currentPage || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid currentPage value' })
    }
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    if (!book.stats) book.stats = {}
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

//------------------------------------------------------------------
// PATCH /api/books/:id/progress/auto – auto-save progress
//------------------------------------------------------------------
router.patch('/:id/progress/auto', async (req, res) => {
  try {
    const currentPage = req.body?.changes?.stats?.currentPage
    if (!currentPage || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid currentPage value' })
    }
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id })
    if (!book) return res.status(404).json({ error: 'Book not found' })

    if (!book.stats) book.stats = {}
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

//------------------------------------------------------------------
// PATCH /api/books/:id/last-opened – update lastOpenedAt timestamp
//------------------------------------------------------------------
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
