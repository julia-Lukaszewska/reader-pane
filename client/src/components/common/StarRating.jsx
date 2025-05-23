/**
 * @file StarRating.jsx
 * @description Clickable star-based rating component.
 * Renders a row of stars and allows updating the value if editable.
 */

import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styles
//-----------------------------------------------------------------------------

const Wrap = styled.div`
  display: inline-flex;
  gap: 0.15rem;
  cursor: ${({ editable }) => (editable ? 'pointer' : 'default')};
`

const Star = styled.span`
  font-size: 1.25rem;
  color: ${({ $filled }) => ($filled ? 'gold' : 'rgba(255,255,255,0.3)')};
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Renders a star rating component with optional click-to-set behavior.
 *
 * @param {Object} props
 * @param {number} props.value - Current rating value (0–max)
 * @param {number} [props.max=5] - Maximum number of stars
 * @param {Function} [props.onChange] - Callback triggered on click (newValue)
 * @param {boolean} [props.editable=false] - If true, stars are clickable
 */
export default function StarRating({ value = 0, max = 5, onChange, editable }) {
  const handleClick = (i) => {
    if (editable) onChange?.(i + 1)
  }

  return (
    <Wrap editable={editable}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          $filled={i < value}
          onClick={() => handleClick(i)}
          role={editable ? 'button' : undefined}
        >
          ★
        </Star>
      ))}
    </Wrap>
  )
}
