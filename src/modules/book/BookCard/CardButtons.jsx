/**
 * @file CardButtons.jsx
 * @description Action buttons for book card (read, favorite, archive).
 */

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaBookOpen, FaHeart, FaBoxArchive } from 'react-icons/fa6'
import useBookActions from '@/modules/book/hooks/useBookActions'
import { selectIsManageMode } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------
//--- Button group styles
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`
//----Icon button styles
const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ $active, $alwaysWhite }) =>
    $alwaysWhite ? 'white' : $active ? 'crimson' : 'gray'};

  &:disabled {
    cursor: not-allowed;
  }
`

//-----------------------------------------------------------------------------
// Component: CardButtons
//-----------------------------------------------------------------------------

export default function CardButtons({ book }) {
  const { openReader, toggleFavorite, toggleArchive } = useBookActions(book)
  const isManageMode = useSelector(selectIsManageMode)

  //--- Prevent action if manage mode is active
  const handleClick = (action) => (e) => {
    e.stopPropagation()
    if (!isManageMode) action()
  }

  return (
    <ButtonGroup disabled={isManageMode}>

      {/* Read button */}
      <IconButton
        onClick={handleClick(openReader)}
        title="Read"
        $disabled={isManageMode}
        $alwaysWhite
      >
        <FaBookOpen />
      </IconButton>

      {/* Favorite button */}
      <IconButton
        onClick={handleClick(toggleFavorite)}
        title="Favorite"
        $disabled={isManageMode}
        $active={book.flags?.isFavorited}
      >
        <FaHeart />
      </IconButton>

      {/* Archive button */}
      <IconButton
        onClick={handleClick(toggleArchive)}
        title="Archive"
        $disabled={isManageMode}
        $active={book.flags?.isArchived}
      >
        <FaBoxArchive />
      </IconButton>
    </ButtonGroup>
  )
}
