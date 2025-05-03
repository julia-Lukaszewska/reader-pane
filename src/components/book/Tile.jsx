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


const TileBox = styled.div`
  width: var(--book-size, 150px);
  aspect-ratio: 2/3;
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--glass-shadow-hover);
  }
`
const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  color: var(--text-primary);
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Close = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--text-secondary);
  &:hover {
    color: var(--color-accent);
  }
`

//-----------------------------------------------------------------------------
//------Tile – displays a book tile in the library 
//-----------------------------------------------------------------------------
const Tile = ({ bookId }) => {
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
      <TileBox onClick={openPreview}>
        <SelectCheckbox
          isManaging={isManaging}
          selectedBooks={selectedBooks}
          bookId={bookId}
          handleSelectBook={handleSelect}
        />

  
        <Close
          onClick={(e) => {
            e.stopPropagation()
            openConfirm()
          }}
        >
          <IoCloseOutline />
        </Close>

        <Title>{book.title}</Title>

        {/* 📖 ❤️ 📦 */}
        <Actions bookId={bookId} />
      </TileBox>

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

export default React.memo(Tile)
