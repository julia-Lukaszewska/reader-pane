//-----------------------------------------------------------------------------
//------ storage.js: Utilities for storing last opened book ID 
//-----------------------------------------------------------------------------

//--------------------------------------------------------------------
//------ Save last opened book ID to localStorage 
//--------------------------------------------------------------------
export const saveLastBookId = (id) =>
  localStorage.setItem('lastOpenedBookId', id) 

//-----------------------------------------------------------------------------
//------ Get last opened book ID from localStorage 
//-----------------------------------------------------------------------------

export const getLastBookId = () => localStorage.getItem('lastOpenedBookId') 

//-----------------------------------------------------------------------------
//------ Clear last opened book ID from localStorage 
//-----------------------------------------------------------------------------

export const clearLastBookId = () => localStorage.removeItem('lastOpenedBookId') 

//-----------------------------------------------------------------------------
//------ Save list of archived books to localStorage 
//-----------------------------------------------------------------------------
export const saveArchivedBooks = (books) =>
  localStorage.setItem('ebooker:archivedBooks', JSON.stringify(books))

//-----------------------------------------------------------------------------
//------ Get list of archived books from localStorage 
//-----------------------------------------------------------------------------
export const getArchivedBooks = () => {
  const data = localStorage.getItem('ebooker:archivedBooks')
  return data ? JSON.parse(data) : []
}

//-----------------------------------------------------------------------------
//------ Clear archived books from localStorage 
//-----------------------------------------------------------------------------
export const clearArchivedBooks = () =>
  localStorage.removeItem('ebooker:archivedBooks')

//-----------------------------------------------------------------------------
//------ Save one book to archivedBooks in localStorage 
//-----------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------
//------ Remove one book from archivedBooks in localStorage 
//-----------------------------------------------------------------------------
export const removeBookFromArchiveStorage = (bookId) => {
  const archived = getArchivedBooks()
  const updated = archived.filter((b) => b.id !== bookId)
  saveArchivedBooks(updated)
}
