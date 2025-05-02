//-------------------------------------------------------------------
//------ Books read routes 
//--------------------------------------------------------------------

import express from 'express' 
import Book from '../models/Book.js' 

const router = express.Router() 

//------------------------------------------------------------------
//------ Get all books from DB 
//------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ addedAt: -1 })  
    res.status(200).json(books) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching books' }) 
  }
})

//------------------------------------------------------------------
//------ Get single book by ID 
//------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)  
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })  
    }
    res.status(200).json(book) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while fetching book' }) 
  }
})

export default router 
