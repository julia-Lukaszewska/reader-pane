import React, { Suspense } from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useToggle } from '@/hooks'
import {
  selectBook,
  selectBookById,
  archiveBookThunk,
  deleteBookForeverThunk,
} from '@/store'
import { SelectCheckbox } from '@/components'
import Actions from './Actions'

const ConfirmModal = React.lazy(() =>
  import('@/components').then((m) => ({ default: m.ConfirmModal }))
)
const BookPreviewModal = React.lazy(() =>
  import('@/components').then((m) => ({ default: m.BookPreviewModal }))
)


const Row = styled.tr`
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
  }
`
const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
`
const IconTd = styled(Td)`
  text-align: right;
  cursor: pointer;
`
//-----------------------------------------------------------------------------
//------TableRow – displays a row in the book list table 
//-----------------------------------------------------------------------------
const TableRow = ({ bookId }) => {
  const dispatch = useDispatch()
  const book = useSelector((s) => selectBookById(s, bookId))
  const { isManaging, selectedBooks } = useSelector((s) => s.library)
  const handleSelect = () => dispatch(selectBook(bookId))

  const [confirmOpen, openConfirm, closeConfirm] = useToggle()
  const [previewOpen, openPreview, closePreview] = useToggle()

  if (!book) return null

  return (
    <>
      <Row onClick={openPreview}>
        <Td style={{ width: 32 }} onClick={(e) => e.stopPropagation()}>
          {isManaging && (
            <SelectCheckbox
              isManaging={isManaging}
              selectedBooks={selectedBooks}
              bookId={bookId}
              handleSelectBook={handleSelect}
            />
          )}
        </Td>

        <Td>{book.title}</Td>
        <Td>{book.author}</Td>
        <Td>{new Date(book.createdAt).toLocaleDateString()}</Td>

        <Td>
          <Actions bookId={bookId} />
        </Td>

        <IconTd
          onClick={(e) => {
            e.stopPropagation()
            openConfirm()
          }}
        >
          <IoCloseOutline />
        </IconTd>
      </Row>

      <Suspense fallback={null}>
        {confirmOpen && (
          <ConfirmModal
            bookId={book._id}
            bookTitle={book.title}
            $variant={book.isArchived ? 'permanent-delete' : 'library'}
            onTrash={() => {
              dispatch(archiveBookThunk(book._id))
              closeConfirm()
            }}
            onConfirm={() => {
              dispatch(deleteBookForeverThunk(book._id))
              closeConfirm()
            }}
            onCancel={closeConfirm}
          />
        )}
        {previewOpen && <BookPreviewModal book={book} onClose={closePreview} />}
      </Suspense>
    </>
  )
}

export default React.memo(TableRow)
