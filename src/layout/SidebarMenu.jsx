import React from 'react'
import styled from 'styled-components'
import Btn from '../components/Btn'
import { useNavigate } from 'react-router-dom'

// -----------------------------------------------------------------------------
//------ SidebarMenu: Navigation menu inside sidebar  
// -----------------------------------------------------------------------------

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
  align-items: center;
  grid-row: 2;

  & > * {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateX(0)' : 'translateX(10vw)'};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    filter: ${({ $isOpen }) => ($isOpen ? 'brightness(1)' : 'brightness(1.4)')};
    transition:
      opacity 0.6s ease-out,
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 0.4s ease;
  }
`

const SidebarMenu = ({ $isOpen }) => {
  const navigate = useNavigate()

  return (
    <StyledMenu $isOpen={$isOpen}>
      {/* Home page button   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/')}>
        Home
      </Btn>

      {/* Reader view button   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/read')}>
        Reader
      </Btn>

      {/* Library view button   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/library')}>
        Library
      </Btn>

      {/* Settings page button   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/settings')}>
        Settings
      </Btn>

      {/* Archive view button   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/deleted')}>
        Archive
      </Btn>
    </StyledMenu>
  )
}

export default SidebarMenu
