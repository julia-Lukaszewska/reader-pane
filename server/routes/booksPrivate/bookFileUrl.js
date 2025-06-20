// routes/booksPrivate/bookFileUrl.js
import express from 'express'
import Books from '../../models/Book.js'
 
import crypto from 'crypto'

const router = express.Router()

// GET /api/books/private/:id/file-url
router.get('/:id/file-url', async (req, res) => {
  const book = await Books.findById(req.params.id)
  if (!book || !book.file?.filename) {
    return res.status(404).json({ message: 'No file for this book' })
  }

  const body = JSON.stringify({
    fileUrl: `/api/books/storage/${encodeURIComponent(book.file.filename)}`,
    file: book.file,
  })

  const etag = crypto.createHash('md5').update(body).digest('hex')
 

  res.set('ETag', etag)
  res.set('Cache-Control', 'private, must-revalidate')

  return res.status(200).json(JSON.parse(body))
})

export default router
