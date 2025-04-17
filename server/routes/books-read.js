//==================================================================
// books-read.js – Routes for reading and fetching books from DB //#PL: 📘 books-read.js – trasy do pobierania książek z bazy danych #/
//==================================================================

import express from 'express' //#PL: 🔹 Express do obsługi tras backendowych #/
import Book from '../models/Book.js' //#PL: 🔹 Model książki z MongoDB #/

const router = express.Router() //#PL: 🔹 Mini-serwer do obsługi tras (GET, POST, itd.) #/

//------------------------------------------------------------------
//------ Get all books from DB //#PL: 📚 Pobierz wszystkie książki z bazy danych #/
//------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ addedAt: -1 })  
    res.status(200).json(books) // Return all books (HTTP 200 – OK)  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching books' }) // Error handling  
  }
})

//------------------------------------------------------------------
//------ Get single book by ID //#PL: 📖 Pobierz pojedynczą książkę po ID #/
//------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)  
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })  
    }
    res.status(200).json(book) // Return the book (HTTP 200 – OK)  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching book' }) // Error handling  
  }
})

export default router //#PL: 📤 Eksport routera #/
