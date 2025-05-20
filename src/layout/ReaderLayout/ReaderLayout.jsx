import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReaderToolbar } from '@reader'
import {useSaveProgressOnUnmount, useInitReadingProgress } from '@reader/hooks'
import { selectActiveBookId } from '@/store/selectors'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

// Layout component — must be default export for React.lazy to work
const ReaderLayout = () => {
  // Get current active book ID from Redux
  const bookId = useSelector(selectActiveBookId)

  // Initialize reading progress on mount
  useInitReadingProgress(bookId)
  // Save reading progress on unmount
  useSaveProgressOnUnmount(bookId)

  return (
    <Container>
      <ReaderToolbar />
      <Outlet />
    </Container>
  )
}

export default ReaderLayout