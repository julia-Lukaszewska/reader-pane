//-----------------------------------------------------------------------------
//------ ReaderView: Displays toolbar and rendered PDF book 
//-----------------------------------------------------------------------------

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { RenderedPDFViewer } from '@/components'
import { saveLastBookId } from '@/utils'
import {
  useMobileViewMode,
  useBookLoader,
  useReadingProgress,
  usePreloadPDFPages,
} from '@/hooks'
import { clearRenderedPages, clearRenderedRanges } from '@/store'

//-----------------------------------------------------------------------------
//------ StyledReaderView wrapper 
//-----------------------------------------------------------------------------

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`

//-----------------------------------------------------------------------------
//------ ReaderView component definition 
//-----------------------------------------------------------------------------

const ReaderView = () => {
  const { bookId: routeBookId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const activeBook = useSelector((state) => state.reader.activeBook)

  // Redirect to home if no book ID and no activeBook 
  useEffect(() => {
    if (!routeBookId && !activeBook) {
      navigate('/', { replace: true })
    }
  }, [routeBookId, activeBook, navigate])

  // Load book data from API if ID is in route 
  const { isLoading, error } = useBookLoader(routeBookId)

  // Clear cached pages on book change 
  useEffect(() => {
    dispatch(clearRenderedPages())
    dispatch(clearRenderedRanges())
  }, [routeBookId, dispatch])

  useMobileViewMode()
  usePreloadPDFPages()
  useReadingProgress()

  // Save last opened book ID only if route ID exists 
  useEffect(() => {
    if (routeBookId) {
      saveLastBookId(routeBookId)
    }
  }, [routeBookId])

  if (isLoading) return <p>Loading book...</p>
  if (error) return <p>{error}</p>

  return (
    <StyledReaderView>
      <RenderedPDFViewer />
    </StyledReaderView>
  )
}

export default ReaderView
