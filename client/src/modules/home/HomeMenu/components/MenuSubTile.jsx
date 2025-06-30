/**
 * @file MenuSubTile.jsx
 * @description Sub-tile rendered inside an active MenuTile.
 * Hoverable square with animation, used for routing.
 */

//-----------------------------------------------------
//------ MenuSubTile
//-----------------------------------------------------

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

//-----------------------------------------------------
//------ Animations
//-----------------------------------------------------


//-----Rotate-in per tile area
//-----------------------------------------------------

const rotateIn = {
  LT: keyframes`
    from { transform: scale(0.85) rotate(135deg); opacity: 0; }
    to   { transform: scale(1)    rotate(0deg);   opacity: 1; }
  `,
  RT: keyframes`
    from { transform: scale(0.85) rotate(-135deg); opacity: 0; }
    to   { transform: scale(1)    rotate(0deg);    opacity: 1; }
  `,
  LB: keyframes`
    from { transform: scale(0.85) rotate(45deg); opacity: 0; }
    to   { transform: scale(1)    rotate(0deg);  opacity: 1; }
  `,
  RB: keyframes`
    from { transform: scale(0.85) rotate(-45deg); opacity: 0; }
    to   { transform: scale(1)    rotate(0deg);   opacity: 1; }
  `,
}

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------


//---- StyledSubTile
//-----------------------------------------------------

const StyledSubTile = styled.div`
  grid-area: ${({ $area }) => $area};
  width: 80%;
  height: 80%;
  margin: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  //------ Visual
  background: var(--menu-tile-bg-active);
  border: 2px solid rgba(22, 67, 95, 0.193);
  border-radius: 0.6em;

  box-shadow:
    inset 0 0 1em rgba(36, 70, 98, 0.63),
    0 0 0.9rem rgba(7, 60, 158, 0.25);

  backdrop-filter: blur(9px) saturate(110%);

  //------ Animation control
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  animation: ${({ $area }) => rotateIn[$area]} 0.8s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  //------ Interaction
  transition:
    transform 0.3s ease,
    box-shadow 0.5s ease,
    backdrop-filter 0.6s ease,
    filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      inset 0 0 0.6rem rgba(22, 5, 5, 0.1),
      0 0 1.2rem rgba(15, 21, 29, 0.831);
    filter: brightness(1.15);
  }
`

//----- Label
//-----------------------------------------------------

const Label = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%) rotate(-135deg);
  transform-origin: center center;
  color: #fff;
  font-size: 90%;
  font-weight: 500;
  user-select: none;
  z-index: 5002;
`

//-----------------------------------------------------
//------ Component
//-----------------------------------------------------

/**
 * @function MenuSubTile
 * @description Animated sub-tile used within MenuTile for route navigation.
 *
 * @param {Object} props
 * @param {string} props.label - Text label inside the tile
 * @param {string} props.route - Route path to navigate to
 * @param {string} props.$area - Grid area (LT, RT, LB, RB)
 * @param {boolean} props.$active - Visibility and animation trigger
 * @param {string} [props.$delay] - Optional delay for animation
 * @returns {JSX.Element}
 */
const MenuSubTile = ({ label, route, $area, $active, $delay }) => {
  const navigate = useNavigate()

  return (
    <StyledSubTile
      $area={$area}
      $active={$active}
      $delay={$delay}
      onClick={(e) => {
        e.stopPropagation()
        navigate(route)
      }}
    >
      <Label>{label}</Label>
    </StyledSubTile>
  )
}

export default MenuSubTile
