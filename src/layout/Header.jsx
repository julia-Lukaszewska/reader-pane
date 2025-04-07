// -----------------------------------------------------------------------------
//------ Header: Top navigation bar component  
// -----------------------------------------------------------------------------

import React, { useContext } from 'react' // React library for building user interfaces  
import { AppContext } from '../context/AppContext' // AppContext for global state management  
import styled from 'styled-components' // Styled-components for styling with CSS in JS  
import Btn from '../components/Btn' // Button component for navigation  
import { useNavigate, useLocation } from 'react-router-dom' // Hooks for navigation and location  
import Switch from '../components/Switch' // Component for theme toggle  
import { SlHome, SlMenu } from 'react-icons/sl' // Icons from react-icons  

// -----------------------------------------------------------------------------
//------ Header styles   
// -----------------------------------------------------------------------------

const HeaderStyled = styled.header`
  background: var(--gradient-blue-clear);
  // Background gradient  

  grid-row: 1;
  grid-column: 1/3;
  height: 10vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--color-dark-900);
  padding: 0 3rem;
  box-shadow: var(--shadow-lg);
  z-index: 100;
`

// -----------------------------------------------------------------------------
//------ Title styles   
// -----------------------------------------------------------------------------

const Title = styled.h1`
  font-size: 2.4rem;  
  font-weight: 300;  
  text-transform: uppercase;  
  letter-spacing: 0.4rem;  

  flex-grow: 1;  
  text-align: center;  
  margin-left: -4rem;  
  font-family: 'Poppins', sans-serif;  
  color: var(--color-dark-900);
  text-shadow: var(--glass-text-shadow);
  transition: color 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ Button group styles   
// -----------------------------------------------------------------------------

const BtnGroup = styled.div`
  display: flex;  
  align-items: center;  
  gap: 1.2rem;  
`

// -----------------------------------------------------------------------------
//------ Header component   
// -----------------------------------------------------------------------------

const Header = ({ onToggleSidebar }) => {
  const { dispatch } = useContext(AppContext) // Get dispatch function from context  
  const navigate = useNavigate() // Hook for page navigation  
  const location = useLocation() // Hook for current location path  
  const isReaderView = location.pathname.startsWith('/read') // Check if in reader view  

  const goHome = () => navigate('/') // Navigate to homepage  
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' }) // Dispatch theme toggle action  

  return (
    <HeaderStyled>
      <BtnGroup>
        {/* Menu button (hidden in reader view)   */}
        {!isReaderView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={onToggleSidebar} // Trigger sidebar toggle  
            ariaLabel="Open menu" // ARIA label for accessibility  
          >
            <SlMenu /> {/* Menu icon   */}
          </Btn>
        )}

        <Btn
          $variant="circle_icon_btn"
          onClick={goHome} // Navigate to home  
          ariaLabel="Go to home" // ARIA label for accessibility  
        >
          <SlHome /> {/* Home icon   */}
        </Btn>
      </BtnGroup>
      <Title>Pane</Title> {/* App title   */}
      <BtnGroup>
        <Switch variant="theme" onClick={toggleTheme} />{' '}
        {/* Theme switcher   */}
      </BtnGroup>
    </HeaderStyled>
  )
}

// -----------------------------------------------------------------------------
//------ Export Header component   
// -----------------------------------------------------------------------------

export default Header
