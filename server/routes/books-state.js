//------------------------------------------------------------------
//------ Manage book state: delete, archive, restore 
//------------------------------------------------------------------

import express from 'express' 
import Book from '../models/Book.js' 
import path from 'path' 
import fs from 'fs' 
import { fileURLToPath } from 'url' 

const router = express.Router() 

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
    res.status(200).json(book) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while moving the book to archive' }) 
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
    res.status(200).json(book)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while restoring the book' }) 
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
      console.log(' Deleted file:', fileName)
    } else {
      console.log(' The file does not exist in the "uploads" folder')
    }

    await Book.findByIdAndDelete(req.params.id)  
    res.status(200).json({ message: 'Book and file permanently deleted' }) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error while deleting the book' }) 
  }
})

export default router 
