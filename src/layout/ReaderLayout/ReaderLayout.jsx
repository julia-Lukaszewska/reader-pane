import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import ReaderToolbar from './ReaderToolbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ReaderLayout = () => (
  <Container>
    <ReaderToolbar />
    <Outlet />
  </Container>
)

export default ReaderLayout
