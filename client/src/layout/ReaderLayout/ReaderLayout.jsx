// ReaderLayout.jsx
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetReaderState } from '@/store/slices/readerSlice'
import { ReaderToolbar } from '@reader/ReaderToolbar'
import ReaderView from '@/views/ReaderView'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ReaderLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetReaderState())
      console.log('[ReaderLayout] resetReaderState triggered')
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
