// -----------------------------------------------------------------------------
//------ Switch: Theme toggle component  
// -----------------------------------------------------------------------------

import { useContext } from 'react' // React hook for accessing context  
import styled from 'styled-components' // CSS-in-JS library  
import { AppContext } from '../context/AppContext.jsx' // Global state context  
import Btn from './Btn' // Custom button component  
import { LuSun, LuMoon } from 'react-icons/lu' // Icons for theme switch  

// -----------------------------------------------------------------------------
//------- Styled components  
// -----------------------------------------------------------------------------

const SwitchContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  color: var(--color-brand-100);
  z-index: 2;
`  

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
//------ Switch component  
// -----------------------------------------------------------------------------

const Switch = () => {
  const { state, dispatch } = useContext(AppContext) // Access state and dispatch from context  

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_THEME' }) // Trigger theme toggle action  
  }

  const icons = [<LuSun key="sun" />, <LuMoon key="moon" />] // Theme icons array  
  const thumbPosition = state.theme === 'light' ? '2px' : 'calc(100% - 26px)' // Thumb X-position based on theme  
  const thumbColor = state.theme === 'light' ? '#ffffffcc' : '#aad0ff' // Thumb color based on theme  

  return (
    <Btn
      $variant="theme_switch_btn" // Custom style variant for theme switch  
      onClick={handleClick}
      ariaLabel="Przełącz motyw" // ARIA label for accessibility  
    >
      {/* Thumb element indicating current theme   */}
      <Thumb
        theme={state.theme}
        style={{ left: thumbPosition, background: thumbColor }}
      />

      {/* Container for theme icons   */}
      <SwitchContent>{icons}</SwitchContent>
    </Btn>
  )
}

export default Switch // Export Switch component  
