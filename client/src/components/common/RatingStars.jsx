/**
 * @file RatingStars.jsx
 * @description
 * Interactive and reusable star rating component.
 * Supports keyboard navigation and mouse interactions.
 * Can be rendered in editable or read-only mode.
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const Stars = styled.div`
  display: inline-flex;
  gap: 0.2em;
  cursor: ${({ $editable }) => ($editable ? 'pointer' : 'default')};
`

const Star = styled.span`
  font-size: ${({ $size }) => $size};
  color: ${({ $active }) =>
    $active ? 'var(--color-yellow-400)' : 'rgba(255, 255, 255, 0.356)'};
  transition: color 0.15s, transform 0.1s;

  &:hover,
  &:focus {
    color: var(--color-yellow-300);
    transform: ${({ $editable }) => ($editable ? 'scale(1.13)' : 'none')};
  }
`

//-----------------------------------------------------------------------------
// Component: RatingStars
//-----------------------------------------------------------------------------

/**
 * Renders star-based rating UI.
 *
 * @component
 * @param {Object} props
 * @param {number} props.value - Current selected rating value
 * @param {Function} [props.onChange] - Callback triggered when rating changes
 * @param {boolean} [props.editable=false] - If true, stars are interactive
 * @param {number} [props.max=5] - Maximum number of stars to display
 * @param {string} [props.size='1em'] - Size of the star icons
 * @returns {JSX.Element}
 */
export default function RatingStars({
  value = 0,
  onChange,
  editable = false,
  max = 5,
  size = '1em',
}) {
  const [hoverValue, setHoverValue] = useState(0)
  const displayValue = hoverValue || value

  const handleClick = (i) => {
    if (editable && onChange) {
      onChange(i + 1)
    }
  }

  return (
    <Stars $editable={editable} onMouseLeave={() => setHoverValue(0)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          $active={i < displayValue}
          $size={size}
          $editable={editable}
          onMouseEnter={() => editable && setHoverValue(i + 1)}
          onClick={() => handleClick(i)}
          role={editable ? 'button' : undefined}
          tabIndex={editable ? 0 : -1}
          onKeyDown={(e) => {
            if (editable && (e.key === 'Enter' || e.key === ' ')) {
              handleClick(i)
            }
          }}
          title={`Rating: ${i + 1}/${max}`}
        >
          <FaStar />
        </Star>
      ))}
    </Stars>
  )
}
