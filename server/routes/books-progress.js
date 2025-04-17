//------------------------------------------------------------------
//------ Progress routes for books //#PL: 📊 Trasy do obsługi postępu czytania #/
//------------------------------------------------------------------

import express from 'express' //#PL: 🔹 Express do tworzenia tras API #/
import Book from '../models/Book.js' //#PL: 🔹 Model MongoDB dla książki #/

const router = express.Router() //#PL: 🔹 Router Express do tworzenia ścieżek #/

//------------------------------------------------------------------
//------ Get reading progress from DB //#PL: 📥 Pobierz aktualny postęp czytania #/
//------------------------------------------------------------------

router.get('/:id/progress', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)  
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })  
    }
    res.json({ currentPage: book.currentPage || 1 })  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching progress' })  
  }
})

//------------------------------------------------------------------
//------ Save reading progress to DB //#PL: 💾 Zapisz aktualny postęp czytania #/
//------------------------------------------------------------------

router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage, totalPages } = req.body  
    const update = {}  

    if (currentPage && currentPage >= 1) update.currentPage = currentPage
    if (totalPages && totalPages >= 1) update.totalPages = totalPages

    const book = await Book.findByIdAndUpdate(req.params.id, update, {
      new: true,  
    })

    if (!book) {
      return res.status(404).json({ error: 'Book not found' })  
    }

    res.json({ currentPage: book.currentPage, totalPages: book.totalPages })  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while saving progress' })  
  }
})

//------------------------------------------------------------------
//------ Auto-save progress with percentage //#PL: 🔄 Oblicz i zapisz % postępu #/
//------------------------------------------------------------------

router.patch('/:id/progress/auto', async (req, res) => {
  try {
    const { currentPage, totalPages } = req.body  

    if (!currentPage || !totalPages || currentPage < 1 || totalPages < 1) {
      return res
        .status(400)
        .json({ error: 'Invalid currentPage or totalPages' })  
    }

    const progress = Math.min(Math.round((currentPage / totalPages) * 100), 100)  

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { currentPage, totalPages, progress },  
      { new: true }  
    )

    if (!book) {
      return res.status(404).json({ error: 'Book not found' })  
    }

    res.json({
      currentPage: book.currentPage,
      totalPages: book.totalPages,
      progress: book.progress,
    })  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while updating progress' })  
  }
})

export default router //#PL: 📤 Eksport routera do użycia w aplikacji #/
