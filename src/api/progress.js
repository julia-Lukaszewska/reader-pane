//------------------------------------------------------------------
//------ Get reading progress from server //#PL: 📥 Pobierz postęp czytania z serwera #/
//------------------------------------------------------------------

const API_URL = 'http://localhost:5000/api/books'

export const getReadingProgress = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/${bookId}/progress`)
    if (!res.ok) {
      if (res.status === 404) return { currentPage: 1 } // Return default progress if book not found  
      throw new Error('Failed to fetch reading progress') // Other unexpected error  
    }
    return await res.json()
  } catch (error) {
    console.error('Error while fetching reading progress:', error)  
    return { currentPage: 1 }
  }
}

//------------------------------------------------------------------
//------ Save reading progress to server //#PL: 💾 Zapisz postęp czytania do serwera #/
//------------------------------------------------------------------

export const saveReadingProgress = async (id, currentPage, totalPages) => {
  const body = { currentPage }
  if (totalPages) body.totalPages = totalPages

  const res = await fetch(`${API_URL}/${id}/progress`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await res.text() // Manually parse – server might return non-JSON on error  

  try {
    const data = JSON.parse(text)
    if (!res.ok) {
      console.error('Backend responded with an error:', data)
      throw new Error('Failed to save reading progress')  
    }
    return data
  } catch (err) {
    console.error('Invalid JSON response from server:', text, err)  
    throw new Error('Failed to save reading progress – invalid server response')
  }
}

//------------------------------------------------------------------
//------ Auto-save reading progress with percentage //#PL: 🔁 Automatyczny zapis postępu z obliczaniem % #/
//------------------------------------------------------------------

export const autoSaveProgress = async (id, currentPage, totalPages) => {
  const body = { currentPage, totalPages }

  const res = await fetch(`${API_URL}/${id}/progress/auto`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to auto-save reading progress')  
  }

  return data
}
