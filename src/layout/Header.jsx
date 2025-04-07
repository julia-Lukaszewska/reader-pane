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
  background: var(--gradient-metal-blue-light); // zamiast indigo-shadow

  grid-row: 1;
  grid-column: 1/3;
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-dark-900);
  padding: 0 3rem;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.3);
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
  const { dispatch } = useContext(AppContext) // Access context for dispatch  
  const navigate = useNavigate() // Navigation hook  
  const location = useLocation() // Location hook  
  const isReaderView = location.pathname.startsWith('/read') // Check view  

  const goHome = () => navigate('/') // Go to home  
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' }) // Toggle app theme  

  return (
    <HeaderStyled>
      <BtnGroup>
        {/* Open menu button for sidebar   */}
        {!isReaderView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={onToggleSidebar} // Open sidebar menu  
            ariaLabel="Open menu" // Accessibility label  
          >
            <SlMenu /> {/* Sidebar icon   */}
          </Btn>
        )}
        <Btn
          $variant="circle_icon_btn"
          onClick={goHome} // Go home  
          ariaLabel="Go to home" // Accessibility label  
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

// Export header component  
export default Header
