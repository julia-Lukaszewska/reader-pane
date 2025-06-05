/**
 * @file delete-legacy-uploaded-books.js
 * @description Script to delete books whose meta.fileUrl starts with "/uploads/" or has meta.cover set (old storage).
 * Run with: node server/scripts/delete-legacy-uploaded-books.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Book from '../models/Book.js'

await mongoose.connect(process.env.MONGO_URI)
console.log('Connected to MongoDB')

const books = await Book.find()

let deleted = 0

for (const book of books) {
  const fileUrl = book.meta?.fileUrl || ''
  const hasLegacyFile = fileUrl.includes('/uploads/') || (book.meta?.cover?.length > 0)

  if (hasLegacyFile) {
    await book.deleteOne()
    console.log(`Deleted: ${book.meta?.title || 'No title'} (legacy upload)`)
    deleted++
  }
}

console.log(` Cleanup done. Total legacy books deleted: ${deleted}`)
process.exit(0)
