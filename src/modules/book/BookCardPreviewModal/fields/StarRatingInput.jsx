/**
 * @file StarRatingInput.jsx
 * @description Interactive 5-star input component used for rating.
 */

import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Stars = styled.div`
  display: flex;
  gap: 0.16em;
  cursor: pointer;
`

const Star = styled.span`
  font-size: var(--modal-xl);
  color: ${({ $active }) =>
    $active ? 'var(--color-yellow-400)' : 'rgba(255, 255, 255, 0.356)'};
  transition: color 0.15s, transform 0.1s;

  &:hover,
  &:focus {
    color: var(--color-yellow-300);
    transform: scale(1.13);
  }
`

//-----------------------------------------------------------------------------
// Component: StarRatingInput
//-----------------------------------------------------------------------------
/**
 * @component StarRatingInput
 * @param {string} name - Field name, default is "rating"
 * @param {number} value - Current selected rating (1–5)
 * @param {function} onChange - Callback when rating changes
 */
export function StarRatingInput({ name = 'rating', value = 0, onChange }) {
  const [hoverValue, setHoverValue] = useState(0)
  const displayValue = hoverValue || value

  return (
    <Stars onMouseLeave={() => setHoverValue(0)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          $active={i < displayValue}
          onMouseEnter={() => setHoverValue(i + 1)}
          onClick={() => {
            setHoverValue(0)
            onChange({ target: { name, value: i + 1 } })
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setHoverValue(0)
              onChange({ target: { name, value: i + 1 } })
            }
          }}
          title={`Rating: ${i + 1}/5`}
        >
          <FaStar />
        </Star>
      ))}
    </Stars>
  )
}
