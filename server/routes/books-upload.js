//-----------------------------------------------------------------------------
// books-upload.js – Configure Multer and upload route 
//-----------------------------------------------------------------------------
import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import Book from '../models/Book.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })
const router = express.Router()

//-----------------------------------------------------------------------------
// Upload book to server with totalPages and currentPage
//-----------------------------------------------------------------------------
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Walidacja danych z frontu
    const totalPages = parseInt(req.body.totalPages, 10)
    if (!req.file || isNaN(totalPages)) {
      return res.status(400).json({ error: 'Brakuje pliku lub liczby stron' })
    }

    // Budowa URL do pliku
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`

    // Nowy wpis książki
    const newBook = new Book({
      title: req.file.originalname,
      fileUrl,
      totalPages,
      currentPage: 1,
      progress: 0,
      isArchived: false,
      isFavorited:false
    })

    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: `Error while uploading the file: ${err.message}` })
  }
})

//-----------------------------------------------------------------------------
// Serve uploaded files
//-----------------------------------------------------------------------------
router.use('/files', express.static(path.join(__dirname, '../uploads')))

export default router
