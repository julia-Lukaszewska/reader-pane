import express from 'express'
import Book from '../../models/Book.js'

const router = express.Router()

router.get('/:id/ranges', async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
     { 'file.ranges': 1, 'file.rangeSize': 1 }

    ).lean()
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({
  ranges: book.file?.ranges ?? [],
  rangeSize: book.file?.rangeSize ?? 24,
})

  } catch (err) {
    console.error('[RANGES]', err)
    res.status(500).json({ error: 'Failed to fetch ranges' })
  }
})

export default router