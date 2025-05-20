//-----------------------------------------------------------------------------
//------ createBook: Factory function (arrow) for creating a new book object
//-----------------------------------------------------------------------------

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
