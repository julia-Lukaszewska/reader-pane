/**
 * @file ProgressBar.jsx
 * @description
 * Displays a horizontal progress bar showing reading progress with percentage label.
 * Uses cached book stats if available; otherwise fetches from the backend.
 */

import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetProgressQuery } from '@/store/api/booksApi'
import {
  selectProgressMode,
  selectBookByIdFromCache,
} from '@/store/selectors/selectors'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-blue-300);
  font-weight: 500;
  text-align: center;
`

const LabelRow = styled.div`
  display: flex;
  gap: 0.4em;
  margin-bottom: 0.4em;

  .label {
    opacity: 0.68;
  }

  .percent {
    font-weight: 700;
  }
`

const Bar = styled.div`
  width: 100%;
  max-width: 120px;
  height: 6px;
  background: var(--progress-bg, rgba(0, 0, 0, 0.1));
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
`

const Fill = styled.div`
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  background: var(--progress-fill, #4caf50);
  transition: width 0.3s ease;
`

// -----------------------------------------------------------------------------
// Component: ProgressBar
// -----------------------------------------------------------------------------

/**
 * Compact progress bar showing current reading status of a book.
 *
 * @param {Object} props
 * @param {string} props.bookId - Target book ID
 * @param {number} props.totalPages - Total number of pages in the book
 * @returns {JSX.Element|null}
 */
export default function ProgressBar({ bookId, totalPages }) {
  const mode = useSelector(selectProgressMode)

  // Try to get progress from cached book
  const cachedBook = useSelector((state) =>
    selectBookByIdFromCache(bookId)(state)
  )

  const cachedStats = cachedBook?.stats
  const hasStats = !!cachedStats

  // Fallback to API only if no cached stats
  const { data, isLoading: isLoadingAPI } = useGetProgressQuery(bookId, {
    skip: hasStats || !bookId,
    refetchOnMountOrArgChange: true,
  })

  const stats = hasStats
    ? cachedStats
    : data?.stats || { currentPage: 0, maxVisitedPage: 0 }

  const value = mode === 'max' ? stats.maxVisitedPage : stats.currentPage

  if (bookId) {
    console.log(
      `[ProgressBar] Book ${bookId} progress from:`,
      hasStats ? 'cache' : 'backend'
    )
  }

  const pct =
    totalPages >= 2
      ? Math.round((Math.min(value, totalPages) / totalPages) * 100)
      : 0

  if (!bookId || totalPages < 2) return null

  return (
    <Wrapper>
      <LabelRow>
        <span className="label">Progress:</span>
        <span className="percent">
          {isLoadingAPI && !hasStats ? '—' : `${pct}%`}
        </span>
      </LabelRow>
      <Bar>
        <Fill $percent={pct} />
      </Bar>
    </Wrapper>
  )
}
