/**
 * @file sync-helpers.js
 * @description Script to synchronize the /uploads folder with the MongoDB database.
 * Automatically removes:
 * - Orphaned database entries whose fileUrl or cover no longer exist on disk.
 * - Unused files from the /uploads folder that are not referenced by any book.
 * 
 * Usage:
 * - node server/scripts/sync-helpers.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Book from '../models/Book.js'

//------------------------------------------------------------------
// Resolve __dirname for ES modules
//------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//------------------------------------------------------------------
// Define uploads folder path and optional whitelist
//------------------------------------------------------------------
const uploadsDir = path.join(__dirname, '..', 'uploads')
const safeList = ['pdf.worker.min.js']

//------------------------------------------------------------------
// Connect to MongoDB
//------------------------------------------------------------------
await mongoose.connect(process.env.MONGO_URI)
console.log('Connected to MongoDB')

//------------------------------------------------------------------
// Load all books from the database
//------------------------------------------------------------------
const books = await Book.find()

//------------------------------------------------------------------
// Step 1: Delete orphaned books from database
//------------------------------------------------------------------
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

console.log(`Step 1 complete. Total orphaned books deleted: ${deletedCount}`)

//------------------------------------------------------------------
// Step 2: Delete unused files from uploads folder
//------------------------------------------------------------------
const usedFiles = new Set(
  books
    .flatMap((book) => [book.meta?.fileUrl, book.meta?.cover])
    .filter(Boolean)
    .map((url) => path.basename(url))
)

const filesInFolder = fs.readdirSync(uploadsDir)

let deletedFilesCount = 0

for (const file of filesInFolder) {
  const isUsed = usedFiles.has(file)
  const isSafe = safeList.includes(file)
  if (!isUsed && !isSafe) {
    fs.unlinkSync(path.join(uploadsDir, file))
    console.log(`Deleted unused file: ${file}`)
    deletedFilesCount++
  }
}

console.log(`Step 2 complete. Total unused files deleted: ${deletedFilesCount}`)

process.exit(0)
