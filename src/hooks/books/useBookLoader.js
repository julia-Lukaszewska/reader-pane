//-----------------------------------------------------------------------------
//------ useBookLoader.js – Hook to load a book by ID and sync progress 
//-----------------------------------------------------------------------------

import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 

import { clearLastBookId } from '@/utils' 
import { setActiveBook } from '@/store' 
import { useGetBookQuery } from '@/store/api/booksApi'


const useBookLoader = (bookId) => {
  
  const dispatch = useDispatch() 
  const navigate = useNavigate() 

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useGetBookQuery(bookId, {
    skip: !bookId, // nie wysyłaj zapytania, jeśli brak ID
  })

  useEffect(() => {
    if (!book) return

    const saved = localStorage.getItem(`progress-${book._id}`)
    const savedProgress = localStorage.getItem(`progress-${book._id}`)
    const savedPage = localStorage.getItem(`currentPage-${book._id}`)

    const progress = savedProgress
      ? Number(savedProgress)
      : book.progress ?? 0
    const currentPage = savedPage
      ? Number(savedPage)
      : book.currentPage ?? 1

    dispatch(setActiveBook({ ...book, progress, currentPage, saved }))

    if (!book.fileUrl) {
      clearLastBookId()
      navigate('/', { replace: true })
    }
  }, [book, dispatch, navigate])

  useEffect(() => {
    if (isError) {
      console.error('useBookLoader error:', error)
      clearLastBookId()
      navigate('/', { replace: true })
    }
  }, [isError, error, navigate])

  return { isLoading, error: isError ? 'Failed to load book.' : '' }
}

export default useBookLoader