/**
 * @file MenuTile.jsx
 * @description Interactive animated tile used for main menu navigation.
 * Expands on click and displays a label, close button and route button.
 */

import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import  useMenuItem  from './useMenuItem'
import styled from 'styled-components'
import  MenuSubTile  from './MenuSubTile'

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const StyledLabel = styled.span`
  font-size: clamp(0.8em, 2.5vh, 1.6em);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3rem; 
  color: white;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: rotate(-45deg);
  z-index: 1000;
  display: flex;
  align-items: center;
`

const StyleMenuTile = styled.div`
  position: absolute;
  width: ${({ $isActive }) => ($isActive ? '40vh' : '30vh')};
  height: ${({ $isActive }) => ($isActive ? '40vh' : '30vh')};
  display: flex;
  /* padding: ${({ $isActive }) => ($isActive ? '40%' : '2%')}; */
  justify-content: center;
  align-items: center;
  transform: ${({ $isActive, $position }) =>
    $isActive
      ? 'translate(20%, -30%)'
      : `translate(${$position?.x || '0%'}, ${$position?.y || '0%'})`};
  rotate: ${({ $isActive }) => ($isActive ? '-45deg' : '45deg')};
  scale: ${({ $isActive }) => ($isActive ? 1.5 : 1)};
  z-index: ${({ $isActive }) => ($isActive ? 1000 : 100)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'all')};
  cursor: pointer;
  transition: all 0.6s ease;
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
  border: ${({ $isActive }) =>
    $isActive
      ? '0.6px solid rgba(143, 236, 246, 0.46)'
      : '3px solid rgba(194, 249, 255, 0.996)'};
  border-radius: ${({ $isActive }) => ($isActive ? '1.2rem' : '1rem')};
  box-shadow: ${({ $isActive }) =>
    $isActive ? 'var(--tile-shadow-active)' : 'var(--tile-shadow-inactive)'};
  backdrop-filter: ${({ $isActive }) =>
    $isActive ? 'var(--tile-blur-active)' : 'var(--tile-blur-inactive)'};
`
const SubTilesContainer = styled.div`
  position: absolute;
  display: grid;
  padding: 3%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
  "LT RT"
  "LB RB";
 
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-dark-900);
  text-shadow: var(--glass-text-shadow);
  pointer-events: auto;
  z-index: 999;

  &:hover {
    transform: scale(1.2);
  }
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Tile used in the home menu for navigating to app sections.
 * Expands on click and displays content.
 *
 * @param {Object} props
 * @param {string} props.name - Unique tile identifier
 * @param {string} props.route - Route to navigate to
 * @param {string} props.color - Optional background color
 * @param {Object} props.position - x/y CSS values for positioning
 * @param {string} props.label - Text label
 * @param {boolean} props.isAnyTileActive - Controls inactive state
 * @param {string} [props.buttonLabel] - Optional label for inner button
 */
const MenuTile = ({
  name,
  route,
  color,
  position,
  label,
  isAnyTileActive,
  invertRotation = false,
  subTiles = [],
}) => {
  const { $isActive, handleClick, handleClose } = useMenuItem(name, route)

  const handleTileClick = (e) => {
    if (!$isActive) {
      e.stopPropagation()
      handleClick()
    }
  }

  return (
    <StyleMenuTile
      data-name={name}
      $isActive={$isActive}
      $position={position}
      color={color}
      $invertRotation={invertRotation}
      onClick={!$isActive ? handleTileClick : undefined}
    >
      {!$isActive && !isAnyTileActive && <StyledLabel>{label}</StyledLabel>}

       {$isActive && (
         <>
           <CloseButton
             onClick={(e) => {
               e.stopPropagation()
               handleClose()
             }}
           >
             <IoCloseOutline size={30} color="white" />
           </CloseButton>
       
       <SubTilesContainer>
            {subTiles.map(({ label, route, area }) => (
              <MenuSubTile
                key={label}
                label={label}
                route={route}
                style={{ gridArea: area }}
              />
            ))}
          </SubTilesContainer>
         </>
       )}

      
    </StyleMenuTile>
  )
}

export default MenuTile
