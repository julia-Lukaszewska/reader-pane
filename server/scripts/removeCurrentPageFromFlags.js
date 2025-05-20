// server/scripts/removeCurrentPageFromFlags.js

import 'dotenv/config'        // load .env
import mongoose from 'mongoose'
import Book from '../models/Book.js'

await mongoose.connect(process.env.MONGO_URI)

await Book.updateMany({}, { $unset: { 'flags.currentPage': 1 } })

process.exit(0)
