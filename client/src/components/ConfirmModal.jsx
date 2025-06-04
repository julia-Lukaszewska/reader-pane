/**
 * @file ConfirmModal.jsx
 * @description
 * Modal window used for confirming archive, restore, or permanent delete actions on books.
 * Supports three modes: archive from library, permanent delete, or restore to library.
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useUpdateBookMutation,
  useDeleteBookMutation,
  booksApi,
} from '@/store/api/booksApi'
import { saveBookToArchiveStorage } from '@/utils'
import { Button } from '@/components'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--backdrop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  z-index: 9999;
`

const ModalBox = styled.div`
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  color: var(--color-dark-900);
  padding: 2.4rem;
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  max-width: 420px;
  width: 90%;
  text-align: center;
`

const Title = styled.h3`
  margin-bottom: 1.6rem;
  font-size: 1.8rem;
  text-shadow: var(--glass-text-shadow);
`

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1.2rem;
  flex-wrap: wrap;
`

// -----------------------------------------------------------------------------
// Component: ConfirmModal
// -----------------------------------------------------------------------------

/**
 * Modal component for confirming actions related to a book.
 *
 * @param {Object} props
 * @param {string} props.bookId - Target book ID
 * @param {string} props.bookTitle - Book title displayed in the modal
 * @param {Function} props.onCancel - Handler for cancel/close
 * @param {Function} [props.onConfirm] - Optional handler for confirming
 * @param {Function} [props.onTrash] - Optional override for archive action
 * @param {'library'|'permanent-delete'|'restore'} [props.variant='library'] - Modal type
 * @returns {JSX.Element}
 */
const ConfirmModal = ({
  bookId,
  bookTitle,
  onCancel,
  variant = 'library',
  onTrash,
  onConfirm,
}) => {
  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

  const book = useSelector((state) =>
    booksApi.endpoints.getBookById.select(bookId)(state)?.data
  )

  useEffect(() => {
    if (book?.flags?.isArchived) {
      saveBookToArchiveStorage(book)
    }
  }, [book])

  const isLibrary = variant === 'library'
  const isPermanent = variant === 'permanent-delete'
  const isRestore = variant === 'restore'

  const handleDeleteForever = async () => {
    await deleteBook(bookId)
    onConfirm?.()
    onCancel()
  }

  const handleArchive = async () => {
    if (onTrash) {
      onTrash()
    } else {
      await updateBook({
        id: bookId,
        changes: { flags: { isArchived: true } },
      }).unwrap()
    }
    onCancel()
  }

  const handleRestore = async () => {
    if (onConfirm) {
      onConfirm()
    } else {
      await updateBook({
        id: bookId,
        changes: { flags: { isArchived: false } },
      }).unwrap()
    }
    onCancel()
  }

  return (
    <Overlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          {isLibrary && `What do you want to do with “${bookTitle}”?`}
          {isPermanent && `Permanently delete “${bookTitle}”?`}
          {isRestore && `Restore “${bookTitle}” to library?`}
        </Title>

        <BtnRow>
          {isLibrary && (
            <>
              <Button $variant="button_secondary" onClick={handleArchive}>
                Archive
              </Button>
              <Button $variant="button_primary" onClick={handleDeleteForever}>
                Delete
              </Button>
            </>
          )}

          {isPermanent && (
            <>
              <Button $variant="button_primary" onClick={handleDeleteForever}>
                Yes
              </Button>
              <Button $variant="button_secondary" onClick={onCancel}>
                Cancel
              </Button>
            </>
          )}

          {isRestore && (
            <>
              <Button $variant="button_primary" onClick={handleRestore}>
                Yes
              </Button>
              <Button $variant="button_secondary" onClick={onCancel}>
                Cancel
              </Button>
            </>
          )}
        </BtnRow>

        {isLibrary && (
          <Button
            $variant="button_link"
            onClick={onCancel}
            style={{ marginTop: '1.4rem' }}
          >
            Cancel
          </Button>
        )}
      </ModalBox>
    </Overlay>
  )
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

ConfirmModal.displayName = 'ConfirmModal'
export default React.memo(ConfirmModal)
