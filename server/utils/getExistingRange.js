import Book from '../models/Book.js'
import { getGridFsBucket } from '../config/gridfs.js'

export async function getExistingRange(filename, start, end) {
  const book = await Book.findOne({ 'file.filename': filename })
  const r = book?.file?.ranges?.find(x => start >= x.start && end <= x.end)

  if (!r) return null
  const coll = getGridFsBucket().s.db.collection('books_files.files')
  const exists = await coll.findOne({ filename: r.filename })
  return exists ? r : null
}