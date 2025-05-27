/**
 * @file MenuSubTile.jsx
 * @description Smaller interactive tile rendered inside expanded MenuTile.
 */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const StyledSubTile = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  margin:10%;
  rotate: 45deg;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
   background: ${({ $isActive, $inactiveColor }) =>
    $isActive
      ? 'var(--tile-bg-active)'
      : $inactiveColor ||
        `linear-gradient(
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
        )`};
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.8rem;
  box-shadow: var(--subtile-shadow);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    scale: 1.1;
    backdrop-filter: blur(6px);
  }
`

const Label = styled.span`
  transform: rotate(-45deg);
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  white-space: nowrap;
  user-select: none;
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Small interactive sub-tile for quick actions within main tiles.
 *
 * @param {Object} props
 * @param {string} props.label - Label displayed on the tile
 * @param {string} props.route - Route to navigate to on click
 */
const MenuSubTile = ({ label, route }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    if (route) navigate(route)
  }

  return (
    <StyledSubTile onClick={handleClick}>
      <Label>{label}</Label>
    </StyledSubTile>
  )
}

export default MenuSubTile
