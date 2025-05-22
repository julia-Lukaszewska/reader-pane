/**
 * @file clean-uploads.js
 * @description Utility script to remove unused files from the /uploads directory.
 * It compares actual files on disk with those referenced in the database (Book.meta.fileUrl).
 * Run with: npm run clean
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
const uploadsDir = path.join(__dirname, 'uploads')

//------------------------------------------------------------------
// Main cleaner function
//------------------------------------------------------------------
const cleanUploads = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    const books = await Book.find()
    const usedFiles = new Set(books.map((book) => path.basename(book.meta.fileUrl)))

    const filesInFolder = fs.readdirSync(uploadsDir)
    const unusedFiles = filesInFolder.filter((file) => !usedFiles.has(file))

    for (const file of unusedFiles) {
      const filePath = path.join(uploadsDir, file)
      fs.unlinkSync(filePath)
      console.log(`🗑 Deleted unused file: ${file}`)
    }

    console.log('✅ Cleanup complete')
    process.exit(0)
  } catch (err) {
    console.error('❌ Cleanup failed:', err)
    process.exit(1)
  }
}

cleanUploads()
