import express from 'express'
import multer from 'multer'
import path from 'path'
import Book from '../models/Book.js'

const router = express.Router()

// ➕ Konfiguracja multer – folder 'uploads/' + oryginalna nazwa pliku
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
})
const upload = multer({ storage })

//------------------------------------------------------------------
//------ Upload a new book (file + metadata) 
//------------------------------------------------------------------

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, author, totalPages } = req.body

    if (!req.file || !title || !author || !totalPages) {
      return res.status(400).json({ error: 'Missing fields or file' })
    }

    const fileUrl = `/uploads/${req.file.filename}`

    const book = new Book({
      title,
      author,
      totalPages,
      fileUrl,
      addedAt: new Date(),
      currentPage: 1,
      progress: 0,
    })

    await book.save()
    res.status(201).json(book)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while uploading the book' })
  }
})

export default router
