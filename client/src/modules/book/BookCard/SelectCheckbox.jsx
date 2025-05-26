/**
 * @file SelectCheckbox.jsx
 * @description Checkbox used for selecting books in manage mode.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSelect } from '@/store/slices/bookSlice'
import { selectIsManageMode, selectSelectedBookIds } from '@/store/selectors/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const StyledCheckbox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  accent-color: #4f46e5;
  cursor: pointer;
  transition: transform 0.2s ease;
   
  &:hover {
    transform: scale(1.1);
  }
//---Version for tile in grid layout
  ${({ $isTile }) =>
    $isTile &&
    `
      position: absolute;
      top: 1rem;
      right: 1rem;
    `}  
`

//-----------------------------------------------------------------------------
// Component: SelectCheckbox
//-----------------------------------------------------------------------------

const SelectCheckbox = ({ bookId, isTile }) => {
  const dispatch = useDispatch()

  //--- Check if manage mode is active
  const isManageMode = useSelector(selectIsManageMode)

  //--- Get selected book IDs
  const selectedIds = useSelector(selectSelectedBookIds)

  //--- Don't render checkbox if not in manage mode
  if (!isManageMode) return null

  //--- Handle checkbox click
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
