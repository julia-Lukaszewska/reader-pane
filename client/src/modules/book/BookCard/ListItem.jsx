/**
 * @file ListItem.jsx
 * @description
 * Renders a single book row in list view with cover, title, author, rating, progress bar,
 * action buttons, and responsive layout. Supports both normal and manage modes.
 */

import React, { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import SelectCheckbox from './SelectCheckbox'
import CardButtons from './CardButtons'
import RatingStars from '@/components/common/RatingStars'
import ProgressBar from '@book/components/ProgressBar'
import { selectIsManageMode } from '@/store/selectors'

// -----------------------------------------------------------------------------
// Component: ListItem
// -----------------------------------------------------------------------------

/**
 * List row displaying book info with action buttons and preview option.
 *
 * @param {Object} props
 * @param {Object} props.book - Book object
 * @param {Function} props.onOpenPreview - Handler to open preview modal
 * @param {Function} props.onRemoveClick - Handler to remove book from list
 * @returns {JSX.Element}
 */
const ListItem = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode)

  const formattedDate = useMemo(() => {
    const dateRaw = book?.meta?.createdAt
    return dateRaw
      ? new Date(dateRaw).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '—'
  }, [book?.meta?.createdAt])

  const handleRemoveClick = useCallback(
    (e) => {
      e.stopPropagation()
      onRemoveClick()
    },
    [onRemoveClick]
  )

  return (
    <ItemWrapper>
      <Row $isManageMode={isManageMode}>
        <Cover>
          {book.meta?.cover && <img src={book.meta.cover} alt={book.meta?.title} />}
        </Cover>

        <Info>
          <Title title={book.meta?.title}>{book.meta?.title}</Title>
          <Author title={book.meta?.author}>{book.meta?.author || 'Unknown'}</Author>
        </Info>

        <ExtraInfo>
          <RatingStars value={book.flags?.rating || 0} />
          <ProgressBar bookId={book._id} totalPages={book.meta?.totalPages || 0} />
        </ExtraInfo>

        <Date>{formattedDate}</Date>

        <Actions>
          <CardButtons bookId={book._id} />
        </Actions>

        <Select>
          {isManageMode ? (
            <SelectCheckbox bookId={book._id} />
          ) : (
            <button aria-label="Remove book" onClick={handleRemoveClick}>
              <IoCloseOutline />
            </button>
          )}
        </Select>

        {!isManageMode && (
          <More>
            <button onClick={onOpenPreview}>See more</button>
          </More>
        )}
      </Row>
    </ItemWrapper>
  )
}

export default ListItem

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3em;
  padding: 0.2em;
  font-size: var(--row-font-size);
`

const Row = styled.div`
  display: grid;
  grid-template-areas:
    "cover info date actions select"
    "cover extra . more more";
  grid-template-columns: 12% 1fr 12% 12% 6%;
  grid-template-rows: 65% 35%;
  column-gap: 1em;
  width: var(--row-width);
  height: var(--row-height);
  font-size: var(--row-font-size);
  padding: 1.5% 2%;
  background: var(--gradient-main);
  border-radius: 1em;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease;

  ${({ $isManageMode }) =>
    !$isManageMode &&
    `
      &:hover {
        transform: translateY(-0.3em) scale(1.01);
      }
      &:focus-visible {
        outline: 2px solid var(--color-accent);
      }
    `}
`

const Cover = styled.div`
  grid-area: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.3em;
    box-shadow: var(--glass-shadow);
  }
`

const Info = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.4em;
  min-width: 0;
  overflow: hidden;
`

const ExtraInfo = styled.div`
  grid-area: extra;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1%;
  font-size: 0.95em;
  z-index: 9000;

  > * {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  > *:first-child {
    justify-content: flex-start;
  }

  > *:last-child {
    justify-content: flex-end;
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 0.8em;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Author = styled.div`
  font-size: 0.7em;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Date = styled.div`
  grid-area: date;
  font-size: 0.9em;
  color: var(--text-secondary);
  white-space: nowrap;
`

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4em;
  justify-content: flex-start;
`

const Select = styled.div`
  grid-area: select;
  display: flex;
  justify-content: end;
  align-items: start;
  font-size: 1em;

  button {
    font-size: 1.2em;
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.15s ease;

    &:hover {
      color: var(--color-accent);
      transform: scale(1.15);
    }
  }
`

const More = styled.div`
  grid-area: more;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    font-size: 0.7em;
    padding: 0.25em 0.6em;
    border-radius: 0.4em;
    background: rgba(255, 255, 255, 0.06);
    color: var(--color-accent);
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  }
`
