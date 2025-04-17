//-----------------------------------------------------------------------------
//------ AppProvider: Global context provider for the app  
//-----------------------------------------------------------------------------

import { useEffect, useReducer } from 'react'
import { appReducer, initialState } from './AppReducer'
import { AppContext } from './AppContext'
import { getBooks } from '../api'
import { getLastBookId, clearLastBookId } from '../utils/storage'

export const AppProvider = ({ children }) => {
  const savedTheme = localStorage.getItem('theme') || initialState.theme

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    theme: savedTheme,
  })

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks() // 📥 Pobierz książki z backendu
        dispatch({ type: 'SET_LIBRARY', payload: books }) // 📚 Zapisz w stanie aplikacji

        // 🧹 Sprawdź, czy ostatnio otwarta książka nadal istnieje
        const lastId = getLastBookId()
        const bookStillExists = books.some((b) => b._id === lastId)

        if (lastId && !bookStillExists) {
          console.warn('🧹 Usuwam lastOpenedBookId – książki brak w bazie')
          clearLastBookId()
        }
      } catch (err) {
        console.error('Błąd ładowania książek:', err)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', state.theme) //Apply theme to body attribute  
    localStorage.setItem('theme', state.theme) //Save theme to localStorage  
  }, [state.theme])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
