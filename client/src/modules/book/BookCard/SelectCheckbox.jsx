
/**
 * @file SelectCheckbox.jsx
 * @description
 * Checkbox component used for selecting books in manage mode.
 * Can be rendered as part of a list row or a grid tile (positioned absolutely).
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSelect } from '@/store/slices/bookSlice'
import {
  selectIsManageMode,
  selectSelectedBookIds,
} from '@/store/selectors'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const StyledCheckbox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  accent-color: #4f46e5;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  ${({ $isTile }) =>
    $isTile &&
    `
      position: absolute;
      top: 1rem;
      right: 1rem;
    `}
`

// -----------------------------------------------------------------------------
// Component: SelectCheckbox
// -----------------------------------------------------------------------------

/**
 * Checkbox for selecting a book in manage mode.
 *
 * @param {Object} props
 * @param {string} props.bookId - ID of the book to toggle selection
 * @param {boolean} [props.isTile=false] - If true, renders positioned for tile layout
 * @returns {JSX.Element|null}
 */
const SelectCheckbox = ({ bookId, isTile = false }) => {
  const dispatch = useDispatch()

  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)

  if (!isManageMode) return null

  const handleClick = (e) => {
    e.stopPropagation()
    dispatch(toggleSelect(bookId))
  }

  return (
    <StyledCheckbox
      $isTile={isTile}
      type="checkbox"
      checked={selectedIds.includes(bookId)}
      onClick={handleClick}
      readOnly
    />
  )
}

export default SelectCheckbox

