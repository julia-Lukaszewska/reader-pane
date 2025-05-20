import { RxReader } from 'react-icons/rx'
import { CgEreader } from 'react-icons/cg'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setPageViewMode } from '@/store/slices/readerSlice'

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

const PageViewModeToggle = () => {
  const dispatch = useDispatch()
  const pageViewMode = useSelector(s => s.reader.pageViewMode)

  return (
    <ToggleWrapper>
      <IconBtn
        $active={pageViewMode === 'single'}
        onClick={() => dispatch(setPageViewMode('single'))}
        title="Single Page View"
      >
        <RxReader />
      </IconBtn>
      <IconBtn
        $active={pageViewMode === 'double'}
        onClick={() => dispatch(setPageViewMode('double'))}
        title="Double Page View"
      >
        <CgEreader />
      </IconBtn>
    </ToggleWrapper>
  )
}

export default PageViewModeToggle
