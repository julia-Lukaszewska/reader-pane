import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSelect } from '@/store/slices/bookSlice'
import { selectIsManageMode, selectSelectedBookIds } from '@/store/selectors'
const StyledCheckbox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  accent-color: #4f46e5;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.1); }


  ${({ $isTile }) =>
    $isTile &&
    `
    position: absolute;
    top: 1rem;
    right: 1rem;
  `}
`;

const SelectCheckbox = ({ bookId, isTile }) => {
  const dispatch = useDispatch();
   const isManageMode = useSelector(selectIsManageMode)
  const selectedIds  = useSelector(selectSelectedBookIds)

  if (!isManageMode) return null
  return (
 <StyledCheckbox
      $isTile={isTile}
      type="checkbox"
      checked={selectedIds.includes(bookId)}
      onClick={e => {
        e.stopPropagation()
        dispatch(toggleSelect(bookId))
      }}
      readOnly
    />
  )
}

export default SelectCheckbox;
