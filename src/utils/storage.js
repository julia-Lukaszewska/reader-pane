//----------------------------------------------------------------------------- 
// storage.js: Pełny zestaw helperów localStorage (Twoje nazwy + nowe funkcje) 
//----------------------------------------------------------------------------- 

// 🔹 Save last opened book ID 
export const saveLastBookId = (id) => { 
  if (id) localStorage.setItem('lastOpenedBookId', id) 
} 

export const getLastBookId = () => localStorage.getItem('lastOpenedBookId') 

export const clearLastBookId = () => localStorage.removeItem('lastOpenedBookId') 

// 🔹 Save archived books list 
export const saveArchivedBooks = (books) => { 
  try { 
    localStorage.setItem('ebooker:archivedBooks', JSON.stringify(books)) 
  } catch (err) { 
    console.error('[storage] Error saving archived books:', err) 
  } 
} 

export const getArchivedBooks = () => { 
  try { 
    const data = localStorage.getItem('ebooker:archivedBooks') 
    return data ? JSON.parse(data) : [] 
  } catch (err) { 
    console.error('[storage] Error fetching archived books:', err) 
    return [] 
  } 
} 

export const clearArchivedBooks = () => { 
  try { 
    localStorage.removeItem('ebooker:archivedBooks') 
  } catch (err) { 
    console.error('[storage] Error clearing archived books:', err) 
  } 
} 

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

export const removeBookFromArchiveStorage = (bookId) => { 
  const archived = getArchivedBooks() 
  const updated = archived.filter((b) => b.id !== bookId) 
  saveArchivedBooks(updated) 
} 

//----------------------------------------------------------------------------- 
// 🔹 NEW HELPERS 
//----------------------------------------------------------------------------- 

export const saveBookCurrentPage = (bookId, currentPage) => { 
  try { 
    const progress = JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {} 
    progress[bookId] = currentPage 
    localStorage.setItem('ebooker:allBooksProgress', JSON.stringify(progress)) 
  } catch (err) { 
    console.error('[storage] Error saving current page:', err) 
  } 
} 

export const getBookCurrentPage = (bookId) => { 
  try { 
    const progress = JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {} 
    return progress[bookId] || 1 
  } catch (err) { 
    console.error('[storage] Error reading current page:', err) 
    return 1 
  } 
} 

export const clearBookProgress = (bookId) => { 
  try { 
    const progress = JSON.parse(localStorage.getItem('ebooker:allBooksProgress')) || {} 
    delete progress[bookId] 
    localStorage.setItem('ebooker:allBooksProgress', JSON.stringify(progress)) 
  } catch (err) { 
    console.error('[storage] Error clearing book progress:', err) 
  } 
} 

export const saveScaleIndex = (scaleIndex) => { 
  localStorage.setItem('ebooker:scaleIndex', scaleIndex) 
} 

export const getScaleIndex = () => Number(localStorage.getItem('ebooker:scaleIndex')) || 0 

export const clearScaleIndex = () => localStorage.removeItem('ebooker:scaleIndex') 

export const saveRenderedPages = (bookId, pagesObject) => { 
  try { 
    localStorage.setItem(`ebooker:renderedPages-${bookId}`, JSON.stringify(pagesObject)) 
  } catch (err) { 
    console.error('[storage] Error saving rendered pages:', err) 
  } 
} 

export const getRenderedPages = (bookId) => { 
  try { 
    return JSON.parse(localStorage.getItem(`ebooker:renderedPages-${bookId}`)) || {} 
  } catch (err) { 
    console.error('[storage] Error reading rendered pages:', err) 
    return {} 
  } 
} 

export const clearRenderedPages = (bookId) => { 
  localStorage.removeItem(`ebooker:renderedPages-${bookId}`) 
} 

// export const saveRenderedRanges = (bookId, rangesObject) => { 
//   try { 
//     // localStorage.setItem(`ebooker:renderedRanges-${bookId}`, JSON.stringify(rangesObject)) 
//   } catch (err) { 
//     console.error('[storage] Error saving rendered ranges:', err) 
//   } 
// } 

export const getRenderedRanges = (bookId) => { 
  try { 
    return JSON.parse(localStorage.getItem(`ebooker:renderedRanges-${bookId}`)) || {} 
  } catch (err) { 
    console.error('[storage] Error reading rendered ranges:', err) 
    return {} 
  } 
} 

export const clearRenderedRanges = (bookId) => { 
  localStorage.removeItem(`ebooker:renderedRanges-${bookId}`) 
}