/**
 * @file sortBooks.js
 * @description Utility function for sorting an array of books by selected field and direction.
 */

//-----------------------------------------------------------------------------
//------ sortBooks: Sort books by title, author, dates, rating, etc.
//-----------------------------------------------------------------------------
    
/**
 * Sorts an array of books based on the given sort mode.
 *
 * @param {Array<Object>} books - Array of book objects
 * @param {string} mode - Sorting mode (e.g. 'title-asc', 'date-desc', 'rating-asc')
 * @returns {Array<Object>} Sorted array of books
 */
const sortBooks = (books, mode) => {
  const arr = [...books] // Create shallow copy

  //--- Normalizers
  const getDate = date => new Date(date || 0)
  const getText = text => (text || '').toLowerCase()
  const getNumber = val => Number(val) || 0

  //--- Sorting strategies
  const sorters = {
    // Title
    'title-asc':     (a, b) => getText(a.meta.title).localeCompare(getText(b.meta.title)),
    'title-desc':    (a, b) => getText(b.meta.title).localeCompare(getText(a.meta.title)),

    // Author
    'author-asc':    (a, b) => getText(a.meta.author).localeCompare(getText(b.meta.author)),
    'author-desc':   (a, b) => getText(b.meta.author).localeCompare(getText(a.meta.author)),

    // Date added (meta.addedAt)
    'date-asc':      (a, b) => getDate(a.meta.addedAt) - getDate(b.meta.addedAt),
    'date-desc':     (a, b) => getDate(b.meta.addedAt) - getDate(a.meta.addedAt),

    // Date updated (updatedAt - root level)
    'updated-asc':   (a, b) => getDate(a.updatedAt) - getDate(b.updatedAt),
    'updated-desc':  (a, b) => getDate(b.updatedAt) - getDate(a.updatedAt),

    // Publication date (meta.publicationDate)
    'publication-asc':  (a, b) => getDate(a.meta.publicationDate) - getDate(b.meta.publicationDate),
    'publication-desc': (a, b) => getDate(b.meta.publicationDate) - getDate(a.meta.publicationDate),

    // Rating (flags.rating)
    'rating-asc':    (a, b) => getNumber(a.flags.rating) - getNumber(b.flags.rating),
    'rating-desc':   (a, b) => getNumber(b.flags.rating) - getNumber(a.flags.rating),
  }

  //--- Default to title ascending if unknown mode
  return arr.sort(sorters[mode] || sorters['title-asc'])
}

export default sortBooks
