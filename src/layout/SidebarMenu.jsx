import React from 'react'  
import styled from 'styled-components'  
import Btn from '../components/Btn'  
import { useNavigate } from 'react-router-dom'  

// -----------------------------------------------------------------------------
//------ StyledMenu   
// -----------------------------------------------------------------------------

const StyledMenu = styled.nav`
  display: flex;  
  flex-direction: column;  
  gap: 1.2rem;  
  margin: 2rem 0;  
  align-items: center;  
  grid-row: 2;  
`

// -----------------------------------------------------------------------------
//------ SidebarMenu   
// -----------------------------------------------------------------------------

const SidebarMenu = ({ $isOpen }) => {
  const navigate = useNavigate()  

  return (
    <StyledMenu $isOpen={$isOpen}>
      {/* Navigate button to home page   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/')}>
        Strona Główna
      </Btn>

      {/* Navigate button to library   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/library')}>
        Biblioteka
      </Btn>

      {/* Navigate button to settings   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/settings')}>
        Ustawienia
      </Btn>

      {/* Navigate button to trash   */}
      <Btn $variant="sidebar_btn" onClick={() => navigate('/deleted')}>
        Kosz
      </Btn>
    </StyledMenu>
  )
}

 
// Exports SidebarMenu component for use in other parts of the app
export default SidebarMenu
