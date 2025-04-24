import { RxReader } from 'react-icons/rx'
import { CgEreader } from 'react-icons/cg'
import styled from 'styled-components'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const ViewModeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`

const IconBtn = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ active }) =>
    active ? '#e8f2ff' : '#4875b8'}; // aktywny vs nieaktywny kolor
  transition: color 0.3s;

  &:hover {
    color: #aad0ff;
  }
`

const ViewModeToggle = () => {
  const { state, dispatch } = useContext(AppContext)
  const { viewMode } = state

  const setMode = (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })

  return (
    <ViewModeWrapper>
      <IconBtn
        onClick={() => setMode('single')}
        active={viewMode === 'single'}
        title="Widok pojedynczy"
      >
        <RxReader />
      </IconBtn>
      <IconBtn
        onClick={() => setMode('double')}
        active={viewMode === 'double'}
        title="Widok podwójny"
      >
        <CgEreader />
      </IconBtn>
    </ViewModeWrapper>
  )
}

export default ViewModeToggle
