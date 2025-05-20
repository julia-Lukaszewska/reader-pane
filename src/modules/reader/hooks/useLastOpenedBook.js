// src/modules/pdfView/hooks/useLastOpenedBook.js
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdateLastOpenedMutation } from '@/store/api/booksApi'


export default function useLastOpenedBook() {
  const { bookId: routeBookId } = useParams()
  const navigate = useNavigate()
  const activeBookId = useSelector(s => s.book.activeBookId)
  const [updateLastOpened] = useUpdateLastOpenedMutation()

  // Redirect to the active book or home if no :bookId is present
  useEffect(() => {
    if (routeBookId) return

    if (activeBookId) {
      navigate(`/read/${activeBookId}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [routeBookId, activeBookId, navigate])

  // If a book ID is available – update the lastOpenedAt field
  useEffect(() => {
    const id = routeBookId ?? activeBookId
    if (!id) return

    updateLastOpened(id)
      .unwrap()
      .catch(err =>
        console.error('Failed to update lastOpenedAt', err)
      )
  }, [routeBookId, activeBookId, updateLastOpened])
}
