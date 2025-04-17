//------------------------------------------------------------------
//------ Manage book state: delete, archive, restore //#PL: 📦 Zarządzanie stanem książki – usuwanie, archiwizacja, przywracanie #/
//------------------------------------------------------------------

import express from 'express' //#PL: 🔹 Express – tworzy serwer i obsługuje trasy #/
import Book from '../models/Book.js' //#PL: 🔹 Model książki z MongoDB #/
import path from 'path' //#PL: 📁 Narzędzie Node.js do pracy ze ścieżkami plików #/
import fs from 'fs' //#PL: 🗑️ Narzędzie do operacji na plikach (np. usuwanie) #/
import { fileURLToPath } from 'url' //#PL: 📌 Uzyskanie __dirname w środowisku ES Modules #/

const router = express.Router() //#PL: 🔹 Tworzy router Expressa #/

//------------------------------------------------------------------
//------ Move book to archive //#PL: 🗂️ Przeniesienie książki do archiwum (isDeleted = true) #/
//------------------------------------------------------------------

router.patch('/:id/delete', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },  
      { new: true }  
    )
    res.status(200).json(book) // Return updated book (HTTP 200 – OK)
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
    res.status(200).json(book) // Return restored book
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while restoring the book' }) // Error handling
  }
})

//------------------------------------------------------------------
//------ Permanently delete book and file  
//------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)  
    if (!book) {
      return res.status(404).json({ message: 'The book does not exist' })  
    }

    const fileName = path.basename(book.fileUrl)  
    const __filename = fileURLToPath(import.meta.url)  
    const __dirname = path.dirname(__filename)  
    const filePath = path.join(__dirname, '../uploads', fileName)  

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)  
      console.log('🧹 Deleted file:', fileName)
    } else {
      console.log('⚠️ The file does not exist in the "uploads" folder')
    }

    await Book.findByIdAndDelete(req.params.id)  
    res.status(200).json({ message: 'Book and file permanently deleted' }) // Success message
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while deleting the book' }) // Error handling
  }
})

export default router //#PL: 📤 Eksport routera do użycia w serwerze głównym #/
