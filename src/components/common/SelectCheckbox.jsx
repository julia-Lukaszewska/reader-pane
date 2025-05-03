//-----------------------------------------------------------------------------
//------ SelectCheckbox – Checkbox for selecting books 
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux' 
import { selectBook } from '@/store' 

const CheckboxWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10000; 
  background: rgba(255, 0, 0, 0.4);
`

const SelectCheckbox = ({ bookId }) => {
  const isManaging = useSelector((state) => state.library.isManaging) 
  const selectedBooks = useSelector((state) => state.library.selectedBooks) 
  const dispatch = useDispatch() 

  if (!isManaging) return null

  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        checked={selectedBooks.includes(bookId)}
        onClick={(e) => {
        
          e.stopPropagation() 
          dispatch(selectBook(bookId)) 
        }}
        readOnly 
      />
    </CheckboxWrapper>
  )
}

export default SelectCheckbox
