/**
 * @file RatingSection.jsx
 * @description
 * Section of the book modal that displays:
 * - A "Read" button to open the book.
 * - An interactive star rating input with optimistic cache updates.
 * - A progress bar showing reading progress.
 *
 * Changing the star rating only patches the "rating" field in the cache,
 * without invalidating or refetching other data (e.g., progress).
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import ProgressBar from '@book/components/ProgressBar'
import RatingStars from '@/components/common/RatingStars'
import {
  useGetBookByIdQuery,
  useUpdateBookRatingMutation,
} from '@/store/api/booksPrivateApi'
import { selectBookById } from '@/store/selectors'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const RatingGrid = styled.div`
  display: grid;
  grid-area: rating;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'read'
    'stars'
    'progress';
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ReadButton = styled.button`
  grid-area: read;
  margin-top: 0.9em;
  padding: 0.7em 1.8em;
  border-radius: 0.9em;
  border: none;
  font-weight: 600;
  background: linear-gradient(
    90deg,
    rgba(40, 130, 255, 0.32),
    rgba(100, 190, 255, 0.18)
  );
  color: #ffffff;
  box-shadow: 0 0 18px 1.5px rgba(34, 124, 255, 0.12);
  cursor: pointer;
  transition: background 0.13s;

  &:hover {
    background: rgba(40, 130, 255, 0.44);
  }
`

const Row = styled.div`
  grid-area: stars;
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
`

const ProgressWrapper = styled.div`
  grid-area: progress;
  display: flex;
  justify-content: center;
  width: 100%;
`

// -----------------------------------------------------------------------------
// Component: RatingSection
// -----------------------------------------------------------------------------

/**
 * Displays book rating, reading progress, and a "Read" button.
 *
 * @param {Object} props
 * @param {Object} props.form - Local form state for the book (includes flags.rating)
 * @param {Function} props.onChange - Callback to update local form state
 * @param {Function} props.handleRead - Callback when the "Read" button is clicked
 * @returns {JSX.Element}
 */
export default function RatingSection({ form, onChange, handleRead }) {

  const bookId = form._id

  // Prefer cached book data to avoid unnecessary queries
  const cachedBook = useSelector((state) =>
    selectBookById(bookId)(state)
  )

  const { data: bookData } = useGetBookByIdQuery(bookId, {
    skip: !bookId || !!cachedBook,
  })

  const book = cachedBook ?? bookData
  const [updateBookRating] = useUpdateBookRatingMutation()

  const rating = form.flags?.rating ?? 0
  const totalPages = book?.meta?.totalPages ?? 0

  /**
   * Optimistically updates book rating locally and in the cache.
   *
   * @param {number} value - New rating value
   */
  const setRating = (value) => {
    onChange({ target: { name: 'rating', value } })
    updateBookRating({ id: bookId, rating: value })
  }

  return (
    <RatingGrid>
      <ReadButton onClick={handleRead}>Read</ReadButton>

      <Row>
        <RatingStars
          value={rating}
          editable={true}
          onChange={setRating}
          size="2em"
        />
      </Row>

      <ProgressWrapper>
        <ProgressBar bookId={bookId} totalPages={totalPages} />
      </ProgressWrapper>
    </RatingGrid>
  )
}
