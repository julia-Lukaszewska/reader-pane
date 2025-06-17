// ReaderLayout.jsx
import styled from 'styled-components'

import { ReaderToolbar } from '@reader/ReaderToolbar'
import ReaderView from '@/views/ReaderView'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ReaderLayout = () => (
  <Container>
    <ReaderToolbar />   
    <ReaderView />
  </Container>
)

export default ReaderLayout
