// src/components/MenuTile.jsx

/**
 * @file MenuTile.jsx
 * @description Main animated tile with sub-tiles. Handles click activation,
 *              close button, layout, and animation. Temporarily disables
 *              "Bookmarked Pages" and "Reading History" sub-tiles, and
 *              points all settings sub-tiles to /settings.
 */

import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'

import  useMenuItem from '../hooks/useMenuItem'
import { getLastBookId } from '@/utils'
import MenuSubTile from './MenuSubTile'

//-----------------------------------------------------
// Animations
//-----------------------------------------------------

const rotateAndScaleIn = keyframes`
  0%   { transform: rotate(0deg) scale(0.4); }
  60%  { transform: rotate(90deg) scale(1.08); }
  80%  { transform: rotate(92deg) scale(1.1); }
  100% { transform: rotate(90deg) scale(1.1); }
`

const rotateAndScaleOut = keyframes`
  from { transform: rotate(0deg) scale(1.5); }
  to   { transform: rotate(-90deg) scale(1); }
`

//-----------------------------------------------------
// Styled Components: Tile Container
//-----------------------------------------------------

const StyledTile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  cursor: pointer;

  background: linear-gradient(
    140deg,
    rgba(65, 132, 255, 0.726) 0%,
    rgba(160, 200, 216, 0.247) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );

  filter: brightness(1.2) saturate(100%) contrast(0.9);

  box-shadow:
    inset 0 0 0.6rem rgba(255, 255, 255, 0.411),
    0 0 0.9rem rgba(0, 0, 0, 0.25);

  grid-area: ${({ $isActive, $area }) =>
    $isActive ? '1 / 1 / 3 / 3' : $area};

  ${({ $isActive }) =>
    $isActive
      ? css`
          animation: ${rotateAndScaleIn} 1.3s ease forwards;
        `
      : css`
          animation: ${rotateAndScaleOut} 1.5s ease forwards;
        `}

  overflow: hidden;
  z-index: ${({ $isActive }) => ($isActive ? 8000 : 1100)};
  transform-origin: center;
  transition: transform 0.9s ease, filter 0.3s ease;

  ${({ $isActive }) =>
    !$isActive &&
    css`
      &:hover {
        filter: brightness(1.1);
        transform: scale(2) rotate(90deg);
      }
    `}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: opacity 0.4s ease;
    z-index: 1000;
  }
`

const StyledLabel = styled.span`
  position: absolute;
  font-size: 90%;
  font-weight: 500;
  opacity: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  transform: rotate(45deg);
  z-index: 1000;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 200%;
  color: white;
  cursor: pointer;
  z-index: 9101;

  &:hover {
    transform: scale(1.4);
  }
`

//-----------------------------------------------------
// Styled Components: SubTile Container
//-----------------------------------------------------

const SubTilesContainer = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  height: 100%;
  padding: 3%;
  grid-template-areas: 'LT RT' 'LB RB';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  z-index: 9000;

  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0.9)')};
  transition: transform 0.6s ease;

  & > * {
    opacity: ${({ $active }) => ($active ? 0 : 1)};
    transition: opacity 0.9s ease;
    pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  }
`

//-----------------------------------------------------
// SubTile Presets (modified per request)
//-----------------------------------------------------

const presets = () => {
  const last = getLastBookId()
  return {
    library: [
      { label: 'View All Books', route: '/library', area: 'LT' },
      { label: 'Your Favorites', route: '/library/favorites', area: 'RT' },
      { label: 'Import Books', route: '/library/import', area: 'LB' },
      { label: 'Archive', route: '/library/archive', area: 'RB' },
    ],
    reader: [
      {
        label: 'Continue Reading',
        route: last ? `/read/${last}` : '/read',
        area: 'LT',
      },
      { label: 'Choose a Book', route: '/library', area: 'RT' },
      // Bookmarked Pages and Reading History are temporarily disabled
      { label: 'Bookmarked Pages', route: null, area: 'LB' },
      { label: 'Reading History', route: null, area: 'RB' },
    ],
    settings: [
      // All settings sub-tiles point simply to /settings for now
      { label: 'Theme Settings', route: '/settings', area: 'LT' },
      { label: 'Language Settings', route: '/settings', area: 'RT' },
      { label: 'Progress Settings', route: '/settings', area: 'LB' },
      { label: 'All Settings', route: '/settings', area: 'RB' },
    ],
  }
}

//-----------------------------------------------------
// Component: MenuTile
//-----------------------------------------------------

/**
 * @function MenuTile
 * @description Main animated tile component with optional sub-tiles.
 *
 * @param {Object} props
 * @param {string} props.name           - Tile name (e.g. 'library', 'reader', 'settings')
 * @param {string} props.area           - Grid area identifier (LT, RT, LB, RB)
 * @param {string} props.label          - Text label when tile is inactive
 * @param {boolean} props.isAnyTileActive - Global active tile flag
 * @returns {JSX.Element}
 */
const MenuTile = ({ name, area, label, isAnyTileActive }) => {
  const { $isActive, handleClick, handleClose } = useMenuItem(name)
  const subTiles = presets()[name] || []
  const navigate = useNavigate()

  return (
    <StyledTile
      $area={area}
      $isActive={$isActive}
      onClick={(e) => {
        e.stopPropagation()
        if (!$isActive) handleClick()
      }}
    >
      {!$isActive && !isAnyTileActive && <StyledLabel>{label}</StyledLabel>}

      {$isActive && (
        <CloseButton
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
        >
          <IoCloseOutline />
        </CloseButton>
      )}

      <SubTilesContainer $active={$isActive}>
        {subTiles.map(({ label, route, area }, index) => (
          <MenuSubTile
            key={label}
            label={label}
            route={route}
            $area={area}
            $active={$isActive}
            $delay={`${(index + 1) * 0.1}s`}
            onClick={() => {
              if (route) {
                navigate(route)
              }
            }}
          />
        ))}
      </SubTilesContainer>
    </StyledTile>
  )
}

export default MenuTile
