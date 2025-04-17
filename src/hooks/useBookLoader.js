import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { getSingleBook } from '../api'
import { clearLastBookId } from '../utils/storage'

/**
 * Hook that loads book data from the API by bookId.
 * Sets the book in global AppContext, handles errors, and redirects if missing.
 *
 * @param {string} bookId - ID of the book to fetch
 * @returns {object} { isLoading, error } – state flags for loading and error handling
 */
export function useBookLoader(bookId) {
  const { dispatch } = useContext(AppContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false) // Indicates loading state  
  const [error, setError] = useState('') // Stores any error messages  

  useEffect(() => {
    if (!bookId) return

    const fetchBook = async () => {
      setIsLoading(true)
      setError('')

      try {
        const book = await getSingleBook(bookId) // Load book from backend  

        // Sync reading progress: use localStorage if available
        const localProgress = localStorage.getItem(`progress-${book._id}`)
        const progressToUse = localProgress
          ? Number(localProgress)
          : (book.progress ?? 1)

        dispatch({
          type: 'SET_ACTIVE_BOOK',
          payload: { ...book, progress: progressToUse }, // Add progress to book object  
        })

        if (!book.fileUrl) {
          clearLastBookId() // Clear last opened ID  
          navigate('/', { replace: true }) // Redirect to home  
        }
      } catch (err) {
        setError('Failed to load book.', err) // User-facing error message  
        clearLastBookId()
        navigate('/', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBook()
  }, [bookId, dispatch, navigate])

  return { isLoading, error } // Expose loading and error state  
}
