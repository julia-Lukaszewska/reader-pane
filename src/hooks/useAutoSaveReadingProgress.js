//-----------------------------------------------------------------------------
//------useAutoSaveReadingProgress – autosave reading progress  
//-----------------------------------------------------------------------------

/**
 * Listens for changes in currentPage and auto-saves the progress after 800ms.
 * Prevents saving if page is unchanged or missing. Updates localStorage
 * and AppContext, and handles 404 errors by clearing lastBookId.
 */

import { useEffect, useRef, useContext } from 'react'
import { autoSaveProgress } from '../api/progress'
import { AppContext } from '../context/AppContext'
import { clearLastBookId } from '../utils/storage'

export function useAutoSaveReadingProgress() {
  const { state, dispatch } = useContext(AppContext)
  const bookId = state.activeBook?._id
  const currentPage = state.currentPage
  const totalPages = state.activeBook?.totalPages
  const lastSavedPage = useRef(null)

  useEffect(() => {
    if (!bookId || !currentPage) return
    if (lastSavedPage.current === currentPage) return

    lastSavedPage.current = currentPage

    const timeout = setTimeout(async () => {
      try {
        await autoSaveProgress(bookId, currentPage, totalPages)

        localStorage.setItem(`progress-${bookId}`, currentPage)  
        dispatch({
          type: 'UPDATE_ACTIVE_BOOK_FIELD',
          payload: { field: 'progress', value: currentPage },
        })
        console.log('[AutoSave] Progress saved:', currentPage)  
      } catch (err) {
        if (err.message.includes('404')) {
          console.warn('[AutoSave] Book not found (404), clearing lastBookId')  
          clearLastBookId()
        } else {
          console.error('[AutoSave] Error saving progress:', err)  
        }
      }
    }, 800)

    return () => {
      clearTimeout(timeout)
      console.log('[AutoSave] Save canceled')  
    }
  }, [bookId, currentPage, totalPages, dispatch])
}
