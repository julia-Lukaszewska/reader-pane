import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const ReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 2rem;
  background: var(--gradient-blue-clear); // 🌞 jasny lub 🌙 ciemny gradient
  transition: background 0.3s ease;
  box-sizing: border-box;
`

const ToolbarPlaceholder = styled.div`
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  color: var(--color-dark-900);
  padding: 1.2rem 2rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--glass-shadow);
  text-shadow: var(--glass-text-shadow);
  font-weight: bold;
  height: 8%;
  transition: all 0.3s ease;
`

const PDFViewPlaceholder = styled.div`
  flex: 1;
  border: 2px dashed var(--color-blue-300);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-dark-900);
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
