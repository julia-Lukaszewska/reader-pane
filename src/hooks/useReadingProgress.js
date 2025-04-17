//-----------------------------------------------------------------------------
//------useReadingProgress – reading progress hook wrapper  
//-----------------------------------------------------------------------------

/*//#PL:
Hook używany w komponentach do obsługi bieżącej strony książki.
- Pobiera currentPage oraz dispatch z AppContext  
- Używa useAutoSaveReadingProgress() do zapisu postępu w tle  
- Zwraca currentPage i funkcję setCurrentPage()
#/*/

import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useAutoSaveReadingProgress } from './useAutoSaveReadingProgress'

/**
 * Hook for managing and updating reading progress.
 * Integrates auto-save logic and dispatches page changes to context.
 */
export function useReadingProgress() {
  const { state, dispatch } = useContext(AppContext)  
  const currentPage = state.currentPage  

  console.log('[useReadingProgress] currentPage from context:', currentPage)
  console.log('[useReadingProgress] initializing auto-save hook')
  useAutoSaveReadingProgress()  
  console.log('[useReadingProgress] auto-save hook mounted')

  /**
   * Dispatches new currentPage to context reducer.
   * Called whenever the page changes.
   */
  const setCurrentPage = (value) => {
    console.log('[useReadingProgress] setCurrentPage called with:', value)
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value })  
  }

  return {
    currentPage,  
    setCurrentPage,  
  }
}
