/**
 * @file FooterSection.jsx
 * @description Footer section of the preview modal. Renders buttons for edit/save/cancel/close actions.
 */

import styled from 'styled-components'
import useEditBook from '@/modules/book/hooks/useEditBook'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsEditingMain,
  selectBookModalForm,
  selectPreviewBookId,
} from '@/store/selectors'
import {
  setEditingMain,
  setForm,
  resetForm,
} from '@/store/slices/bookModalSlice'
import { clearPreviewBook } from '@/store/slices/bookSlice'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.3em;
  padding: 1.5em 2.5em;
  background: var(--gradient-main-v7), rgba(30,40,80,0.23);
  border-top: 1.5px solid rgba(255,255,255,0.08);
  box-shadow: 0 4px 38px 0 rgba(60,100,220,0.10);
  backdrop-filter: blur(12px) saturate(115%);
`

const Button = styled.button`
  padding: 0.5em 1.8em;
  border: none;
  background: ${({ $primary }) => $primary
    ? 'var(--gradient-main-v6), linear-gradient(90deg,rgba(40,130,255,.32),rgba(100,190,255,.18))'
    : 'rgba(255,255,255,0.07)'};
  color: ${({ $primary }) => $primary ? '#fff' : 'var(--color-light-0)'};
  font-weight: 600;
  box-shadow: ${({ $primary }) => $primary
    ? '0 0 18px 1.5px rgba(34,124,255,0.14)'
    : '0 0 6px 0 rgba(0,0,0,0.08)'};
  transition: background .13s, box-shadow .15s, filter .14s;
  cursor: pointer;
  filter: blur(0) brightness(1.04);

  &:hover {
    background: ${({ $primary }) => $primary
      ? 'var(--gradient-main-v5), rgba(80,180,255,0.24)'
      : 'rgba(255,255,255,0.14)'};
    box-shadow: 0 0 28px 2.2px rgba(44,114,255,0.23);
    filter: brightness(1.09) saturate(1.08);
  }
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

const FooterSection = () => {
   const dispatch = useDispatch()
  const isEditing = useSelector(selectIsEditingMain)
  const form = useSelector(selectBookModalForm)
  const previewBookId = useSelector(selectPreviewBookId)
const { editBook, isLoading } = useEditBook()

  const handleEdit = () => {
    dispatch(setEditingMain(true))
  }

  const handleCancel = () => {
    dispatch(setForm(form)) // restores current snapshot
    dispatch(setEditingMain(false))
  }
const handleSave = async () => {
  if (!previewBookId) return false
  const updates = {
    meta: {
      ...form.meta,
      updatedAt: new Date().toISOString(),
    },
  }

  const success = await editBook(previewBookId, updates)
  if (success) {
    dispatch(setEditingMain(false))
  }
  return success
}




const handleClose = async () => {
  if (isEditing) await handleSave()
  dispatch(clearPreviewBook())
  dispatch(resetForm())
}

  return (
    <Footer>
      {isEditing ? (
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button $primary onClick={handleSave}>Save Changes</Button>
        </>
      ) : (
        <>
          <Button onClick={handleClose}>Close</Button>
          <Button $primary onClick={handleEdit}>Edit</Button>
        </>
      )}
    </Footer>
  )
}

export default FooterSection
