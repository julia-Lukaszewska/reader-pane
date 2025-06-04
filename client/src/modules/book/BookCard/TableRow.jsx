/**
 * @file TableRow.jsx
 * @description
 * Table row used in tabular view of books.
 * Displays title, author, creation date, action buttons, and manage mode checkbox.
 */

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import SelectCheckbox from './SelectCheckbox'
import CardButtons from './CardButtons'
import { selectIsManageMode } from '@/store/selectors/selectors'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const Row = styled.tr`
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }
`

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`

const IconTd = styled(Td)`
  text-align: right;
  cursor: pointer;
`

// -----------------------------------------------------------------------------
// Component: TableRow
// -----------------------------------------------------------------------------

/**
 * Table row representing a single book in table view.
 *
 * @param {Object} props
 * @param {Object} props.book - Book object to render
 * @param {Function} props.onOpenPreview - Handler to open book preview
 * @param {Function} props.onRemoveClick - Handler to remove book
 * @returns {JSX.Element}
 */
const TableRow = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode)

  const formattedDate = new Date(book.meta.createdAt).toLocaleDateString()

  const stopClick = (e) => e.stopPropagation()

  return (
    <Row onClick={onOpenPreview}>
      <Td onClick={stopClick}>
        {isManageMode && <SelectCheckbox bookId={book._id} />}
      </Td>
      <Td>{book.meta.title}</Td>
      <Td>{book.meta.author}</Td>
      <Td>{formattedDate}</Td>
      <Td>
        <CardButtons bookId={book._id} />
      </Td>
      <IconTd
        onClick={(e) => {
          e.stopPropagation()
          onRemoveClick()
        }}
      >
        <IoCloseOutline />
      </IconTd>
    </Row>
  )
}

export default TableRow
