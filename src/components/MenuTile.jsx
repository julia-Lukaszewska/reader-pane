// -----------------------------------------------------------------------------
//------ MenuTile: Interactive menu tile with expand/collapse logic  
// -----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components' // styled-components for CSS-in-JS  
import { IoCloseOutline } from 'react-icons/io5' // Icon for close button  
import { useMenuItem } from '../hooks/useMenuItem' // Custom hook to handle tile logic  

// -----------------------------------------------------------------------------
//------ StyleMenuTile: Main tile container style  
// -----------------------------------------------------------------------------

const StyleMenuTile = styled.div`
  position: absolute; // Absolute positioning for precise placement  
  width: ${({ $isActive }) =>
    $isActive
      ? '30vh'
      : '30vh'}; // Tile width, constant for active/inactive  
  height: ${({ $isActive }) =>
    $isActive
      ? '40vh'
      : '30vh'}; // Dynamic height based on active state  
  display: flex; // Flexbox for centering content  
  justify-content: center;
  align-items: center;
  cursor: pointer; // Pointer cursor indicates clickable tile  
  rotate: ${({ $isActive }) =>
    $isActive
      ? '0deg'
      : '45deg'}; // Rotation animation depending on tile state  
  transition: all 0.4s ease; // Smooth transition effects  
  transform: ${({ $isActive, $position }) =>
    $isActive
      ? 'translate(0%, -20%)'
      : `translate(${$position?.x || '0%'}, ${$position?.y || '0%'})`}; // Dynamic positioning based on active state  
  border-radius: ${({ $isActive }) =>
    $isActive
      ? '2rem'
      : '1rem'}; // Rounded corners  
  scale: ${({ $isActive }) =>
    $isActive
      ? 3
      : 1}; // Scale up tile when active  
  z-index: ${({ $isActive }) =>
    $isActive
      ? 10
      : 1}; // Active tile overlay  
  background: var(
    --gradient-blue-glass
  ); // Gradient glass background adapts to theme  
  background-color: ${({ color }) =>
    color ||
    'var(--color-light-200)'}; // Fallback solid color  
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? 'none'
      : 'var(--glass-shadow)'}; // Shadow adapts to theme  
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'all')};

  &:hover {
    z-index: ${({ $isActive }) =>
      $isActive
        ? 10
        : 5}; // Hover brings tile forward  
    transform: ${({ $isActive, $position }) =>
      $isActive
        ? 'translate(0%, -20%)'
        : `translate(${$position?.x || '0%'}, ${$position?.y || '0%'}) scale(1.05)`}; // Slightly enlarge on hover  
    box-shadow: ${({ $isActive }) =>
      $isActive
        ? 'none'
        : 'var(--shadow-lg)'}; // Hover shadow  
  }
`

// -----------------------------------------------------------------------------
//------ StyledLabel: Label shown when tile is inactive  
// -----------------------------------------------------------------------------

const StyledLabel = styled.span`
  font-size: 3rem; // Large font size for visibility  
  font-weight: 600; // Bold font weight  
  text-transform: uppercase; // Uppercase letters for emphasis  
  letter-spacing: 0.5px; // Spacing for readability  
  text-shadow: var(
    --glass-text-shadow
  ); // Text shadow adapts to theme  
  transform: rotate(
    -45deg
  ); // Label rotated to match inactive tile  
  color: var(
    --color-dark-900
  ); // Text color based on theme  
`

// -----------------------------------------------------------------------------
//------ CloseButton: Closes the tile when active  
// -----------------------------------------------------------------------------

const CloseButton = styled.button`
  position: absolute; // Absolute position within tile  
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem; // Icon size  
  cursor: pointer;
  color: var(
    --color-dark-900
  ); // Close button color adapts to theme  
  text-shadow: var(
    --glass-text-shadow
  ); // Text shadow based on theme  
  pointer-events: auto;
  z-index: 999;

  &:hover {
    transform: scale(
      1.2
    ); // Enlarge close button on hover  
  }
`

// -----------------------------------------------------------------------------
//------ MenuTile Component  
// -----------------------------------------------------------------------------

const MenuTile = ({ name, route, color, position, label, children }) => {
  // Get tile state and handlers  
  const { $isActive, handleClick, handleClose } = useMenuItem(name, route)

  // Handle tile click when tile is inactive  
  const handleTileClick = (e) => {
    if (!$isActive) {
      e.stopPropagation() // Stop event from reaching parent elements  
      handleClick() // Activate tile  
    }
  }

  return (
    <StyleMenuTile
      $isActive={$isActive} // Apply active state styles  
      onClick={!$isActive ? handleTileClick : undefined} // Click handler only when inactive  
      color={color} // Background color  
      $position={position} // Tile position  
    >
      {/* Label visible only when tile is inactive   */}
      {!$isActive && <StyledLabel>{label}</StyledLabel>}

      {/* Content and close button shown when tile is active   */}
      {$isActive && (
        <>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation() // Prevent click from bubbling up  
              handleClose() // Deactivate tile  
            }}
          >
            <IoCloseOutline size={30} color="white" />{' '}
            {/* Close icon   */}
          </CloseButton>
          {children}{' '}
          {/* Additional content inside tile   */}
        </>
      )}
    </StyleMenuTile>
  )
}

// -----------------------------------------------------------------------------
//------ Export MenuTile  
// -----------------------------------------------------------------------------

export default MenuTile
