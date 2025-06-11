import test from 'node:test'
import assert from 'assert'
import express from 'express'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'

import deleteFileRouter from '../routes/booksStorage/deleteFile.js'
import Book from '../models/Book.js'

let app
let mongo

// Helper to set authenticated user
const setUser = (id) => (req, _res, next) => {
  req.user = { id }
  next()
}

test('should return 403 when deleting file not owned by user', async () => {
  mongo = await MongoMemoryServer.create()
  await mongoose.connect(mongo.getUri())

  const ownerId = new mongoose.Types.ObjectId()
  const otherId = new mongoose.Types.ObjectId()

  await Book.create({
    owner: ownerId,
    meta: { title: 't' },
    file: { filename: 'file.pdf', fileId: new mongoose.Types.ObjectId() },
  })

  app = express()
  app.use(setUser(otherId.toString()))
  app.use('/api/books/storage', deleteFileRouter)

  const res = await request(app).delete('/api/books/storage/file.pdf')
  assert.strictEqual(res.status, 403)

  await mongoose.disconnect()
  await mongo.stop()
})
