//------------------------------------------------------------------
//------ Progress routes for books 
//------------------------------------------------------------------

import express from 'express' 
import Book from '../models/Book.js' 

const router = express.Router() 

//------------------------------------------------------------------
//------ Get reading progress from DB 
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
//------ Save reading progress to DB 
//------------------------------------------------------------------

router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage, totalPages } = req.body  
    const update =   

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
//------ Auto-save progress with percentage 
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

export default router 
