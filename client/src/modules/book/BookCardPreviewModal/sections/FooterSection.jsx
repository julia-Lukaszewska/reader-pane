/**
 * @file FooterSection.jsx
 * @description Footer section of the preview modal. Renders buttons for edit/save/cancel/close actions.
 */
import { useState } from 'react'
import styled from 'styled-components'
import useEditBook from '@/modules/book/hooks/useEditBook'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsEditingMain,
  selectBookModalForm,
  selectPreviewBookId,
  selectBookById,
} from '@/store/selectors'
import {
  setEditingMain,
  setForm,
  resetForm,
} from '@/store/slices/bookModalSlice'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import Button from '@/components/common/Button'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-lg);
  
  padding: var(--padding-01);
  border-radius: var(--border-radius-xl);
  /* background: var(--modal-bg-01); */
  border-top: 1.5px solid rgba(255,255,255,0.08);
  box-shadow: 0 4px 38px 0 rgba(60,100,220,0.10);
  backdrop-filter: blur(12px) saturate(115%);
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

const FooterSection = () => {
  const dispatch = useDispatch()
  const [isSaving, setSaving] = useState(false)
  const isEditing = useSelector(selectIsEditingMain)
  const form = useSelector(selectBookModalForm)
  const previewBookId = useSelector(selectPreviewBookId)
  const originalBook = useSelector(state => selectBookById(previewBookId)(state))
  const { editBook } = useEditBook()

  const handleEdit = () => {
    dispatch(setEditingMain(true))
  }

  const handleCancel = () => {
    dispatch(setForm(form)) // restores current snapshot
    dispatch(setEditingMain(false))
  }

  const handleSave = async () => {
    if (!previewBookId || isSaving) return false
    setSaving(true)
    const updates = {
      meta: {
        ...form.meta,
        updatedAt: new Date().toISOString(),
      },
    }

    const success = await editBook(previewBookId, updates)
    setSaving(false)
    if (success) {
      dispatch(setEditingMain(false))
    }
    return success
  }

  const handleClose = async () => {
    if (isEditing) {
      const ok = await handleSave()
      if (!ok) return
    }
    dispatch(clearPreviewBook())
    dispatch(resetForm())
  }

return (
  <Footer>
    {isEditing ? (
      <>
        <Button $variant="header_btn_large" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button $variant="header_btn_large" onClick={handleCancel}>
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Button $variant="header_btn_large" onClick={handleEdit}>
          Edit
        </Button>
        <Button $variant="header_btn_large" onClick={handleClose}>
          Close
        </Button>
      </>
    )}
  </Footer>
)

}

export default FooterSection
