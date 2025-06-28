

import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components'
import {
  selectConfirmDeleteId,
  selectConfirmDeleteVariant,
  selectBookById,
  selectPreviewBookId
} from '@/store/selectors'
import {
  clearConfirmDelete,
  clearPreviewBook
} from '@/store/slices/bookSlice'
import { useUpdateBookFlagsMutation, useDeleteBookMutation } from '@/store/api/booksPrivateApi'
import { selectSelectedBookIds } from '@/store/selectors'
import { setManageMode, clearSelected } from '@/store/slices/bookSlice'
import { useBulkBookActions } from '@library/hooks'
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

const ConfirmModal = () => {
  const dispatch = useDispatch()
  const confirmId = useSelector(selectConfirmDeleteId)
  const variant = useSelector(selectConfirmDeleteVariant)
  const book = useSelector(useMemo(() => selectBookById(confirmId), [confirmId]))
  const previewId = useSelector(selectPreviewBookId)
    const selectedIds = useSelector(selectSelectedBookIds)
  const [updateFlags] = useUpdateBookFlagsMutation()
  const [deleteBook] = useDeleteBookMutation()
    const { deleteAll } = useBulkBookActions()
  const [isLoading, setLoading] = useState(false)



  const isLibrary = variant === 'library'
  const isPermanent = variant === 'permanent-delete'
  const isRestore = variant === 'restore'
  const isBulkDelete = variant === 'bulk-delete'

  if (!isBulkDelete && (!confirmId || !book)) return null
  const close = () => dispatch(clearConfirmDelete())

  const closeAll = () => {
    close()
    if (previewId === confirmId) dispatch(clearPreviewBook())
  }

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
              <Button $variant="button_secondary" onClick={handleArchive} disabled={isLoading}>
                Archive
              </Button>
              <Button $variant="button_primary" onClick={handlePermanentDelete} disabled={isLoading}>
                Delete
              </Button>
            </>
          )}

          {isPermanent && (
            <>
              <Button $variant="button_primary" onClick={handlePermanentDelete} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="button_secondary" onClick={close}>
                Cancel
              </Button>
            </>
          )}

          {isRestore && (
            <>
              <Button $variant="button_primary" onClick={handleRestore} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="button_secondary" onClick={close}>
                Cancel
              </Button>
            </>
          )}
                    {isBulkDelete && (
            <>
              <Button $variant="button_primary" onClick={handleBulkDelete} disabled={isLoading}>
                Yes
              </Button>
              <Button $variant="button_secondary" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        </BtnRow>

        {isLibrary && (
          <Button
            $variant="button_link"
            onClick={close}
            style={{ marginTop: '1.4rem' }}
          >
            Cancel
          </Button>
        )}
      </ModalBox>
    </Overlay>
  )
}

ConfirmModal.displayName = 'ConfirmModal'
export default React.memo(ConfirmModal)