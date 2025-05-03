//-----------------------------------------------------------------------------
//------ ViewModeToggle: switch between single and double page view 
//-----------------------------------------------------------------------------

import styled from 'styled-components'  
import { RxReader } from 'react-icons/rx'  
import { CgEreader } from 'react-icons/cg'  
import { useDispatch, useSelector } from 'react-redux'  
import { setViewMode } from '@/store'  

const ToggleWrapper = styled.div`
  display: flex;
  gap: 1rem;
` 

const IconBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'var(--text-muted)'};
  transition: color 0.3s;

  &:hover {
    color: var(--color-accent);
  }
` 

const ViewModeToggle = () => {
  const dispatch = useDispatch() 
  const viewMode = useSelector((state) => state.reader.viewMode)

  return (
    <ToggleWrapper>
      <IconBtn
        $active={viewMode === 'single'}  
        onClick={() => dispatch(setViewMode('single'))}  
        title="Single Page View"  
      >
        <RxReader />
      </IconBtn>
      <IconBtn
        $active={viewMode === 'double'}  
        onClick={() => dispatch(setViewMode('double'))}  
        title="Double Page View"  
      >
        <CgEreader />
      </IconBtn>
    </ToggleWrapper>
  )
}

export default ViewModeToggle 
