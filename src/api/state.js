//------------------------------------------------------------------
//------ Move book to archive //#PL: 🗂️ Przenoszenie książki do archiwum #/
//------------------------------------------------------------------

const API_URL = 'http://localhost:5000/api/books'

/**
 * Marks the book as archived (soft-delete).
 * Sets `isDeleted = true` in the database.
 */
export const moveToTrash = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}/delete`, { method: 'PATCH' })
    if (!res.ok) throw new Error('Error while moving the book to archive')  
  } catch (error) {
    console.error(error)
    throw new Error('Error while moving the book to archive')
  }
}

//------------------------------------------------------------------
//------ Restore book from archive  
//------------------------------------------------------------------

/**
 * Restores an archived book.
 * Sets `isDeleted = false` in the database.
 */
export const restoreBook = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}/restore`, { method: 'PATCH' })
    if (!res.ok) throw new Error('Error while restoring the book')  
  } catch (error) {
    console.error(error)
    throw new Error('Error while restoring the book')
  }
}

//------------------------------------------------------------------
//------ Delete book permanently  
//------------------------------------------------------------------

/**
 * Deletes the book permanently from the database and disk.
 * Should be used with caution.
 */
export const deleteBookForever = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error while deleting the book')  
  } catch (error) {
    console.error(error)
    throw new Error('Error while deleting the book')
  }
}

//------------------------------------------------------------------
//------ Delete book if associated file is missing //#PL: 🔍 Usuń książkę, jeśli plik nie istnieje #/
//------------------------------------------------------------------

/**
 * Checks if the book file still exists on disk.
 * If not, deletes the book and cleans up context and localStorage.
 */
export const deleteIfFileMissing = async (book, dispatch) => {
  try {
    const head = await fetch(book.fileUrl, { method: 'HEAD' }) // Check if file is reachable
    if (!head.ok) {
      await deleteBookForever(book._id) // Delete from backend  
      dispatch({ type: 'REMOVE_BOOK', payload: book._id }) // Remove from app context  

      const lastId = localStorage.getItem('lastOpenedBookId')
      if (lastId === book._id) {
        localStorage.removeItem('lastOpenedBookId') // Clear local storage if needed  
      }

      console.warn(`Book "${book.title}" deleted – file was missing`)  
    }
  } catch (err) {
    console.error('Error while checking and removing missing book:', err)  
  }
}
