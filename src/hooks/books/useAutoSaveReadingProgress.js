//-----------------------------------------------------------------------------
//------ useAutoSaveReadingProgress – debounced autosave of current page 
//-----------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { autoSaveProgress } from '@/api'
import { updateBook } from '@/store'

const useAutoSaveReadingProgress = () => {
  const dispatch = useDispatch() 
  const book = useSelector((state) => state.reader.activeBook) 
  const currentPage = useSelector((state) => state.reader.currentPage) 

  const timeoutRef = useRef() 

  useEffect(() => {
    if (!book?._id || !book.totalPages) return 

    clearTimeout(timeoutRef.current) // Clear previous timeout 
    timeoutRef.current = setTimeout(async () => {
      // Set new debounced call 
      try {
        await autoSaveProgress(book._id, currentPage, book.totalPages) // API autosave 
        localStorage.setItem(`progress-${book._id}`, currentPage) // Save to localStorage 
        dispatch(updateBook({ _id: book._id, progress: currentPage })) // Update Redux store 
      } catch (error) {
        console.error('[AutoSave] failed', error) 
      }
    }, 800) 

    return () => clearTimeout(timeoutRef.current) 
  }, [book?._id, book?.totalPages, currentPage, dispatch]) 
}

export default useAutoSaveReadingProgress
