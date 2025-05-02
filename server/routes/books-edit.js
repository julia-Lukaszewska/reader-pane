// server/routes/books-edit.js
import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

//-----------------------------------------------------------------------------
//------PATCH /api/books/:id 
//-----------------------------------------------------------------------------
router.patch('/:id', async (req, res) => {
  
  const allowed = [
    'title',
    'author',
    'description',
    'tags',
    'rating',
    'currentPage',
    'isFavorited',
    'isArchived',
  ]
  const updates = Object.keys(req.body)
  const isValid = updates.every((f) => allowed.includes(f))
  if (!isValid) return res.status(400).send({ error: 'field not allowed!' })

  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send({ error: 'Book not found' })

    updates.forEach((f) => (book[f] = req.body[f]))
    await book.save()
    res.send(book)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router
