//-----------------------------------------------------------------------------
//------ ReaderView: Displays toolbar and rendered PDF book  
//-----------------------------------------------------------------------------

import { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'

import { AppContext } from '../context/AppContext'
import Toolbar from '../layout/Toolbar'
import RenderedPDFViewer from '../components/RenderedPDFViewer'
import { usePreloadPDFPages } from '../hooks/usePreloadPDFPages'
import { useReadingProgress } from '../hooks/useReadingProgress'
import { saveLastBookId } from '../utils/storage'
import { useBookLoader } from '../hooks/useBookLoader'
import { useMobileViewMode } from '../hooks/useMobileViewMode'
import styled from 'styled-components'
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`

const ReaderView = () => {
  const { bookId: routeBookId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useContext(AppContext)
  const { activeBook, currentPage } = state
  const totalPages = activeBook?.totalPages

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
    dispatch({ type: 'CLEAR_RENDERED_PAGES' })
    dispatch({ type: 'CLEAR_RENDERED_RANGES' })
  }, [routeBookId, dispatch])
  useMobileViewMode()

  // Preload pages and autosave reading progress  
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
      <Toolbar currentPage={currentPage} totalPages={totalPages} />
      <RenderedPDFViewer />
    </StyledReaderView>
  )
}

export default ReaderView
