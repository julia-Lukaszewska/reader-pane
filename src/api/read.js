//------------------------------------------------------------------
//------ Get books from server //#PL: 📚 Pobieranie książek z serwera #/
//------------------------------------------------------------------

const API_URL = 'http://localhost:5000/api/books' // API base URL  

/**
 * Fetches a list of all books from the backend.
 * Returns JSON array of book objects or throws error on failure.
 */
export const getBooks = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Error while fetching books') // Network or server error  
    return res.json()
  } catch (error) {
    console.error(error)  
    throw new Error('Error while fetching books') // Rethrow to be handled by caller  
  }
}

//------------------------------------------------------------------
//------ Get single book by ID //#PL: 🔎 Pobieranie jednej książki po ID #/
//------------------------------------------------------------------

/**
 * Fetches a single book by its ID.
 * Returns book object or null if not found (404).
 * Throws error for other failures.
 */
export const getSingleBook = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`)

    if (res.status === 404) {
      console.warn(`Book with ID ${id} not found`)  
      return null // Return null to allow graceful handling by UI  
    }

    if (!res.ok) throw new Error('Error while fetching the book') // Unexpected server issue  

    return res.json()
  } catch (error) {
    console.error(error)  
    throw new Error('Error while fetching the book') // Notify caller about failure  
  }
}
