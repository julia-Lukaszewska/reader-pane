import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const ReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  box-sizing: border-box;
  z-index: 200;
`

const ToolbarPlaceholder = styled.div`
  color: var(--color-dark-900);
  padding: 1.2rem 2rem;
  border-radius: var(--border-radius);

  background: var(--gradient-main);
  box-shadow: var(--glass-shadow);
  text-shadow: var(--glass-text-shadow);
  font-weight: bold;
  height: 8%;
  transition: all 0.3s ease;
`

const PDFViewPlaceholder = styled.div`
  flex: 1;

  display: flex;

  background: var(--gradient-main-v5);
  justify-content: center;
  align-items: center;

  font-size: 1.6rem;
  text-align: center;
  transition: all 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ ReaderView Component   
// -----------------------------------------------------------------------------

const ReaderView = () => {
  return (
    <ReaderContainer>
      <ToolbarPlaceholder> </ToolbarPlaceholder>
      <PDFViewPlaceholder></PDFViewPlaceholder>
    </ReaderContainer>
  )
}

export default ReaderView
