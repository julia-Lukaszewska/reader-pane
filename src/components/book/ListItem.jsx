import React, { Suspense } from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useToggle, useAutoSaveReadingProgress } from '@/hooks'
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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`
const Info = styled.div`
  flex: 1;
  overflow: hidden;
`
const Title = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const Close = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 1.2rem;
  color: var(--text-secondary);
  cursor: pointer;
  &:hover {
    color: var(--color-accent);
  }
`

const ListItem = ({ bookId }) => {
  const dispatch = useDispatch()
  const book = useSelector((s) => selectBookById(s, bookId))
  const { isManaging, selectedBooks } = useSelector((s) => s.library)
  const handleSelect = () => dispatch(selectBook(bookId))

  useAutoSaveReadingProgress(bookId)

  const [confirmOpen, openConfirm, closeConfirm] = useToggle()
  const [previewOpen, openPreview, closePreview] = useToggle()

  if (!book) return null

  return (
    <>
      <Wrapper onClick={openPreview}>
        <SelectCheckbox
          isManaging={isManaging}
          selectedBooks={selectedBooks}
          bookId={bookId}
          handleSelectBook={handleSelect}
        />
        <Info>
          <Title>{book.title}</Title>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {book.author}
          </p>
        </Info>

        <Actions bookId={bookId} />

        <Close
          onClick={(e) => {
            e.stopPropagation()
            openConfirm()
          }}
        >
          <IoCloseOutline />
        </Close>
      </Wrapper>

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

export default React.memo(ListItem)
