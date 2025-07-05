/**
 * @file ConfirmModal.jsx
 * @description Modal used to confirm archive, delete, restore, or bulk delete actions for books.
 */
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from '@/components'
import {
  selectConfirmDeleteId,
  selectConfirmDeleteVariant,
  selectBookById,
  selectPreviewBookId,
  selectSelectedBookIds,
} from '@/store/selectors'
import {
  clearConfirmDelete,
  clearPreviewBook,
  setManageMode,
  clearSelected,
} from '@/store/slices/bookSlice'
import { useUpdateBookFlagsMutation, useDeleteBookMutation } from '@/store/api/booksPrivateApi'
import { useBulkBookActions } from '@library/hooks'

/* --------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                          */
/* --------------------------------------------------------------------------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--modal-bg-02);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  z-index: 9999;
`

const ModalBox = styled.div`
  background: var(--modal-bg-01);
  backdrop-filter: var(--glass-blur);
  color: var(--text-color-01);
  padding: var(--padding-02);
  font-size: var(--text-01);
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-items: center;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-02);
  max-width: 420px;
  gap: var(--space-xxl);
  
  min-height: 25vh;
  width: 90%;
  text-align: center;
`

const Title = styled.h3`
  font-size: inherit;
  text-shadow: var(--shadow-02);
   letter-spacing: var(--letter-spacing-md);
font-size: var(--text-02);
font-weight: var(--weight-01);
  display: flex;
flex-wrap: nowrap;
`

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: var(--space-l);
`

/* --------------------------------------------------------------------------- */
/*  COMPONENT: ConfirmModal                                                   */
/* --------------------------------------------------------------------------- */

const ConfirmModal = () => {
  const dispatch = useDispatch()

  // Selectors
  const confirmId = useSelector(selectConfirmDeleteId)
  const variant = useSelector(selectConfirmDeleteVariant)
  const previewId = useSelector(selectPreviewBookId)
  const selectedIds = useSelector(selectSelectedBookIds)
  const [updateFlags] = useUpdateBookFlagsMutation()
  const [deleteBook] = useDeleteBookMutation()
  const { deleteAll } = useBulkBookActions()
  const [isLoading, setLoading] = useState(false)

  const book = useSelector(useMemo(() => selectBookById(confirmId), [confirmId]))

  // Flags
  const isLibrary = variant === 'library'
  const isPermanent = variant === 'permanent-delete'
  const isRestore = variant === 'restore'
  const isBulkDelete = variant === 'bulk-delete'

  // Check if should render
  if (!isBulkDelete && (!confirmId || !book)) return null

  // Close helpers
  const close = () => dispatch(clearConfirmDelete())

  const closeAll = () => {
    close()
    if (previewId === confirmId) dispatch(clearPreviewBook())
  }

  // Actions
  const handleArchive = async () => {
    setLoading(true)
    try {
      await updateFlags({ id: confirmId, flags: { isArchived: true } }).unwrap()
    } catch (err) {
      console.error('Archive error:', err)
    }
    setLoading(false)
    closeAll()
  }

  const handlePermanentDelete = async () => {
    setLoading(true)
    try {
      await deleteBook(confirmId).unwrap()
    } catch (err) {
      console.error('Delete error:', err)
    }
    setLoading(false)
    closeAll()
  }

  const handleRestore = async () => {
    setLoading(true)
    try {
      await updateFlags({ id: confirmId, flags: { isArchived: false } }).unwrap()
    } catch (err) {
      console.error('Restore error:', err)
    }
    setLoading(false)
    closeAll()
  }

  const handleBulkDelete = async () => {
    setLoading(true)
    try {
      await deleteAll(selectedIds)
    } catch (err) {
      console.error('Bulk delete error:', err)
    }
    setLoading(false)
    dispatch(clearSelected())
    dispatch(setManageMode(false))
    close()
  }

  // Render
  return (
    <Overlay onClick={close}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Title>
          {isLibrary && `What do you want to do with “${book.meta.title}”?`}
          {isPermanent && `Permanently delete “${book.meta.title}”?`}
          {isRestore && `Restore “${book.meta.title}” to library?`}
          {isBulkDelete && `Are you sure you want to delete ${selectedIds.length} books?`}
        </Title>

        <BtnRow>
          {isLibrary && (
            <>
              <Button $variant="sidebar_btn" onClick={handleArchive} disabled={isLoading}>
                Archive
              </Button>
              <Button $variant="sidebar_btn" onClick={handlePermanentDelete} disabled={isLoading}>
                Delete
              </Button>
              <Button
                $variant="sidebar_btn"
                onClick={close}
                style={{ marginTop: '1.4rem' }}
              >
                Cancel
              </Button>
            </>
          )}

          {isPermanent && (
            <>
              <Button $variant="sidebar_btn" onClick={handlePermanentDelete} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="sidebar_btn" onClick={close}>
                Cancel
              </Button>
            </>
          )}

          {isRestore && (
            <>
              <Button $variant="sidebar_btn" onClick={handleRestore} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="sidebar_btn" onClick={close}>
                Cancel
              </Button>
            </>
          )}

          {isBulkDelete && (
            <>
              <Button $variant="sidebar_btn" onClick={handleBulkDelete} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="sidebar_btn" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        </BtnRow>
      </ModalBox>
    </Overlay>
  )
}

ConfirmModal.displayName = 'ConfirmModal'
export default React.memo(ConfirmModal)
