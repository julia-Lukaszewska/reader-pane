//  models/Book.js
import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    // 1) META – static metadata from PDF or user input
    meta: {
      title:           { type: String, required: true },
      author:          { type: String, default: '' },
      subject:         { type: String, default: '' },
      keywords:        { type: [String], default: [] },
      language:        { type: String, default: '' },
      source:          { type: String, enum: ['auto', 'user'], default: 'user' },
      description:     { type: String, default: '' },
      tags:            { type: [String], default: [] },
      cover:           { type: String, default: '' },
      fileUrl:         { type: String, required: true },
      totalPages:      { type: Number, default: 1, min: 1 },
      publicationDate: { type: Date },
      publishedYear:   { type: Number, default: null },
      genre:           { type: String, default: '' },
      documentType:    { type: String, default: '' },
      addedAt:         { type: Date, default: Date.now },
      collection:      { type: String, default: '' },
    },

    // 2) FLAGS – user-defined states and settings
    flags: {
      isArchived:   { type: Boolean, default: false },
      isFavorited:  { type: Boolean, default: false },
      isDownloaded: { type: Boolean, default: false },

      renderedPages:  { type: [Number], default: [] }, // readonly
      renderedRanges: {
        type: [
          {
            start: { type: Number, required: true },
            end:   { type: Number, required: true },
          },
        ],
        default: [],
      },

      bookmarks: {
        type: [
          {
            page:  Number,
            label: String,
          },
        ],
        default: [],
      },

      rating: { type: Number, default: 0 },

      notes: {
        type: [
          {
            text:      String,
            page:      Number,
            createdAt: { type: Date, default: Date.now },
          },
        ],
        default: [],
      },
    },

    // 3) STATS – tracking and system-generated state
    stats: {
      lastOpenedAt:   { type: Date, default: null },
      currentPage:    { type: Number, default: 1 },
      maxVisitedPage: { type: Number, default: 1 },
      isCompleted:    { type: Boolean, default: false },
    },
  },
  { timestamps: true }
)

// Sorting used in GET /api/books
bookSchema.index({ 'meta.addedAt': -1 })

export default mongoose.models.Book || mongoose.model('Book', bookSchema)
