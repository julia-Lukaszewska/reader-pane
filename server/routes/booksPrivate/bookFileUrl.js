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

  // 🔹 Przygotuj dane do odpowiedzi
  const body = JSON.stringify({
    fileUrl: `/api/books/storage/${encodeURIComponent(book.file.filename)}`,
    file: book.file,
  })

  // 🔹 Oblicz ETag z danych odpowiedzi
  const etag = crypto.createHash('md5').update(body).digest('hex')
  const clientETag = req.headers['if-none-match']

  // 🔹 Jeśli klient ma identyczny ETag → zwróć 304
  if (clientETag === etag) {
    return res.status(304).end()
  }

  // 🔹 Ustaw ETag i Cache-Control
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, must-revalidate')

  return res.status(200).json(JSON.parse(body))
})

export default router
