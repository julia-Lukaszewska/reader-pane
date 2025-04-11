// -----------------------------------------------------------------------------
//------ AppProvider Component   
// -----------------------------------------------------------------------------

import { useEffect, useReducer } from 'react' // React hooks  
import { appReducer, initialState } from './AppReducer' // Reducer logic  
import { AppContext } from './AppContext' // Global context object  
import { getBooks } from '../utils/api' // API call to fetch books  

// -----------------------------------------------------------------------------
//------ AppProvider   
// -----------------------------------------------------------------------------

export const AppProvider = ({ children }) => {
  const savedTheme = localStorage.getItem('theme') || initialState.theme // Load theme from localStorage  

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    theme: savedTheme,
  }) // Setup global state with reducer  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks() // Fetch books from API  
        dispatch({ type: 'SET_LIBRARY', payload: books }) // Update state with fetched books  
      } catch (err) {
        console.error('Błąd ładowania książek:', err) // Log error  
      }
    }

    fetchBooks() // Run on app start  
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', state.theme)
    localStorage.setItem('theme', state.theme)
  }, [state.theme]) // Apply theme to document and save to localStorage  

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
