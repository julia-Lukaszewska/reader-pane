/**
 * @file books-progress.js
 * @description Express router for managing reading progress and timestamps.
 * Includes:
 * - GET    /api/books/:id/progress         — get reading progress
 * - PATCH  /api/books/:id/progress         — save progress manually
 * - PATCH  /api/books/:id/progress/auto    — auto-save progress
 * - PATCH  /api/books/:id/last-opened      — update lastOpenedAt timestamp
 */

import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

//------------------------------------------------------------------
// GET /api/books/:id/progress — get reading progress
//------------------------------------------------------------------
router.get('/:id/progress', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id }) 
    if (!book) return res.status(404).json({ error: 'Book not found' })

    res.json({
      currentPage: book.stats.currentPage || 1,
      maxVisitedPage: book.stats.maxVisitedPage || 1,
    })
  } catch (err) {
    console.error('[GET PROGRESS] Error:', err)
    res.status(500).json({ error: 'Error while fetching progress' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/progress — save progress manually
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
    console.error('[PATCH PROGRESS] Error:', err)
    res.status(500).json({ error: 'Error while saving progress' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/progress/auto — auto-save progress
//------------------------------------------------------------------
router.patch('/:id/progress/auto', async (req, res) => {
  try {
    const currentPage = req.body?.changes?.stats?.currentPage
    if (!currentPage || currentPage < 1) {
      return res.status(400).json({ error: 'Invalid currentPage value' })
    }

    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id }) // 🔒
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
    console.error('[PATCH AUTO PROGRESS] Error:', err)
    res.status(500).json({ error: 'Error while saving progress automatically' })
  }
})

//------------------------------------------------------------------
// PATCH /api/books/:id/last-opened — update lastOpenedAt timestamp
//------------------------------------------------------------------
router.patch('/:id/last-opened', async (req, res) => {
  try {    const now = new Date()
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, 
      { 'stats.lastOpenedAt': now },
      { new: true }
    )

    if (!book) return res.status(404).json({ error: 'Book not found' })

    res.json({ lastOpenedAt: book.stats.lastOpenedAt })
  } catch (err) {
    console.error('[LAST OPENED] Error:', err)
    res.status(500).json({ error: 'Error while updating lastOpenedAt' })
  }
})

export default router
