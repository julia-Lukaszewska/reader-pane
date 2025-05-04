// src/components/modals/ConfirmModal.jsx
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { saveBookToArchiveStorage } from '@/utils'
import {
  archiveBookThunk,
  deleteBookForeverThunk,
  restoreBookThunk,
} from '@/store' 
import { Button } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--backdrop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(6px);
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


const ConfirmModal = ({
  bookId,
  bookTitle,
  onCancel,
  variant = 'library',
  onTrash,
  onConfirm,
}) => {
  const dispatch = useDispatch()

  const isLibrary = variant === 'library'
  const isPermanent = variant === 'permanent-delete'
  const isRestore = variant === 'restore'
  const book = useSelector((state) =>
    state.library.list.find((b) => b._id === bookId)
  )
  useEffect(() => {
    if (book?.isArchived) {
      saveBookToArchiveStorage(book)
    }
  }, [book])

 
  const handleArchive = () => {
    if (onTrash) {
      onTrash()
    } else {
      dispatch(archiveBookThunk(bookId))
    }
    onCancel()
  }

 
  const handleDelete = () => {
    if (onConfirm) {
      onConfirm()
    } else {
      dispatch(deleteBookForeverThunk(bookId))
    }
    onCancel()
  }


  const handleRestore = () => {
    if (onConfirm) {
      onConfirm()
    } else {
      dispatch(restoreBookThunk(bookId))
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
              <Button $variant="button_primary" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}

          {isPermanent && (
            <>
              <Button $variant="button_primary" onClick={handleDelete}>
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

export default React.memo(ConfirmModal)
