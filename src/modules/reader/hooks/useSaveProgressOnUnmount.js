// src/modules/pdfView/hooks/useSaveProgressOnUnmount.js
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateProgressAutoMutation } from '@/store/api/booksApi'
import { selectActiveBookId, selectCurrentPage } from '@/store/selectors'


export default function useSaveProgressOnUnmount() {
  const bookId = useSelector(selectActiveBookId)
  const currentPage = useSelector(selectCurrentPage)
  const [autoSave] = useUpdateProgressAutoMutation()

useEffect(() => {
  return () => {
    console.log('[SaveProgressOnUnmount] Saving progress:', { bookId, currentPage })
    if (bookId && currentPage) autoSave({ id: bookId, currentPage })
  }
}, [bookId, currentPage, autoSave])

}
