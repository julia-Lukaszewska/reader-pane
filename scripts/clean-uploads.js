/**
 * @file clean-uploads.js
 * @description Utility script to remove unused files from the /uploads directory.
 * It compares actual files on disk with those referenced in the database (Book.meta.fileUrl and Book.meta.cover).
 * Run with: 
 * - npm run clean       → real cleanup
 * - npm run clean:dry   → dry run (only log, don't delete)
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

// Optional: files that should never be deleted
const safeList = ['pdf.worker.min.js']

// Enable dry-run mode if flag passed
const isDryRun = process.argv.includes('--dry-run')

//------------------------------------------------------------------
// Main cleaner function
//------------------------------------------------------------------
const cleanUploads = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    const books = await Book.find()

    const usedFiles = new Set(
      books
        .flatMap((book) => [book.meta?.fileUrl, book.meta?.cover])
        .filter(Boolean)
        .map((url) => path.basename(url))
    )

    const filesInFolder = fs.readdirSync(uploadsDir)

    const unusedFiles = filesInFolder.filter(
      (file) => !usedFiles.has(file) && !safeList.includes(file)
    )

    for (const file of unusedFiles) {
      const filePath = path.join(uploadsDir, file)

      if (isDryRun) {
        console.log(`DRY RUN: Would delete → ${file}`)
      } else {
        fs.unlinkSync(filePath)
        console.log(` Deleted unused file: ${file}`)
      }
    }

   console.log(isDryRun ? ' Dry run complete' : ' Cleanup complete')
    process.exit(0)
  } catch (err) {
    console.error(' Cleanup failed:', err)
    process.exit(1)
  }
}

cleanUploads()
