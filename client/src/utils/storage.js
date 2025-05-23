/**
 * @file storage.js
 * @description LocalStorage helper functions for book tracking, archiving, progress, and PDF cache.
 */

//-----------------------------------------------------------------------------
// Book ID Persistence
//-----------------------------------------------------------------------------

/**
 * Saves the last opened book ID to localStorage.
 * @param {string} id - Book identifier
 */
export const saveLastBookId = (id) => {
  if (id) localStorage.setItem('lastOpenedBookId', id)
}

/**
 * Retrieves the last opened book ID from localStorage.
 * @returns {string|null}
 */
export const getLastBookId = () => localStorage.getItem('lastOpenedBookId')

/**
 * Clears the last opened book ID from localStorage.
 */
export const clearLastBookId = () => localStorage.removeItem('lastOpenedBookId')

//-----------------------------------------------------------------------------
// Archived Books List
//-----------------------------------------------------------------------------

/**
 * Saves the list of archived books.
 * @param {Array<Object>} books - Array of archived book entries
 */
export const saveArchivedBooks = (books) => {
  try {
    localStorage.setItem('ebooker:archivedBooks', JSON.stringify(books))
  } catch (err) {
    console.error('[storage] Error saving archived books:', err)
  }
}

/**
 * Retrieves the list of archived books.
 * @returns {Array<Object>}
 */
export const getArchivedBooks = () => {
  try {
    const data = localStorage.getItem('ebooker:archivedBooks')
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('[storage] Error fetching archived books:', err)
    return []
  }
}

/**
 * Clears the archived books list.
 */
export const clearArchivedBooks = () => {
  try {
    localStorage.removeItem('ebooker:archivedBooks')
  } catch (err) {
    console.error('[storage] Error clearing archived books:', err)
  }
}

/**
 * Adds a book to the archived list if not already present.
 * @param {Object} book - Book object containing at least _id and title
 */
export const saveBookToArchiveStorage = (book) => {
  const archived = getArchivedBooks()
  if (archived.some((b) => b.id === book._id)) return

  const newEntry = {
    id: book._id,
    title: book.title,
    archivedAt: new Date().toISOString(),
  }

  saveArchivedBooks([...archived, newEntry])
}

/**
 * Removes a book from the archived list by ID.
 * @param {string} bookId - Identifier of the book to remove
 */
export const removeBookFromArchiveStorage = (bookId) => {
  const archived = getArchivedBooks()
  const updated = archived.filter((b) => b.id !== bookId)
  saveArchivedBooks(updated)
}

//-----------------------------------------------------------------------------
// Reading Progress
//-----------------------------------------------------------------------------

/**
 * Saves the current page of a book to localStorage.
 * @param {string} bookId
 * @param {number} currentPage
 */
export const saveBookCurrentPage = (bookId, currentPage) => {
  try {
    const progress =
      JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {}
    progress[bookId] = currentPage
    localStorage.setItem(
      'ebooker:allBooksProgress',
      JSON.stringify(progress)
    )
  } catch (err) {
    console.error('[storage] Error saving current page:', err)
  }
}

/**
 * Retrieves the saved current page for a book.
 * @param {string} bookId
 * @returns {number}
 */
export const getBookCurrentPage = (bookId) => {
  try {
    const progress =
      JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {}
    return progress[bookId] || 1
  } catch (err) {
    console.error('[storage] Error reading current page:', err)
    return 1
  }
}

/**
 * Clears the saved progress for a specific book.
 * @param {string} bookId
 */
export const clearBookProgress = (bookId) => {
  try {
    const progress =
      JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {}
    delete progress[bookId]
    localStorage.setItem(
      'ebooker:allBooksProgress',
      JSON.stringify(progress)
    )
  } catch (err) {
    console.error('[storage] Error clearing book progress:', err)
  }
}

//-----------------------------------------------------------------------------
// Zoom Scale Index
//-----------------------------------------------------------------------------

/**
 * Saves the current zoom scale index.
 * @param {number} scaleIndex
 */
export const saveScaleIndex = (scaleIndex) => {
  localStorage.setItem('ebooker:scaleIndex', scaleIndex)
}

/**
 * Retrieves the saved zoom scale index.
 * @returns {number}
 */
export const getScaleIndex = () =>
  Number(localStorage.getItem('ebooker:scaleIndex')) || 0

/**
 * Clears the saved zoom scale index.
 */
export const clearScaleIndex = () =>
  localStorage.removeItem('ebooker:scaleIndex')

//-----------------------------------------------------------------------------
// PDF Cache Helpers
//-----------------------------------------------------------------------------

/**
 * Saves rendered pages object for a book.
 * @param {string} bookId
 * @param {Object} pagesObject
 */
export const saveRenderedPages = (bookId, pagesObject) => {
  try {
    localStorage.setItem(
      `ebooker:renderedPages-${bookId}`,
      JSON.stringify(pagesObject)
    )
  } catch (err) {
    console.error('[storage] Error saving rendered pages:', err)
  }
}

/**
 * Retrieves rendered pages object for a book.
 * @param {string} bookId
 * @returns {Object}
 */
export const getRenderedPages = (bookId) => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(`ebooker:renderedPages-${bookId}`)
      ) || {}
    )
  } catch (err) {
    console.error('[storage] Error reading rendered pages:', err)
    return {}
  }
}

/**
 * Clears rendered pages cache for a book.
 * @param {string} bookId
 */
export const clearRenderedPages = (bookId) =>
  localStorage.removeItem(`ebooker:renderedPages-${bookId}`)

/**
 * Retrieves rendered ranges for a book.
 * @param {string} bookId
 * @returns {Object}
 */
export const getRenderedRanges = (bookId) => {
  try {
    return (
      JSON.parse(
        localStorage.getItem(`ebooker:renderedRanges-${bookId}`)
      ) || {}
    )
  } catch (err) {
    console.error('[storage] Error reading rendered ranges:', err)
    return {}
  }
}
  
/**
 * Clears rendered ranges cache for a book.
 * @param {string} bookId
 */
export const clearRenderedRanges = (bookId) =>
  localStorage.removeItem(`ebooker:renderedRanges-${bookId}`)
