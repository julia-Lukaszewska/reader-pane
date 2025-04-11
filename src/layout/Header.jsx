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
  background:
    linear-gradient(
      37deg,
      #2f6eb23a 20%,
      #6fafe642 45%,
      #9bd4ff1c 70%,
      #417cbf2f 100%
    ),
    linear-gradient(
      125deg,
      rgba(64, 172, 255, 0.549) 0%,
      rgba(30, 32, 106, 0.47) 50%,
      rgba(61, 105, 171, 0.08) 100%
    ),
    repeating-linear-gradient(
      70deg,
      rgba(255, 255, 255, 0.04) 0px,
      rgba(8, 75, 88, 0.578) 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(222, 222, 222, 0.03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.02) 0px,
      rgba(127, 196, 198, 0.441) 20%,
      rgba(0, 0, 0, 0.02) 1px,
      rgba(0, 0, 0, 0.02) 2px
    );

  grid-row: 1;
  grid-column: 1/3;
  height: 10vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: white;
  padding: 0 3rem;

  border-bottom: 0.2rem solid rgba(150, 232, 255, 0.315); // Border color  

  z-index: 1;
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
  color: white;
  text-shadow: var(--color-);
  transition: color 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ Button group styles   
// -----------------------------------------------------------------------------

const BtnGroup = styled.div`
  display: flex;  
  align-items: center;  
  gap: 1.2rem;  
  color: white;  
`

// -----------------------------------------------------------------------------
//------ Header component   
// -----------------------------------------------------------------------------

const Header = ({ onToggleSidebar }) => {
  const { dispatch } = useContext(AppContext) // Get dispatch function from context  
  const navigate = useNavigate() // Hook for page navigation  
  const location = useLocation() // Hook for current location path  
  const isHomeView = location.pathname === '/' // Check if current path is home  

  const goHome = () => navigate('/') // Navigate to homepage  
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' }) // Dispatch theme toggle action  

  return (
    <HeaderStyled>
      <BtnGroup>
        {/* Menu button (hidden in reader view)   */}
        {!isHomeView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={onToggleSidebar} // Trigger sidebar toggle  
            ariaLabel="Open menu" // ARIA label for accessibility  
          >
            <SlMenu /> {/* Menu icon   */}
          </Btn>
        )}
        {!isHomeView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={goHome} // Navigate to home  
            ariaLabel="Go to home" // ARIA label for accessibility  
          >
            <SlHome /> {/* Home icon   */}
          </Btn>
        )}
      </BtnGroup>
      <Title>Pane</Title> {/* App title   */}
      <BtnGroup>
        <Switch variant="theme" onClick={toggleTheme} />
        {/* Theme switcher   */}
      </BtnGroup>
    </HeaderStyled>
  )
}

// -----------------------------------------------------------------------------
//------ Export Header component   
// -----------------------------------------------------------------------------

export default Header
