const API_URL = 'http://localhost:5000/api/books'

//------------------------------------------------------------------
//------ Upload book to server  
//------------------------------------------------------------------

export const uploadBook = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error('Error while uploading the file')
    return res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Error while uploading the file')
  }
}
//------------------------------------------------------------------
//------ Get books from server  
//------------------------------------------------------------------

export const getBooks = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Failed to fetch books')
    return res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Error while fetching books')
  }
}

//------------------------------------------------------------------
//------ Move book to archive  
//------------------------------------------------------------------

export const moveToTrash = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}/delete`, {
      method: 'PATCH',
    })
    if (!res.ok) throw new Error('Error while moving the book to archive')
  } catch (error) {
    console.error(error)
    throw new Error('Error while moving the book to archive')
  }
}

//------------------------------------------------------------------
//------ Restore book from archive  
//------------------------------------------------------------------

export const restoreBook = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}/restore`, {
      method: 'PATCH',
    })
    if (!res.ok) throw new Error('Error while restoring the book')
  } catch (error) {
    console.error(error)
    throw new Error('Error while restoring the book')
  }
}

//------------------------------------------------------------------
//------ Delete book  
//------------------------------------------------------------------

export const deleteBookForever = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Error while deleting the book')
  } catch (error) {
    console.error(error)
    throw new Error('Error while deleting the book')
  }
}
