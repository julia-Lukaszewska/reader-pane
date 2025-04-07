import { useContext } from 'react' // React hook for accessing context  
import styled from 'styled-components' // CSS-in-JS library  
import { AppContext } from '../context/AppContext.jsx' // Global state context  
import Btn from './Btn' // Custom button component  
import { LuSun, LuMoon } from 'react-icons/lu' // Icons for theme switch  

// -----------------------------------------------------------------------------
// Styled components  
// -----------------------------------------------------------------------------

// Container for icons inside the switch button  
const SwitchContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  color: var(--color-brand-100);
  z-index: 2;
`

// Visual thumb that slides to indicate current theme  
const Thumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ theme }) => (theme === 'light' ? '2px' : 'calc(100% - 26px)')};

  width: 24px;
  height: 24px;
  border-radius: 50%;

  background: ${({ theme }) => (theme === 'light' ? '#ffffffcc' : '#aad0ff')};

  box-shadow: 0 0 0.6rem rgba(255, 255, 255, 0.4);
  transition: all 0.35s ease;
  z-index: 1;
`

// -----------------------------------------------------------------------------
// Switch component  
// -----------------------------------------------------------------------------

const Switch = () => {
  const { state, dispatch } = useContext(AppContext) // Get theme state from context  

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_THEME' }) // Toggle theme mode  
  }

  const icons = [<LuSun key="sun" />, <LuMoon key="moon" />] // Theme icons  
  const thumbPosition = state.theme === 'light' ? '2px' : 'calc(100% - 26px)' // Thumb position  
  const thumbColor = state.theme === 'light' ? '#ffffffcc' : '#aad0ff' // Thumb color  

  return (
    <Btn
      $variant="theme_switch_btn" // Custom style variant  
      onClick={handleClick}
      ariaLabel="Przełącz motyw" // Accessibility label  
    >
      {/* Moving thumb circle   */}
      <Thumb
        theme={state.theme}
        style={{ left: thumbPosition, background: thumbColor }}
      />

      {/* Switch icons container   */}
      <SwitchContent>{icons}</SwitchContent>
    </Btn>
  )
}

export default Switch // Export switch component  
