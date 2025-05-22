/**
 * @file MenuTileBtn.jsx
 * @description Inner button used inside MenuTile to navigate on click.
 * Rotated to match tile orientation and styled to fit compact space.
 */

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Button component rendered inside a MenuTile.
 * On click, navigates to the provided route.
 *
 * @param {Object} props
 * @param {string} props.label - Button label text
 * @param {string} props.route - Path to navigate to
 */
const MenuTileBtn = ({ label, route }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    if (route) navigate(route)
  }

  return (
    <PositionedBtn>
      <Button $variant="menu_tile_btn" onClick={handleClick}>
        <LabelText>{label}</LabelText>
      </Button>
    </PositionedBtn>
  )
}

export default MenuTileBtn
