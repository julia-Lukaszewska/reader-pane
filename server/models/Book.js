/**
 * @file Book.js
 * @description Mongoose model for Book documents.
 * Defines schema structure for:
 * - meta:      static metadata from PDF or user input
 * - file:      GridFS reference (filename + gridFsId + type)
 * - owner:     user who uploaded the book
 * - flags:     user-controlled states (favorites, notes, bookmarks, etc.)
 * - stats:     system-generated data (progress, last opened, etc.)
 * Used in book upload, querying, progress tracking, and UI display.
 *
 * Naming conventions:
 *   gridFsId   – ObjectId of the file in GridFS (bucket: books_files.files)
 *   filename   – unique filename in GridFS (bucket: books_files.files.filename)
 *   fileType   – type of the file: 'pdf', 'epub', 'audio', etc.
 */

import mongoose from 'mongoose'

// -----------------------------------------------------------------------------
// BOOK SCHEMA
// -----------------------------------------------------------------------------

const bookSchema = new mongoose.Schema(
  {
    // -------------------------------------------------------------------------
    // 1) META – Static metadata from PDF or user input
    // -------------------------------------------------------------------------
    meta: {
      title:           { type: String, required: true },   // Display title
      author:          { type: String, default: '' },
      subject:         { type: String, default: '' },
      keywords:        { type: [String], default: [] },    // Extracted from PDF
      language:        { type: String, default: '' },      // e.g., "en", "pl"
      source:          { type: String, enum: ['auto', 'user'], default: 'user' },
      description:     { type: String, default: '' },
      tags:            { type: [String], default: [] },    // User-assigned tags
      cover:           { type: String, default: '' },      // Base64 image string
      totalPages:      { type: Number, default: 1, min: 1 },
      publicationDate: { type: Date },                     // From PDF or user input
      publishedYear:   { type: Number, default: null },
      genre:           { type: String, default: '' },
      documentType:    { type: String, default: '' },      // e.g., "PDF"
      addedAt:         { type: Date, default: Date.now },
      collection:      { type: String, default: '' },      // Optional group label
    },

    // -------------------------------------------------------------------------
    // 2) FILE – Reference to file stored in GridFS (bucket: books_files)
    // -------------------------------------------------------------------------
    file: {
      filename:  { type: String, required: true },                  // books_files.files.filename
     fileId:   { type: mongoose.Types.ObjectId, required: true },
    },

    // -------------------------------------------------------------------------
    // 3) OWNER – User who uploaded the book
    // -------------------------------------------------------------------------
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // frequent filter: get all books for the logged-in user
    },

    // -------------------------------------------------------------------------
    // 4) FLAGS – User-defined state, interactions, and preferences
    // -------------------------------------------------------------------------
    flags: {
      isArchived:   { type: Boolean, default: false },    // User removed from view
      isFavorited:  { type: Boolean, default: false },
      isDownloaded: { type: Boolean, default: false },

      renderedPages:  { type: [Number], default: [] },    // For caching
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

      rating: { type: Number, default: 0 },               // User rating (0–5)

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

    // -------------------------------------------------------------------------
    // 5) STATS – System-generated reading progress and activity
    // -------------------------------------------------------------------------
    stats: {
      lastOpenedAt:   { type: Date, default: null },
      currentPage:    { type: Number, default: 1 },
      maxVisitedPage: { type: Number, default: 1 },
      isCompleted:    { type: Boolean, default: false },
    },
  },
  { timestamps: true }
)

// -----------------------------------------------------------------------------
// INDEXES
// -----------------------------------------------------------------------------

bookSchema.index({ 'meta.addedAt': -1 }) // For sorting books by added date
bookSchema.index({ owner: 1 })           // For fast user lookups

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export default mongoose.models.Book || mongoose.model('Book', bookSchema)
