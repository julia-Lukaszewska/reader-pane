/**
 * @file RatingSection.jsx
 * @description Displays the rating, reading progress, and "Read" button for a book.
 */

import styled from 'styled-components'
import ProgressBar from '@book/components/ProgressBar'
import { StarRatingInput } from '../fields/StarRatingInput'
import { useGetBookQuery, useUpdateBookMutation } from '@/store'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Layout wrapper for the section
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

//--- "Read" action button
const ReadButton = styled.button`
  grid-area: read;
  margin-top: 0.9em;
  padding: 0.7em 1.8em;
  border-radius: 0.9em;
  border: none;
  font-weight: 600;
  background: linear-gradient(90deg, rgba(40,130,255,0.32), rgba(100,190,255,0.18));
  color: #fff;
  box-shadow: 0 0 18px 1.5px rgba(34,124,255,0.12);
  cursor: pointer;
  transition: background 0.13s;

  &:hover {
    background: rgba(40,130,255,0.44);
  }
`

//--- Row for star rating
const Row = styled.div`
  grid-area: stars;
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
`

//--- Wrapper for the progress bar
const ProgressWrapper = styled.div`
  grid-area: progress;
  display: flex;
  justify-content: center;
  width: 100%;
`

//-----------------------------------------------------------------------------
// Component: RatingSection
//-----------------------------------------------------------------------------

/**
 * Displays the rating section of the preview modal, including:
 * - "Read" button
 * - Star rating input
 * - Progress bar based on total pages
 *
 * @component
 * @param {Object} props
 * @param {Object} props.form - Book data with `_id`, `flags`, and `meta`
 * @param {Function} props.onChange - Handler for updating local form state
 * @param {Function} props.handleRead - Action to trigger reading behavior
 */
export default function RatingSection({ form, onChange, handleRead }) {
  const bookId = form._id

  //--- Get latest book data from backend
  const { data: bookData, isLoading } = useGetBookQuery(bookId, { skip: !bookId })

  //--- Mutation for updating the book
  const [updateBook] = useUpdateBookMutation()

  const rating = form.flags?.rating ?? 0

  //--- Get total pages from backend or fallback to local
  const totalPages = isLoading
    ? form.meta?.totalPages ?? 1
    : bookData?.meta?.totalPages ?? 1

  //--- Set rating both locally and in backend
  const setRating = value => {
    onChange({ target: { name: 'rating', value } })

    updateBook({
      id: bookId,
      changes: {
        flags: { rating: value }
      }
    })
  }

  return (
    <RatingGrid>
      <ReadButton onClick={handleRead}>Read</ReadButton>

      <Row>
        <StarRatingInput
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
      </Row>

      <ProgressWrapper>
        <ProgressBar bookId={bookId} totalPages={totalPages} />
      </ProgressWrapper>
    </RatingGrid>
  )
}
