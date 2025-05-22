/**
 * @file TableRow.jsx
 * @description Table view row for displaying a single book with actions and manage mode support.
 */

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import SelectCheckbox from './SelectCheckbox'
import CardButtons from './CardButtons'
import { useSelector } from 'react-redux'
import { selectIsManageMode } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// Component: TableRow
//-----------------------------------------------------------------------------

const TableRow = ({ book, onOpenPreview, onRemoveClick }) => {
  const isManageMode = useSelector(selectIsManageMode)

  //--- Format date
  const formattedDate = new Date(book.meta.createdAt).toLocaleDateString()

  //--- Stop propagation for checkbox and remove button
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
        <CardButtons book={book} />
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
