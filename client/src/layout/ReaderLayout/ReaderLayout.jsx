// ReaderLayout.jsx
import styled from 'styled-components'
import ReaderSessionController from '@/controllers/ReaderSessionController'
import { ReaderToolbar } from '@reader/ReaderToolbar'
import ReaderView from '@/views/ReaderView'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ReaderLayout = () => (
  <Container>
    <ReaderSessionController>
      {({ pdfRef, visiblePages }) => (
        <>
          <ReaderToolbar 
            pdfRef={pdfRef} 
            visiblePages={visiblePages} 
          />
          <ReaderView 
            pdfRef={pdfRef} 
            visiblePages={visiblePages} 
          />
        </>
      )}
    </ReaderSessionController>
  </Container>
)

export default ReaderLayout
