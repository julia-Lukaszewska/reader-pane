/**
 * @file removeCurrentPageFromFlags.js
 * @description Script to remove deprecated `flags.currentPage` from all books.
 * Run once to clean up schema inconsistencies after migration to `stats.currentPage`.
 * Usage: node server/scripts/removeCurrentPageFromFlags.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Book from '../models/Book.js'

//------------------------------------------------------------------
// Connect to MongoDB
//------------------------------------------------------------------
await mongoose.connect(process.env.MONGO_URI)
console.log('Connected to MongoDB')

//------------------------------------------------------------------
// Remove `flags.currentPage` from all book documents
//------------------------------------------------------------------
const result = await Book.updateMany({}, { $unset: { 'flags.currentPage': 1 } })
console.log(`Removed flags.currentPage from ${result.modifiedCount} books`)


process.exit(0)
