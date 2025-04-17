//------------------------------------------------------------------
//------ Upload book to server //#PL: 📂 Wgrywanie książki na serwer #/
//------------------------------------------------------------------

const API_URL = 'http://localhost:5000/api/books'

/**
 * Uploads a book (PDF file) to the backend using FormData.
 * Expects the backend to handle multipart/form-data.
 * Returns saved book data (e.g. _id, title, fileUrl).
 */
export const uploadBook = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData, // Sends the file in multipart format  
    })
    if (!res.ok) throw new Error('Error while uploading the file')  
    return res.json() // Return created book object  
  } catch (error) {
    console.error(error)  
    throw new Error('Error while uploading the file')  
  }
}
