/**
 * @file PageViewModeToggle.jsx
 * @description Toggle for switching between single and double-page PDF view modes.
 */

import { RxReader } from 'react-icons/rx'
import { CgEreader } from 'react-icons/cg'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setPageViewMode } from '@/store/slices/readerSlice'
import {
  selectActiveBookId,
  selectBookStaticById,
} from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const ToggleWrapper = styled.div`
  display: flex;
  gap: 1rem;
`  

const IconBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$active' && prop !== '$disabled',
})`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ $active, $disabled }) =>
    $disabled
      ? 'var(--text-disabled)'
      : $active
      ? 'var(--color-accent)'
      : 'var(--text-muted)'};
  transition: color 0.3s;

  &:hover {
    color: ${({ $disabled }) =>
      $disabled ? 'var(--text-disabled)' : 'var(--color-accent)'};
  }
`

//-----------------------------------------------------------------------------
// Component: PageViewModeToggle
//-----------------------------------------------------------------------------

/**
 * Renders two buttons to toggle between 'single' and 'double' page views.
 * Double view is disabled if the book has only 1 page.
 *
 * @returns {JSX.Element}
 */
const PageViewModeToggle = () => {
  console.log('PageViewModeToggle')

  const dispatch = useDispatch()
  const pageViewMode = useSelector((s) => s.reader.pageViewMode)

  const bookId = useSelector(selectActiveBookId)
  const staticBook = useSelector(selectBookStaticById(bookId))
  const totalPages = staticBook?.meta?.totalPages ?? 0

  const isDoubleDisabled = totalPages <= 1

  const handleToggle = (mode) => {
    if (mode === 'double' && isDoubleDisabled) return
    dispatch(setPageViewMode(mode))
  }

  return (
    <ToggleWrapper>
      <IconBtn
        $active={pageViewMode === 'single'}
        onClick={() => handleToggle('single')}
        title='Single Page View'
      >
        <RxReader />
      </IconBtn>

      <IconBtn
        $active={pageViewMode === 'double'}
        $disabled={isDoubleDisabled}
        onClick={() => handleToggle('double')}
        title='Double Page View'
        disabled={isDoubleDisabled}
      >
        <CgEreader />
      </IconBtn>
    </ToggleWrapper>
  )
}

export default PageViewModeToggle
