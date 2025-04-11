import React from 'react' // React core  
import { useNavigate } from 'react-router-dom' // Navigation hook  
import Btn from './Btn' // Custom button component  
import styled from 'styled-components' // Styling  

// -----------------------------------------------------------------------------
//------ Styled components  
// -----------------------------------------------------------------------------

const PositionedBtn = styled.div`
  position: relative;
  rotate: 45deg;
  z-index: 2000;
  width: 80%;
`  

const LabelText = styled.span`
  font-size: clamp(1rem, 2.5vh, 1.4rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  z-index: 2100;
`  

// -----------------------------------------------------------------------------
//------ MenuTileBtn component  
// -----------------------------------------------------------------------------

const MenuTileBtn = ({ label, route }) => {
  const navigate = useNavigate() // Hook for programmatic navigation  

  const handleClick = (e) => {
    e.stopPropagation() // Prevent tile from closing  
    if (route) navigate(route) // Go to route if provided  
  }

  return (
    <PositionedBtn>
      <Btn $variant="menu_tile_btn" onClick={handleClick}>
        <LabelText>{label}</LabelText>
      </Btn>
    </PositionedBtn>
  )
}

export default MenuTileBtn // Export component  
