import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import ReaderToolbar from './ReaderToolbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
// Layout component — must be default export for React.lazy to work

const ReaderLayout = () => (
  <Container>
    <ReaderToolbar />
    <Outlet />
  </Container>
)

export default ReaderLayout  // Do not use `export const`, or React.lazy will fail

