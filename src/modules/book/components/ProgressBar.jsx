// src/components/common/ProgressBar.jsx
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetProgressQuery } from '@/store/api/booksApi'
import { selectProgressMode } from '@/store/selectors'

// -----------------------------------------------------------------------------
//------ STYLES
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
  .label { opacity: 0.68; }
  .percent { font-weight: 700; }
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
//------ COMPONENT
// -----------------------------------------------------------------------------
export default function ProgressBar({ bookId, totalPages }) {
  const mode = useSelector(selectProgressMode)             // 'current' | 'max'
  const { data, isLoading } = useGetProgressQuery(bookId, {
    skip: !bookId,
    refetchOnMountOrArgChange: true,
  })

  const current = data?.stats?.currentPage || data?.currentPage || 0
  const maxVisited = data?.stats?.maxVisitedPage || data?.maxVisitedPage || 0

  const base = mode === 'max' ? maxVisited : current

  const pct = isLoading || totalPages < 2
    ? 0
    : Math.round((Math.min(base, totalPages) / totalPages) * 100)

  if (!bookId || totalPages < 2) return null

  return (
    <Wrapper>
      <LabelRow>
        <span className="label">Progress:</span>
        <span className="percent">{isLoading ? '—' : `${pct}%`}</span>
      </LabelRow>
      <Bar>
        <Fill $percent={pct} />
      </Bar>
    </Wrapper>
  )
}
