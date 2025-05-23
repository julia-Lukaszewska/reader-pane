/**
 * @file createBook.js
 * @description Factory function for creating a new book object with default metadata.
 */

//-----------------------------------------------------------------------------
//------ createBook: Factory function (arrow) for creating a new book object
//-----------------------------------------------------------------------------

/**    
 * Creates a new book object with default metadata fields.
 *
 * @param {Object} [params={}] - Optional fields to override defaults
 * @param {string} [params._id] - Unique identifier for the book (auto-generated if omitted)
 * @param {string} [params.title='Untitled'] - Book title
 * @param {string} [params.author=''] - Book author
 * @param {string} [params.fileUrl=''] - PDF file URL
 * @param {number} [params.totalPages=1] - Total number of pages
 * @param {string} [params.createdAt] - ISO date string (default: now)
 * @returns {Object} New book object with `meta` structure
 */
const createBook = ({
  _id = crypto.randomUUID(),
  title = 'Untitled',
  author = '',
  fileUrl = '',
  totalPages = 1,
  createdAt = new Date().toISOString(),
} = {}) => ({
  _id,
  meta: {
    title,
    author,
    fileUrl,
    totalPages,
    createdAt,
  },
})

export default createBook
