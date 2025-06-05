/**
 * @file delete-books-missing-gridfs.js
 * @description
 * Deletes Book documents if their corresponding PDF is missing from GridFS.
 * Intended for cleaning up legacy entries after switching to GridFS storage.
 *
 * Usage:
 *   BRANCH=main node server/scripts/delete-books-missing-gridfs.js
 */

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import Book from '../models/Book.js'

// -----------------------------------------------------------------------------
// Load environment variables from correct .env file (e.g. .env.server.main)
// -----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const branch = process.env.BRANCH || 'dev'

dotenv.config({
  path: path.join(__dirname, '..', '..', 'env', `.env.server.${branch}`)
})

const uri = process.env.MONGO_URI
if (!uri) {
  console.error('[ERROR] MONGO_URI is missing in env file.')
  process.exit(1)
}

console.log(`[Clean] Using branch: ${branch}`)

// -----------------------------------------------------------------------------
// Connect to MongoDB with both Mongoose and native driver (for GridFS check)
// -----------------------------------------------------------------------------

await mongoose.connect(uri)
const client = new MongoClient(uri)
await client.connect()

const db = client.db()
const gridfsFiles = db.collection('pdfs.files')

console.log('Connected to MongoDB')

// -----------------------------------------------------------------------------
// Loop over Book documents and delete those without matching file in GridFS
// -----------------------------------------------------------------------------

let deleted = 0
const books = await Book.find()

for (const book of books) {
  const fileKey = book.meta?.fileKey
  if (!fileKey) continue

  const exists = await gridfsFiles.findOne({ filename: fileKey })
  if (!exists) {
    console.log(` Missing in GridFS → ${fileKey} — deleting "${book.meta.title}"`)
    await book.deleteOne()
    deleted++
  }
}

console.log(` Done. Deleted ${deleted} orphaned books.`)

// -----------------------------------------------------------------------------
// Close connections and exit
// -----------------------------------------------------------------------------

await mongoose.disconnect()
await client.close()
process.exit(0)
