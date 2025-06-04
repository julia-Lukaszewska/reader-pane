/**
 * @file CardButtons.jsx
 * @description
 * Renders a group of interactive icon buttons for a book card:
 * - Open reader
 * - Toggle favorite
 * - Toggle archive
 * 
 * Buttons are disabled in manage mode and prevent event propagation.
 */

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaBookOpen, FaHeart, FaBoxArchive } from 'react-icons/fa6'
import useBookActions from '@/modules/book/hooks/useBookActions'
import {
  selectIsManageMode,
  selectBookByIdFromCache,
} from '@/store/selectors/selectors'

// -----------------------------------------------------------------------------
// Component: CardButtons
// -----------------------------------------------------------------------------

/**
 * Renders action buttons (read, favorite, archive) for a single book.
 *
 * @param {Object} props
 * @param {string} props.bookId - ID of the target book
 * @returns {JSX.Element}
 */
export default function CardButtons({ bookId }) {
  const isManageMode = useSelector(selectIsManageMode)
  const book = useSelector(selectBookByIdFromCache(bookId))
  const { openReader, toggleFavorite, toggleArchive } = useBookActions(book)

  const handleClick = (action) => (e) => {
    e.stopPropagation()
    if (!isManageMode) action()
  }

  if (!book) {
    return <Placeholder>Loading…</Placeholder>
  }

  return (
    <ButtonGroup $disabled={isManageMode}>
      {/* Read button */}
      <IconButton
        onClick={handleClick(openReader)}
        title="Read"
        $defaultColor="white"
        $hoverColor="#60a9ff"
        disabled={isManageMode}
      >
        <FaBookOpen />
      </IconButton>

      {/* Favorite button */}
      <IconButton
        onClick={handleClick(toggleFavorite)}
        title="Favorite"
        $active={book.flags?.isFavorited}
        $color="crimson"
        $defaultColor="white"
        $hoverColor="hotpink"
        disabled={isManageMode}
      >
        <FaHeart />
      </IconButton>

      {/* Archive button */}
      <IconButton
        onClick={handleClick(toggleArchive)}
        title="Archive"
        $active={book.flags?.isArchived}
        $color="steelblue"
        $defaultColor="white"
        $hoverColor="#80b0ff"
        disabled={isManageMode}
      >
        <FaBoxArchive />
      </IconButton>
    </ButtonGroup>
  )
}

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ $active, $color, $defaultColor }) =>
    $active ? $color || 'crimson' : $defaultColor || 'white'};
  transition: color 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    color: ${({ $hoverColor }) => $hoverColor || '#ccc'};
    transform: scale(1.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const Placeholder = styled.div`
  font-size: 1rem;
  color: gray;
  padding: 1rem;
  text-align: center;
`
