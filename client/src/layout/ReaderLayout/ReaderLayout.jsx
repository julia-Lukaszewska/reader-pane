/**
 * @file src/layout/ReaderLayout.jsx
 * @description
 * Layout wrapper for the PDF reader view.
 *
 * Responsibilities:
 * - Composes the reader toolbar and main reading view
 * - Resets reader state on unmount (e.g. when navigating away)
 *
 * Components:
 * - <ReaderToolbar /> – UI toolbar with view/zoom controls
 * - <ReaderView /> – Main rendering area for PDF pages
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetReaderState } from '@/store/slices/readerSlice'
import { ReaderToolbar } from '@reader/ReaderToolbar'
import ReaderView from '@/views/ReaderView'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

//-----------------------------------------------------------------------------
// Component: ReaderLayout
//-----------------------------------------------------------------------------
/**
 * Wrapper layout for the PDF reader.
 * Resets reader state when unmounted.
 */
const ReaderLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetReaderState())
    }
  }, [dispatch])

  return (
    <Container>
      <ReaderToolbar />
      <ReaderView />
    </Container>
  )
}

export default ReaderLayout
