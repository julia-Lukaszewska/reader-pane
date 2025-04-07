// -----------------------------------------------------------------------------
//------ SidebarMenu: Navigation menu inside sidebar  
// -----------------------------------------------------------------------------

import React from 'react' // React library for component creation  
import styled from 'styled-components' // Styled-components for component-level CSS  
import Btn from '../components/Btn' // Reusable button component  
import { useNavigate } from 'react-router-dom' // Hook to navigate programmatically  

// -----------------------------------------------------------------------------
//------ StyledMenu: Wrapper for sidebar buttons  
// -----------------------------------------------------------------------------

const StyledMenu = styled.nav`
  display: flex; // Vertical layout  
  flex-direction: column;
  gap: 1.2rem; // Space between buttons  
  margin: 2rem 0; // Vertical spacing  
  align-items: center; // Center items horizontally  
  grid-row: 2; // Place in second row of grid layout  

  // Animate each direct child (button)
  & > * {
    opacity: ${({ $isOpen }) =>
      $isOpen
        ? 1
        : 0}; // Show or hide based on sidebar state  
    transform: ${({ $isOpen }) =>
      $isOpen
        ? 'translateX(0)'
        : 'translateX(10vw)'}; // Slide in/out animation  
    filter: ${({ $isOpen }) =>
      $isOpen
        ? 'brightness(1)'
        : 'brightness(1.4)'}; // Brighten when hidden  
    transition:
      opacity 0.6s ease-out,
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 0.4s ease; // Smooth transition  
  }
`

// -----------------------------------------------------------------------------
//------ SidebarMenu component  
// -----------------------------------------------------------------------------

const SidebarMenu = ({ $isOpen }) => {
  const navigate = useNavigate() // React Router hook to change pages programmatically  

  return (
    <StyledMenu $isOpen={$isOpen}>
      {/* Home page button – returns to main screen   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/')}>
        Strona Główna
      </Btn>

      {/* Reader view – opens reading mode (bookId to be replaced dynamically)   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/read/:bookId')}>
        Reader
      </Btn>

      {/* Library page – shows added books   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/library')}>
        Library
      </Btn>

      {/* Settings page – app configuration   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/settings')}>
        Settings
      </Btn>

      {/* Trash – shows deleted books or notes   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/deleted')}>
        Archive
      </Btn>
    </StyledMenu>
  )
}

// -----------------------------------------------------------------------------
//------ Export SidebarMenu component  
// -----------------------------------------------------------------------------

export default SidebarMenu
