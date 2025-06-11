/**
 * @file delete-orphaned-books.js
 * @description Utility script to remove books from MongoDB whose fileUrl or cover point to non-existent files.
 * Used to clean up database entries when files have been deleted manually from /uploads.
 * 
 * Run with:
 * - npm run delete:orphans   → permanently delete orphaned book entries
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Book from '../models/Book.js'

dotenv.config()

//------------------------------------------------------------------
// Resolve __dirname for ES modules
//------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//------------------------------------------------------------------
// Define uploads folder path
//------------------------------------------------------------------
const uploadsDir = path.join(__dirname, '..', 'uploads')

//------------------------------------------------------------------
// Main cleaner function
//------------------------------------------------------------------
const deleteOrphanedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    const books = await Book.find()
    let deletedCount = 0

    for (const book of books) {
      const filePath = path.join(uploadsDir, path.basename(book.meta?.fileUrl || ''))
      const coverPath = book.meta?.cover ? path.join(uploadsDir, path.basename(book.meta.cover)) : null

      const fileExists = fs.existsSync(filePath)
      const coverExists = coverPath ? fs.existsSync(coverPath) : true

      if (!fileExists || !coverExists) {
        await book.deleteOne()
        console.log(`Deleted orphaned book: ${book.meta?.title || '[no title]'}`)
        deletedCount++
      }
    }

    console.log(`Cleanup complete. Total deleted: ${deletedCount}`)
    process.exit(0)
  } catch (err) {
    console.error('Cleanup failed:', err)
    process.exit(1)
  }
}

deleteOrphanedBooks()
