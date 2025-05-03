//-----------------------------------------------------------------------------
//------ useBookLoader.js – Hook to load a book by ID and sync progress 
//-----------------------------------------------------------------------------

import { useEffect, useState } from 'react'  
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import { getSingleBook } from '@/api'  
import { clearLastBookId } from '@/utils' 
import { setActiveBook } from '@/store' 

const useBookLoader = (bookId) => {
 
  const dispatch = useDispatch()  
  const navigate = useNavigate()  

  const [isLoading, setIsLoading] = useState(false)  
  const [error, setError] = useState('')  

  useEffect(() => {
    if (!bookId) return  

    // Async function to fetch book
    const loadBook = async () => {
      setIsLoading(true) // start loading 
      setError('') 
      try {
        const book = await getSingleBook(bookId) 

        const key = `progress-${book._id}` // localStorage key 
        const saved = localStorage.getItem(key) // read saved progress 
        const savedProgress = localStorage.getItem(`progress-${book._id}`)
        const savedPage = localStorage.getItem(`currentPage-${book._id}`)

        const progress = savedProgress
          ? Number(savedProgress)
          : (book.progress ?? 0)
        const currentPage = savedPage
          ? Number(savedPage)
          : (book.currentPage ?? 1)

        dispatch(setActiveBook({ ...book, progress, currentPage, saved }))

        if (!book.fileUrl) {
          
          clearLastBookId()  
          navigate('/', { replace: true })  
        }
      } catch (err) {
        console.error('useBookLoader error:', err)  
        setError('Failed to load book.')  
        clearLastBookId()  
        navigate('/', { replace: true }) 
      } finally {
        setIsLoading(false)  
      }
    }
    loadBook()
  }, [bookId, dispatch, navigate])  

  return { isLoading, error }  
}

export default useBookLoader  
