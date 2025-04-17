//-----------------------------------------------------------------------------
//------ Toolbar: Top navigation inside reader view  
//-----------------------------------------------------------------------------

import styled from 'styled-components'
import Switch from '../components/Switch'
import PDFZoomControls from '../components/PDFZoomControls'
import PDFPageControls from '../components/PDFPageControls'

import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const StyledToolbar = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 100vw;
  padding: 2rem 3rem;
  background: var(--gradient-metal-blue-light);
  border-bottom: 0.8rem solid var(--color-metal-100);
  overflow: hidden;
`

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Toolbar = () => {
  const navigate = useNavigate()

  return (
    <StyledToolbar>
      <LeftSection>
        {/* Back button to library   */}
        <IoArrowBack
          size={32}
          color="white"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/library')}
        />

        {/* Theme switcher (reader variant)   */}
        <Switch variant="reader" />
      </LeftSection>

      <CenterSection>
        {/* Zoom controls   */}
        <PDFZoomControls />

        {/* Page navigation controls   */}
        <PDFPageControls />
      </CenterSection>
    </StyledToolbar>
  )
}

export default Toolbar
