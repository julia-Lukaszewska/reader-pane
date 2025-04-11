import express from 'express' //#PL: 🔹 Express to biblioteka, która pomaga stworzyć backend (serwer). 📦 Dzięki niej możesz pisać takie rzeczy jak router.get(...). #/
import multer from 'multer' //#PL: 🔹 Multer to pomocnik do przyjmowania plików (np. PDF). 📂 Dzięki niemu backend może przyjąć plik i zapisać go np. do folderu uploads. #/
import path from 'path' //#PL: 🔹 Path to narzędzie z Node.js. 📁 Pomaga w pisaniu ścieżek do folderów i plików (np. żeby wiedzieć, gdzie coś zapisać albo usunąć). #/
import fs from 'fs' //#PL: 🔹 FS (file system) – biblioteka do zarządzania plikami. 🗑️ Dzięki niej możesz np. usunąć plik z dysku. #/
import { fileURLToPath } from 'url' //#PL: 🔹 Potrzebne, żeby w środowisku ES Modules poprawnie dostać ścieżkę pliku. 📌 Używane później do ustalenia, gdzie jest folder uploads. #/
import Book from '../models/Book.js' //#PL: 🔹 To Twój model książki z bazy danych MongoDB. 📚 Dzięki niemu możesz tworzyć, pobierać i usuwać książki w bazie. #/

const router = express.Router() //#PL: 🔹 To tworzy specjalny „mini-serwer” do zarządzania trasami (czyli tymi funkcjami: .get, .post itd.). #/

//--------------------------------------------
//------ Multer configuration for file uploads  
//--------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)  
  },
})

const upload = multer({ storage })  

//------------------------------------------------------------------
//------ Upload book to server  
//------------------------------------------------------------------

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = `http://localhost:${process.env.PORT}/files/${req.file.filename}`  

    const newBook = new Book({
      title: req.file.originalname,  
      fileUrl,  
    })
    const savedBook = await newBook.save()  

    res.status(201).json(savedBook) // Return the saved book (HTTP 201 – Created)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: `Error while uploading the file: ${err.message}` }) // Error handling if something goes wrong
  }
})

//------------------------------------------------------------------
//------ Get books from server  
//------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ addedAt: -1 })  
    res.status(200).json(books) // Return the list of books (HTTP 200 – OK)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching books' }) // Error handling
  }
})

//------------------------------------------------------------------
//------ Move book to archive  
//------------------------------------------------------------------

router.patch('/:id/delete', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },  
      { new: true }  
    )
    res.status(200).json(book) // Return the updated book (HTTP 200 – OK)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while moving the book to archive' }) // Error handling
  }
})

//------------------------------------------------------------------
//------ Restore book from archive  
//------------------------------------------------------------------

router.patch('/:id/restore', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },  
      { new: true }  
    )
    res.status(200).json(book) // Return the restored book (HTTP 200 – OK)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while restoring the book' }) // Error handling
  }
})

//------------------------------------------------------------------
//------ Delete book  
//------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)  
    if (!book) {
      return res.status(404).json({ message: 'The book does not exist' }) // If book not found, return 404
    }

    const fileName = path.basename(book.fileUrl)  

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const filePath = path.join(__dirname, '../uploads', fileName)  
    console.log('Attempting to delete file:', filePath) // For debugging

    // (Optional) You could delete the file here using fs.unlink

    await Book.findByIdAndDelete(req.params.id)  

    res
      .status(200)
      .json({ message: 'The book and the file have been permanently deleted' }) // Return success message
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while deleting the book' }) // Error handling
  }
})

export default router
